import { and, count, desc, eq, sql } from 'drizzle-orm';
import { db } from './index.ts';
import {
  beadProgress,
  buddhistFigures,
  dhammaContents,
  favoritePagodas,
  meditationSessions,
  pagodas,
  pagodaVisits,
  prayerSessions,
  profiles,
  savedDhamma,
  userRoles,
} from './schema.ts';
import { PAGODAS_DATA } from '../data/pagodasData.ts';
import { BUDDHIST_FIGURES_DATA } from '../data/figuresData.ts';
import { DHAMMA_CONTENTS_DATA } from '../data/dhammaData.ts';

function wrapDbError(message: string, error: unknown): Error {
  console.error(message, error);
  return new Error('Database operation could not be completed. Please try again.', {
    cause: error,
  });
}

export async function getOrCreateProfileAndRole(
  uid: string,
  email: string,
  displayName = 'Sanctuary Member',
) {
  try {
    const existingProfiles = await db.select().from(profiles).where(eq(profiles.uid, uid));
    let profile = existingProfiles[0];

    if (!profile) {
      const inserted = await db
        .insert(profiles)
        .values({
          uid,
          email,
          displayName,
        })
        .onConflictDoUpdate({
          target: profiles.uid,
          set: { email, updatedAt: new Date() },
        })
        .returning();
      profile = inserted[0];
    }

    const existingRoles = await db
      .select()
      .from(userRoles)
      .where(eq(userRoles.userId, profile.id));

    let roleRecord = existingRoles[0];
    if (!roleRecord) {
      // Assign initial admin role only if no admin exists yet or matching owner account
      const [{ value: totalUsers }] = await db.select({ value: count() }).from(userRoles);
      const initialRole =
        totalUsers === 0 || email.toLowerCase() === 'shinthentmay@gmail.com'
          ? 'admin'
          : 'member';

      const insertedRole = await db
        .insert(userRoles)
        .values({
          userId: profile.id,
          role: initialRole,
        })
        .onConflictDoNothing()
        .returning();
      roleRecord = insertedRole[0] || {
        id: 0,
        userId: profile.id,
        role: initialRole,
        assignedAt: new Date(),
      };
    }

    return { profile, role: roleRecord.role };
  } catch (error) {
    throw wrapDbError('Failed to synchronize user profile', error);
  }
}

export async function ensureSanctuarySeeded() {
  try {
    const [{ value: pagodaCount }] = await db.select({ value: count() }).from(pagodas);
    if (pagodaCount === 0) {
      for (const p of PAGODAS_DATA) {
        await db
          .insert(pagodas)
          .values({
            slug: p.slug,
            name: p.name,
            nameMy: p.nameMy,
            location: p.location,
            region: p.region,
            summary: p.summary,
            historicalSignificance: p.historicalSignificance,
            architecturalNotes: p.architecturalNotes,
            supportsDayNight: p.supportsDayNight,
            pointsOfInterestJson: p.pointsOfInterest,
          })
          .onConflictDoNothing();
      }
    }

    const [{ value: figureCount }] = await db.select({ value: count() }).from(buddhistFigures);
    if (figureCount === 0) {
      for (const f of BUDDHIST_FIGURES_DATA) {
        await db
          .insert(buddhistFigures)
          .values({
            slug: f.slug,
            name: f.name,
            nameMy: f.nameMy ?? null,
            era: f.era,
            titleOrRole: f.titleOrRole,
            biography: f.biography,
            historicalBackground: f.historicalBackground,
            keyTeachingsJson: f.keyTeachings,
            contributionsJson: f.contributions,
            verifiedQuotationsJson: f.verifiedQuotations,
            displayOrder: f.displayOrder,
            isActive: f.isActive,
          })
          .onConflictDoNothing();
      }
    }

    const [{ value: dhammaCount }] = await db.select({ value: count() }).from(dhammaContents);
    if (dhammaCount === 0) {
      for (const d of DHAMMA_CONTENTS_DATA) {
        await db
          .insert(dhammaContents)
          .values({
            slug: d.id,
            publishDate: d.publishDate,
            quoteEn: d.quoteEn,
            quoteMy: d.quoteMy,
            explanationEn: d.explanationEn,
            explanationMy: d.explanationMy ?? null,
            reflectionPrompt: d.reflectionPrompt,
            sourceAttribution: d.sourceAttribution,
            isDailyFeatured: d.isDailyFeatured,
          })
          .onConflictDoNothing();
      }
    }
  } catch (error) {
    throw wrapDbError('Failed to seed sanctuary catalog', error);
  }
}

