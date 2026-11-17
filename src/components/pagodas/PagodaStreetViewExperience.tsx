/// <reference types="google.maps" />
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  Map as GoogleMapView,
  Pin,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { Compass, Footprints, Loader2, MapPin, Navigation } from 'lucide-react';
import type { Pagoda } from '../../types/sanctuary';
import type { PagodaTourMedia } from '../../data/pagodasData';

interface PagodaStreetViewExperienceProps {
  pagoda: Pagoda;
  tourMedia: PagodaTourMedia;
  viewMode: 'split' | 'streetview';
}

interface DiscoveredVantage {
  pano: string;
  label: string;
  description: string;
  heading: number;
}

interface ResolvedPlaceState {
  id: string;
  displayName: string;
  formattedAddress: string;
  location: google.maps.LatLngLiteral;
  viewport?: google.maps.LatLngBoundsLiteral;
  attributions: Array<{ provider?: string | null; providerURI?: string | null }>;
}

const ATTRIBUTION_IDS = ['gmp_mcp_codeassist_v1_aistudio'];

function isQuotaError(error: unknown): boolean {
  const msg = String(error ?? '').toUpperCase();
  return (
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('OVER_QUERY_LIMIT') ||
    msg.includes('QUOTA') ||
    msg.includes('429')
  );
}

export function PagodaStreetViewExperience({
  pagoda,
  tourMedia,
  viewMode,
}: PagodaStreetViewExperienceProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  if (!apiKey) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-sanctuary-lacquer px-6 text-center text-sanctuary-cream">
        <MapPin className="h-10 w-10 text-sanctuary-gold" aria-hidden="true" />
        <h2 className="mt-4 font-display text-2xl font-semibold">
          Google Maps Key Not Configured
        </h2>
        <p className="mt-2 max-w-md text-sm text-sanctuary-parchment/80">
          Set VITE_GOOGLE_MAPS_API_KEY in your environment to enable interactive Pegman Street View exploration.
        </p>
      </div>
    );
  }

  return (
    <APIProvider
      apiKey={apiKey}
      language="en"
      region="MM"
      libraries={['places', 'marker', 'streetView', 'core']}
    >
      <PagodaStreetViewStage
        pagoda={pagoda}
        tourMedia={tourMedia}
        viewMode={viewMode}
      />
    </APIProvider>
  );
}

