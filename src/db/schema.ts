import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const profiles = pgTable(
  'profiles',
  {
    id: serial('id').primaryKey(),
    uid: text('uid').notNull().unique(),
    email: text('email').notNull(),
    displayName: text('display_name').notNull().default('Sanctuary Member'),
    preferredLanguage: text('preferred_language').notNull().default('en'),
    avatarUrl: text('avatar_url'),
    privacyPublicProfile: boolean('privacy_public_profile').notNull().default(false),
    privacySaveActivity: boolean('privacy_save_activity').notNull().default(true),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('profiles_uid_idx').on(table.uid)],
);

export const userRoles = pgTable(
  'user_roles',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => profiles.id, { onDelete: 'cascade' })
      .notNull(),
    role: text('role').notNull().default('member'), // 'member' | 'admin'
    assignedAt: timestamp('assigned_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('user_roles_user_id_idx').on(table.userId)],
);

export const pagodas = pgTable(
  'pagodas',
  {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    nameMy: text('name_my').notNull(),
    location: text('location').notNull(),
    region: text('region').notNull(),
    summary: text('summary').notNull(),
    historicalSignificance: text('historical_significance').notNull(),
    architecturalNotes: text('architectural_notes').notNull(),
    supportsDayNight: boolean('supports_day_night').notNull().default(true),
    pointsOfInterestJson: jsonb('points_of_interest_json').notNull().default([]),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('pagodas_slug_idx').on(table.slug)],
);

export const buddhistFigures = pgTable(
  'buddhist_figures',
  {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    nameMy: text('name_my'),
    era: text('era').notNull(),
    titleOrRole: text('title_or_role').notNull(),
    biography: text('biography').notNull(),
    historicalBackground: text('historical_background').notNull(),
    keyTeachingsJson: jsonb('key_teachings_json').notNull().default([]),
    contributionsJson: jsonb('contributions_json').notNull().default([]),
    verifiedQuotationsJson: jsonb('verified_quotations_json').notNull().default([]),
    displayOrder: integer('display_order').notNull().default(1),
    isActive: boolean('is_active').notNull().default(true),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('buddhist_figures_slug_idx').on(table.slug)],
);

export const dhammaContents = pgTable(
  'dhamma_contents',
  {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    publishDate: text('publish_date').notNull(),
    quoteEn: text('quote_en').notNull(),
    quoteMy: text('quote_my').notNull(),
    explanationEn: text('explanation_en').notNull(),
    explanationMy: text('explanation_my'),
    reflectionPrompt: text('reflection_prompt').notNull(),
    sourceAttribution: text('source_attribution').notNull(),
    isDailyFeatured: boolean('is_daily_featured').notNull().default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [index('dhamma_publish_date_idx').on(table.publishDate)],
);

export const meditationSessions = pgTable(
  'meditation_sessions',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => profiles.id, { onDelete: 'cascade' })
      .notNull(),
    mode: text('mode').notNull().default('guided'), // 'guided' | 'silent'
    ambientSound: text('ambient_sound').notNull().default('bells'),
    durationMinutes: integer('duration_minutes').notNull(),
    completedSeconds: integer('completed_seconds').notNull(),
    completedAt: timestamp('completed_at').defaultNow().notNull(),
  },
  (table) => [index('meditation_user_idx').on(table.userId)],
);

export const prayerSessions = pgTable(
  'prayer_sessions',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => profiles.id, { onDelete: 'cascade' })
      .notNull(),
    prayerTitle: text('prayer_title').notNull(),
    candleLit: boolean('candle_lit').notNull().default(true),
    incenseOffered: boolean('incense_offered').notNull().default(false),
    quietMode: boolean('quiet_mode').notNull().default(false),
    durationSeconds: integer('duration_seconds').notNull().default(120),
    isPrivate: boolean('is_private').notNull().default(true),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [index('prayer_user_idx').on(table.userId)],
);

export const beadProgress = pgTable(
  'bead_progress',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => profiles.id, { onDelete: 'cascade' })
      .notNull(),
    currentBead: integer('current_bead').notNull().default(0),
    completedRounds: integer('completed_rounds').notNull().default(0),
    totalBeadsCounted: integer('total_beads_counted').notNull().default(0),
    soundEnabled: boolean('sound_enabled').notNull().default(true),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('bead_progress_user_idx').on(table.userId)],
);

export const favoritePagodas = pgTable(
  'favorite_pagodas',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => profiles.id, { onDelete: 'cascade' })
      .notNull(),
    pagodaId: integer('pagoda_id')
      .references(() => pagodas.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('favorite_pagodas_unique_idx').on(table.userId, table.pagodaId)],
);

export const pagodaVisits = pgTable(
  'pagoda_visits',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => profiles.id, { onDelete: 'cascade' })
      .notNull(),
    pagodaId: integer('pagoda_id')
      .references(() => pagodas.id, { onDelete: 'cascade' })
      .notNull(),
    visitedAt: timestamp('visited_at').defaultNow().notNull(),
  },
  (table) => [index('pagoda_visits_user_idx').on(table.userId)],
);

export const savedDhamma = pgTable(
  'saved_dhamma',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id')
      .references(() => profiles.id, { onDelete: 'cascade' })
      .notNull(),
    dhammaId: integer('dhamma_id')
      .references(() => dhammaContents.id, { onDelete: 'cascade' })
      .notNull(),
    personalNote: text('personal_note'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [uniqueIndex('saved_dhamma_unique_idx').on(table.userId, table.dhammaId)],
);

// Relations
export const profilesRelations = relations(profiles, ({ one, many }) => ({
  roleRecord: one(userRoles, {
    fields: [profiles.id],
    references: [userRoles.userId],
  }),
  meditationSessions: many(meditationSessions),
  prayerSessions: many(prayerSessions),
  beadProgress: one(beadProgress, {
    fields: [profiles.id],
    references: [beadProgress.userId],
  }),
  favoritePagodas: many(favoritePagodas),
  pagodaVisits: many(pagodaVisits),
  savedDhamma: many(savedDhamma),
}));