export async function getPublicCatalog() {
  try {
    await ensureSanctuarySeeded();
    const [pagodaList, figureList, dhammaList] = await Promise.all([
      db.select().from(pagodas),
      db
        .select()
        .from(buddhistFigures)
        .where(eq(buddhistFigures.isActive, true))
        .orderBy(buddhistFigures.displayOrder),
      db.select().from(dhammaContents).orderBy(desc(dhammaContents.publishDate)),
    ]);
    return { pagodas: pagodaList, figures: figureList, dhamma: dhammaList };
  } catch (error) {
    throw wrapDbError('Failed to fetch public sanctuary catalog', error);
  }
}

export async function getUserDashboardData(profileId: number) {
  try {
    await ensureSanctuarySeeded();
    const [
      profileRows,
      roleRows,
      meditations,
      prayers,
      malaRows,
      favorites,
      visits,
      savedQuotes,
    ] = await Promise.all([
      db.select().from(profiles).where(eq(profiles.id, profileId)),
      db.select().from(userRoles).where(eq(userRoles.userId, profileId)),
      db
        .select()
        .from(meditationSessions)
        .where(eq(meditationSessions.userId, profileId))
        .orderBy(desc(meditationSessions.completedAt))
        .limit(20),
      db
        .select()
        .from(prayerSessions)
        .where(eq(prayerSessions.userId, profileId))
        .orderBy(desc(prayerSessions.createdAt))
        .limit(20),
      db.select().from(beadProgress).where(eq(beadProgress.userId, profileId)),
      db
        .select({
          id: favoritePagodas.id,
          pagodaId: pagodas.id,
          slug: pagodas.slug,
          name: pagodas.name,
          nameMy: pagodas.nameMy,
          location: pagodas.location,
        })
        .from(favoritePagodas)
        .innerJoin(pagodas, eq(favoritePagodas.pagodaId, pagodas.id))
        .where(eq(favoritePagodas.userId, profileId)),
      db
        .select({
          id: pagodaVisits.id,
          slug: pagodas.slug,
          name: pagodas.name,
          location: pagodas.location,
          visitedAt: pagodaVisits.visitedAt,
        })
        .from(pagodaVisits)
        .innerJoin(pagodas, eq(pagodaVisits.pagodaId, pagodas.id))
        .where(eq(pagodaVisits.userId, profileId))
        .orderBy(desc(pagodaVisits.visitedAt))
        .limit(10),
      db
        .select({
          id: savedDhamma.id,
          dhammaId: dhammaContents.id,
          slug: dhammaContents.slug,
          quoteEn: dhammaContents.quoteEn,
          quoteMy: dhammaContents.quoteMy,
          sourceAttribution: dhammaContents.sourceAttribution,
          createdAt: savedDhamma.createdAt,
        })
        .from(savedDhamma)
        .innerJoin(dhammaContents, eq(savedDhamma.dhammaId, dhammaContents.id))
        .where(eq(savedDhamma.userId, profileId))
        .orderBy(desc(savedDhamma.createdAt)),
    ]);

    return {
      profile: profileRows[0],
      role: roleRows[0]?.role ?? 'member',
      meditations,
      prayers,
      mala: malaRows[0] ?? {
        currentBead: 0,
        completedRounds: 0,
        totalBeadsCounted: 0,
        soundEnabled: true,
      },
      favoritePagodas: favorites,
      recentVisits: visits,
      savedDhamma: savedQuotes,
    };
  } catch (error) {
    throw wrapDbError('Failed to load user dashboard data', error);
  }
}

export async function updateUserProfile(
  profileId: number,
  updates: {
    displayName?: string;
    preferredLanguage?: string;
    privacyPublicProfile?: boolean;
    privacySaveActivity?: boolean;
  },
) {
  try {
    const result = await db
      .update(profiles)
      .set({
        ...(updates.displayName !== undefined ? { displayName: updates.displayName } : {}),
        ...(updates.preferredLanguage !== undefined
          ? { preferredLanguage: updates.preferredLanguage }
          : {}),
        ...(updates.privacyPublicProfile !== undefined
          ? { privacyPublicProfile: updates.privacyPublicProfile }
          : {}),
        ...(updates.privacySaveActivity !== undefined
          ? { privacySaveActivity: updates.privacySaveActivity }
          : {}),
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, profileId))
      .returning();
    return result[0];
  } catch (error) {
    throw wrapDbError('Failed to update profile settings', error);
  }
}