function PagodaStreetViewStage({
  pagoda,
  tourMedia,
  viewMode,
}: PagodaStreetViewExperienceProps) {
  const placesLib = useMapsLibrary('places');
  const streetViewLib = useMapsLibrary('streetView');
  const map = useMap('pagoda-explorer-map');

  const panoContainerRef = useRef<HTMLDivElement | null>(null);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);

  const [resolvedPlace, setResolvedPlace] = useState<ResolvedPlaceState | null>(null);
  const [placeLoading, setPlaceLoading] = useState(true);
  const [placeError, setPlaceError] = useState<string | null>(null);

  const [svStatus, setSvStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const [svNotice, setSvNotice] = useState<string | null>(null);
  const [currentHeading, setCurrentHeading] = useState<number>(0);
  const [currentPanoId, setCurrentPanoId] = useState<string>('');
  const [currentDescription, setCurrentDescription] = useState<string>('');
  const [vantages, setVantages] = useState<DiscoveredVantage[]>([]);

  // 1. Dynamically resolve the Pagoda coordinates & official metadata via Places API (New)
  useEffect(() => {
    if (!placesLib) return;
    let cancelled = false;

    setPlaceLoading(true);
    setPlaceError(null);
    setResolvedPlace(null);
    setVantages([]);
    setSvStatus('loading');
    setSvNotice(null);

    const resolvePagodaPlace = async () => {
      try {
        const { places } = await placesLib.Place.searchByText({
          textQuery: tourMedia.mapsSearchQuery,
          fields: ['id', 'displayName', 'formattedAddress', 'location', 'viewport', 'attributions'],
          language: 'en',
          region: 'mm',
          maxResultCount: 1,
          internalUsageAttributionIds: ATTRIBUTION_IDS,
        } as google.maps.places.SearchByTextRequest);

        if (cancelled) return;

        const match = places?.[0];
        if (!match || !match.location) {
          setPlaceError(`Could not locate ${pagoda.name} on Google Maps.`);
          setPlaceLoading(false);
          return;
        }

        const vp = match.viewport?.toJSON();
        setResolvedPlace({
          id: match.id ?? pagoda.slug,
          displayName: match.displayName ?? pagoda.name,
          formattedAddress: match.formattedAddress ?? pagoda.location,
          location: {
            lat: match.location.lat(),
            lng: match.location.lng(),
          },
          viewport: vp,
          attributions: match.attributions ?? [],
        });
        setPlaceLoading(false);
      } catch (error) {
        if (cancelled) return;
        if (isQuotaError(error)) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        setPlaceError('Unable to load pagoda map location right now.');
        setPlaceLoading(false);
      }
    };

    void resolvePagodaPlace();

    return () => {
      cancelled = true;
    };
  }, [placesLib, pagoda.name, pagoda.location, pagoda.slug, tourMedia.mapsSearchQuery]);

  // Helper: look up nearest Street View panorama with fallback search radii
  const findNearestPanorama = useCallback(
    async (
      svService: google.maps.StreetViewService,
      target: google.maps.LatLngLiteral,
      radii: number[],
    ): Promise<google.maps.StreetViewPanoramaData | null> => {
      if (!streetViewLib) return null;
      for (const radius of radii) {
        try {
          const { data } = await svService.getPanorama({
            location: target,
            radius,
            preference: streetViewLib.StreetViewPreference.NEAREST,
            source: streetViewLib.StreetViewSource.DEFAULT,
          });
          if (data?.location?.pano) {
            return data;
          }
        } catch (err) {
          if (isQuotaError(err)) {
            window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
            return null;
          }
          // Try next wider radius on ZERO_RESULTS
        }
      }
      return null;
    },
    [streetViewLib],
  );

  // 2. Initialize StreetViewPanorama, bind Pegman via map.setStreetView(panorama), and sync walking
  useEffect(() => {
    if (!map || !streetViewLib || !panoContainerRef.current || !resolvedPlace) return;

    let cancelled = false;
    const svService = new streetViewLib.StreetViewService();

    const panorama = new streetViewLib.StreetViewPanorama(panoContainerRef.current, {
      position: resolvedPlace.location,
      pov: { heading: 0, pitch: 4 },
      visible: false,
      addressControl: true,
      linksControl: true,
      panControl: true,
      zoomControl: true,
      fullscreenControl: true,
      enableCloseButton: false,
      motionTracking: false,
      motionTrackingControl: true,
    });

    panoramaRef.current = panorama;

    // Bind the map's yellow Pegman avatar and blue Street View coverage layer to this panorama
    map.setStreetView(panorama);

    const listeners: google.maps.MapsEventListener[] = [];

    listeners.push(
      panorama.addListener('position_changed', () => {
        const pos = panorama.getPosition();
        if (pos) {
          map.panTo(pos);
        }
      }),
    );

    listeners.push(
      panorama.addListener('pano_changed', () => {
        setCurrentPanoId(panorama.getPano() || '');
        const loc = panorama.getLocation();
        if (loc?.description) {
          setCurrentDescription(loc.description);
        }
      }),
    );

    listeners.push(
      panorama.addListener('pov_changed', () => {
        const pov = panorama.getPov();
        if (typeof pov?.heading === 'number') {
          setCurrentHeading(((Math.round(pov.heading) % 360) + 360) % 360);
        }
      }),
    );

    // Allow clicking anywhere on the map to snap Pegman & Street View to the nearest 360° spot
    listeners.push(
      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (!event.latLng) return;
        const clicked = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        setSvNotice('Looking for Street View imagery near clicked location...');
        void findNearestPanorama(svService, clicked, [120, 350]).then((data) => {
          if (cancelled) return;
          if (data?.location?.pano) {
            panorama.setPano(data.location.pano);
            panorama.setVisible(true);
            setSvStatus('ready');
            setSvNotice(null);
            if (data.location.description) {
              setCurrentDescription(data.location.description);
            }
          } else {
            setSvNotice(
              'No 360° panorama found within 350m of that click. Drag the yellow Pegman onto any blue highlight on the map.',
            );
          }
        });
      }),
    );

    // Discover initial panorama and nearby 360° viewpoints around the pagoda
    const discoverVantages = async () => {
      setSvStatus('loading');
      const primary = await findNearestPanorama(svService, resolvedPlace.location, [120, 450, 1500]);
      if (cancelled) return;

      if (!primary?.location?.pano) {
        setSvStatus('unavailable');
        setSvNotice(
          'Street View imagery was not found right at this spot. Drag the yellow Pegman onto any blue highlight on the map to explore nearby views.',
        );
        return;
      }

      panorama.setPano(primary.location.pano);
      panorama.setPov({ heading: 0, pitch: 5 });
      panorama.setVisible(true);
      setSvStatus('ready');
      setCurrentPanoId(primary.location.pano);
      setCurrentDescription(primary.location.description || resolvedPlace.displayName);

      // Probe 4 cardinal offsets (~100m) around the pagoda to find distinct 360° vantage points
      const offsets: Array<{ label: string; dLat: number; dLng: number; heading: number }> = [
        { label: 'Main Sanctuary Approach', dLat: 0, dLng: 0, heading: 0 },
        { label: 'North Terrace / Gate', dLat: 0.001, dLng: 0, heading: 180 },
        { label: 'East Courtyard View', dLat: 0, dLng: 0.001, heading: 270 },
        { label: 'South Walkway View', dLat: -0.001, dLng: 0, heading: 0 },
        { label: 'West Perimeter View', dLat: 0, dLng: -0.001, heading: 90 },
      ];

      const collected: DiscoveredVantage[] = [
        {
          pano: primary.location.pano,
          label: offsets[0].label,
          description: primary.location.description || resolvedPlace.displayName,
          heading: offsets[0].heading,
        },
      ];
      const seenPanos: Record<string, boolean> = { [primary.location.pano]: true };

      for (let i = 1; i < offsets.length; i += 1) {
        const probe = offsets[i];
        const candidate = await findNearestPanorama(
          svService,
          {
            lat: resolvedPlace.location.lat + probe.dLat,
            lng: resolvedPlace.location.lng + probe.dLng,
          },
          [90, 220],
        );
        if (cancelled) return;
        const panoId = candidate?.location?.pano;
        if (panoId && !seenPanos[panoId]) {
          seenPanos[panoId] = true;
          collected.push({
            pano: panoId,
            label: probe.label,
            description: candidate.location?.description || probe.label,
            heading: probe.heading,
          });
        }
      }

      if (!cancelled) {
        setVantages(collected);
      }
    };

    void discoverVantages();

    return () => {
      cancelled = true;
      listeners.forEach((l) => l.remove());
      if (map) {
        map.setStreetView(null);
      }
      panoramaRef.current = null;
    };
  }, [map, streetViewLib, resolvedPlace, findNearestPanorama]);

  // Trigger resize on view mode changes so map & panorama never clip
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (typeof google !== 'undefined' && google.maps?.event) {
        if (panoramaRef.current) {
          google.maps.event.trigger(panoramaRef.current, 'resize');
        }
        if (map) {
          google.maps.event.trigger(map, 'resize');
        }
      }
    }, 80);
    return () => window.clearTimeout(timer);
  }, [viewMode, map]);

  const handleJumpToVantage = (vantage: DiscoveredVantage) => {
    if (!panoramaRef.current) return;
    panoramaRef.current.setPano(vantage.pano);
    panoramaRef.current.setPov({ heading: vantage.heading, pitch: 4 });
    panoramaRef.current.setVisible(true);
    setSvNotice(null);
  };

  if (placeLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-sanctuary-lacquer text-sanctuary-cream">
        <Loader2 className="h-7 w-7 animate-spin text-sanctuary-gold" aria-hidden="true" />
        <p className="mt-3 text-sm text-sanctuary-parchment/85">
          Locating {pagoda.name} in Google Maps &amp; Street View...
        </p>
      </div>
    );
  }

  if (placeError || !resolvedPlace) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-sanctuary-lacquer px-6 text-center text-sanctuary-cream">
        <MapPin className="h-9 w-9 text-sanctuary-gold" aria-hidden="true" />
        <p className="mt-3 text-base font-medium">{placeError || 'Unable to load map view.'}</p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col bg-sanctuary-lacquer">
      {/* Interactive status & vantage bar */}
      <div className="border-b border-sanctuary-gold/20 bg-sanctuary-lacquer px-4 py-2 text-xs text-sanctuary-parchment sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-sanctuary-gold-light">
              <Footprints className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{tourMedia.streetViewPrompt}</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {vantages.length > 1 &&
              vantages.map((v) => (
                <button
                  key={v.pano}
                  type="button"
                  onClick={() => handleJumpToVantage(v)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                    currentPanoId === v.pano
                      ? 'border-sanctuary-gold bg-sanctuary-gold text-sanctuary-lacquer'
                      : 'border-sanctuary-gold/30 bg-sanctuary-brown text-sanctuary-cream hover:border-sanctuary-gold'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            <span className="inline-flex items-center gap-1 rounded-md border border-sanctuary-gold/20 bg-sanctuary-brown/70 px-2.5 py-1 font-mono text-[11px] tabular-nums text-sanctuary-gold-light">
              <Compass className="h-3 w-3" aria-hidden="true" />
              <span>{currentHeading}°</span>
            </span>
          </div>
        </div>

        {svNotice && (
          <p className="mx-auto mt-1 max-w-7xl text-[11px] text-amber-200/95">{svNotice}</p>
        )}
      </div>

      {/* Main Split Street View + Pegman Map Viewport */}
      <div className="relative grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(280px,1fr)_minmax(240px,1fr)] lg:grid-cols-12 lg:grid-rows-1">
        {/* 360° Street View Panorama Container */}
        <div
          className={`relative min-h-[280px] ${
            viewMode === 'streetview' ? 'lg:col-span-12' : 'lg:col-span-7'
          }`}
        >
          <div
            ref={panoContainerRef}
            className="h-full min-h-[280px] w-full"
            aria-label={`360-degree Google Street View of ${resolvedPlace.displayName}`}
          />

          {svStatus === 'unavailable' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-sanctuary-lacquer/92 px-6 text-center">
              <Navigation className="h-8 w-8 text-sanctuary-gold" aria-hidden="true" />
              <p className="mt-3 max-w-md text-sm text-sanctuary-parchment">
                Click any blue-highlighted road or circle on the map (or drag the yellow Pegman avatar) to jump into nearby Street View imagery.
              </p>
            </div>
          )}

          {currentDescription && svStatus === 'ready' && (
            <div className="pointer-events-none absolute bottom-3 left-3 max-w-xs rounded-lg border border-sanctuary-gold/25 bg-sanctuary-lacquer/85 px-3 py-1.5 text-[11px] text-sanctuary-parchment backdrop-blur-xs">
              <p className="font-medium text-sanctuary-cream">{resolvedPlace.displayName}</p>
              <p className="truncate text-sanctuary-parchment/80">{currentDescription}</p>
            </div>
          )}
        </div>

        {/* Interactive Google Map with Yellow Pegman Person Avatar */}
        <div
          className={`relative min-h-[240px] border-t border-sanctuary-gold/20 lg:border-t-0 lg:border-l ${
            viewMode === 'streetview' ? 'hidden' : 'lg:col-span-5'
          }`}
        >
          <GoogleMapView
            id="pagoda-explorer-map"
            mapId="DEMO_MAP_ID"
            defaultCenter={resolvedPlace.location}
            defaultZoom={17}
            mapTypeId="hybrid"
            streetViewControl={true}
            mapTypeControl={true}
            fullscreenControl={false}
            gestureHandling="greedy"
            internalUsageAttributionIds={ATTRIBUTION_IDS}
            style={{ width: '100%', height: '100%', minHeight: '240px' }}
          >
            <AdvancedMarker position={resolvedPlace.location} title={resolvedPlace.displayName}>
              <Pin background="#C99A2E" borderColor="#3B1A12" glyphColor="#1E1410" />
            </AdvancedMarker>
          </GoogleMapView>

          {/* Official Place Address & Attributions Overlay */}
          <div className="pointer-events-auto absolute right-3 bottom-3 left-3 rounded-lg border border-sanctuary-gold/25 bg-sanctuary-lacquer/90 px-3 py-2 text-[11px] text-sanctuary-parchment shadow-md">
            <p className="font-semibold text-sanctuary-cream">{resolvedPlace.displayName}</p>
            <p className="truncate text-sanctuary-parchment/80">{resolvedPlace.formattedAddress}</p>
            {resolvedPlace.attributions.length > 0 && (
              <p className="mt-1 text-[10px] text-sanctuary-parchment/65">
                {resolvedPlace.attributions
                  .map((a) => a.provider)
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