export async function recordMeditationSessionDb(
  profileId: number,
  data: {
    mode: string;
    ambientSound: string;
    durationMinutes: number;
    completedSeconds: number;
  },
) {
  try {
    const result = await db
      .insert(meditationSessions)
      .values({
        userId: profileId,
        mode: data.mode,
        ambientSound: data.ambientSound,
        durationMinutes: data.durationMinutes,
        completedSeconds: data.completedSeconds,
      })
      .returning();
    return result[0];
  } catch (error) {
    throw wrapDbError('Failed to save meditation session', error);
  }
}

export async function recordPrayerSessionDb(
  profileId: number,
  data: {
    prayerTitle: string;
    candleLit: boolean;
    incenseOffered: boolean;
    quietMode: boolean;
    durationSeconds: number;
    isPrivate: boolean;
  },
) {
  try {
    const result = await db
      .insert(prayerSessions)
      .values({
        userId: profileId,
        prayerTitle: data.prayerTitle,
        candleLit: data.candleLit,
        incenseOffered: data.incenseOffered,
        quietMode: data.quietMode,
        durationSeconds: data.durationSeconds,
        isPrivate: data.isPrivate,
      })
      .returning();
    return result[0];
  } catch (error) {
    throw wrapDbError('Failed to save prayer session', error);
  }
}

export async function upsertBeadProgressDb(
  profileId: number,
  data: {
    currentBead: number;
    completedRounds: number;
    totalBeadsCounted: number;
    soundEnabled: boolean;
  },
) {
  try {
    const result = await db
      .insert(beadProgress)
      .values({
        userId: profileId,
        currentBead: data.currentBead,
        completedRounds: data.completedRounds,
        totalBeadsCounted: data.totalBeadsCounted,
        soundEnabled: data.soundEnabled,
      })
      .onConflictDoUpdate({
        target: beadProgress.userId,
        set: {
          currentBead: data.currentBead,
          completedRounds: data.completedRounds,
          totalBeadsCounted: data.totalBeadsCounted,
          soundEnabled: data.soundEnabled,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result[0];
  } catch (error) {
    throw wrapDbError('Failed to save mala progress', error);
  }
}

export async function recordPagodaVisitDb(profileId: number, pagodaSlug: string) {
  try {
    await ensureSanctuarySeeded();
    const found = await db.select().from(pagodas).where(eq(pagodas.slug, pagodaSlug));
    if (!found[0]) return null;
    const inserted = await db
      .insert(pagodaVisits)
      .values({ userId: profileId, pagodaId: found[0].id })
      .returning();
    return inserted[0];
  } catch (error) {
    throw wrapDbError('Failed to record pagoda visit', error);
  }
}

export async function toggleFavoritePagodaDb(profileId: number, pagodaSlug: string) {
  try {
    await ensureSanctuarySeeded();
    const found = await db.select().from(pagodas).where(eq(pagodas.slug, pagodaSlug));
    if (!found[0]) return { favorited: false };
    const existing = await db
      .select()
      .from(favoritePagodas)
      .where(
        and(eq(favoritePagodas.userId, profileId), eq(favoritePagodas.pagodaId, found[0].id)),
      );
    if (existing[0]) {
      await db.delete(favoritePagodas).where(eq(favoritePagodas.id, existing[0].id));
      return { favorited: false };
    }
    await db
      .insert(favoritePagodas)
      .values({ userId: profileId, pagodaId: found[0].id })
      .onConflictDoNothing();
    return { favorited: true };
  } catch (error) {
    throw wrapDbError('Failed to toggle favorite pagoda', error);
  }
}

export async function toggleSavedDhammaDb(profileId: number, dhammaSlug: string) {
  try {
    await ensureSanctuarySeeded();
    const found = await db
      .select()
      .from(dhammaContents)
      .where(eq(dhammaContents.slug, dhammaSlug));
    if (!found[0]) return { saved: false };
    const existing = await db
      .select()
      .from(savedDhamma)
      .where(and(eq(savedDhamma.userId, profileId), eq(savedDhamma.dhammaId, found[0].id)));
    if (existing[0]) {
      await db.delete(savedDhamma).where(eq(savedDhamma.id, existing[0].id));
      return { saved: false };
    }
    await db
      .insert(savedDhamma)
      .values({ userId: profileId, dhammaId: found[0].id })
      .onConflictDoNothing();
    return { saved: true };
  } catch (error) {
    throw wrapDbError('Failed to toggle saved Dhamma', error);
  }
}

// Admin queries
export async function getAdminOverviewData() {
  try {
    await ensureSanctuarySeeded();
    const [
      usersList,
      pagodaList,
      figureList,
      dhammaList,
      meditationCount,
      prayerCount,
      meditationSecondsSum,
    ] = await Promise.all([
      db
        .select({
          id: profiles.id,
          uid: profiles.uid,
          email: profiles.email,
          displayName: profiles.displayName,
          preferredLanguage: profiles.preferredLanguage,
          createdAt: profiles.createdAt,
          role: userRoles.role,
        })
        .from(profiles)
        .leftJoin(userRoles, eq(profiles.id, userRoles.userId))
        .orderBy(desc(profiles.createdAt)),
      db.select().from(pagodas).orderBy(pagodas.id),
      db.select().from(buddhistFigures).orderBy(buddhistFigures.displayOrder),
      db.select().from(dhammaContents).orderBy(desc(dhammaContents.publishDate)),
      db.select({ value: count() }).from(meditationSessions),
      db.select({ value: count() }).from(prayerSessions),
      db
        .select({
          total: sql<number>`coalesce(sum(${meditationSessions.completedSeconds}), 0)`,
        })
        .from(meditationSessions),
    ]);

    return {
      users: usersList,
      pagodas: pagodaList,
      figures: figureList,
      dhamma: dhammaList,
      stats: {
        totalUsers: usersList.length,
        totalMeditations: meditationCount[0]?.value ?? 0,
        totalPrayers: prayerCount[0]?.value ?? 0,
        totalMeditationMinutes: Math.round((Number(meditationSecondsSum[0]?.total) || 0) / 60),
      },
    };
  } catch (error) {
    throw wrapDbError('Failed to fetch admin dashboard data', error);
  }
}

export async function updateUserRoleAdmin(targetProfileId: number, role: 'member' | 'admin') {
  try {
    const result = await db
      .update(userRoles)
      .set({ role, assignedAt: new Date() })
      .where(eq(userRoles.userId, targetProfileId))
      .returning();
    return result[0];
  } catch (error) {
    throw wrapDbError('Failed to update user role', error);
  }
}

export async function updatePagodaAdmin(
  pagodaId: number,
  updates: {
    name?: string;
    nameMy?: string;
    location?: string;
    summary?: string;
    historicalSignificance?: string;
    architecturalNotes?: string;
  },
) {
  try {
    const result = await db
      .update(pagodas)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(pagodas.id, pagodaId))
      .returning();
    return result[0];
  } catch (error) {
    throw wrapDbError('Failed to update pagoda record', error);
  }
}

export async function upsertFigureAdmin(data: {
  id?: number;
  slug: string;
  name: string;
  nameMy?: string;
  era: string;
  titleOrRole: string;
  biography: string;
  historicalBackground: string;
  displayOrder: number;
  isActive: boolean;
}) {
  try {
    if (data.id) {
      const updated = await db
        .update(buddhistFigures)
        .set({
          name: data.name,
          nameMy: data.nameMy ?? null,
          era: data.era,
          titleOrRole: data.titleOrRole,
          biography: data.biography,
          historicalBackground: data.historicalBackground,
          displayOrder: data.displayOrder,
          isActive: data.isActive,
          updatedAt: new Date(),
        })
        .where(eq(buddhistFigures.id, data.id))
        .returning();
      return updated[0];
    }
    const inserted = await db
      .insert(buddhistFigures)
      .values({
        slug: data.slug,
        name: data.name,
        nameMy: data.nameMy ?? null,
        era: data.era,
        titleOrRole: data.titleOrRole,
        biography: data.biography,
        historicalBackground: data.historicalBackground,
        displayOrder: data.displayOrder,
        isActive: data.isActive,
      })
      .returning();
    return inserted[0];
  } catch (error) {
    throw wrapDbError('Failed to save Buddhist figure', error);
  }
}

export async function createDhammaAdmin(data: {
  publishDate: string;
  quoteEn: string;
  quoteMy: string;
  explanationEn: string;
  explanationMy?: string;
  reflectionPrompt: string;
  sourceAttribution: string;
  isDailyFeatured: boolean;
}) {
  try {
    if (data.isDailyFeatured) {
      await db.update(dhammaContents).set({ isDailyFeatured: false });
    }
    const inserted = await db
      .insert(dhammaContents)
      .values({
        slug: `dhamma-${Date.now()}`,
        publishDate: data.publishDate,
        quoteEn: data.quoteEn,
        quoteMy: data.quoteMy,
        explanationEn: data.explanationEn,
        explanationMy: data.explanationMy ?? null,
        reflectionPrompt: data.reflectionPrompt,
        sourceAttribution: data.sourceAttribution,
        isDailyFeatured: data.isDailyFeatured,
      })
      .returning();
    return inserted[0];
  } catch (error) {
    throw wrapDbError('Failed to publish Daily Dhamma teaching', error);
  }
}
