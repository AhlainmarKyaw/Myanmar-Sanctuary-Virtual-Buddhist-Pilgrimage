import type { Pagoda, PagodaHistoryArchive } from '../types/sanctuary';

export const PAGODAS_DATA: Pagoda[] = [
  {
    id: 'pagoda-shwedagon',
    slug: 'shwedagon',
    name: 'Shwedagon Pagoda',
    nameMy: 'ရွှေတိဂုံစေတီတော်',
    location: 'Singuttara Hill, Yangon',
    region: 'Yangon Region, Myanmar',
    summary:
      'Myanmar’s most revered gilded stupa, crowned with a sacred hti spire rising 99 meters above Singuttara Hill and encircled by marble terraces and devotional shrines.',
    historicalSignificance:
      'According to Burmese and Mon tradition, merchants Tapussa and Bhallika enshrined eight hair relics of Gautama Buddha on Singuttara Hill. Enlarged over centuries—notably by Queen Shin Sawbu and King Dhammazedi in the 15th century—the stupa remains the heart of Myanmar Buddhist devotion.',
    architecturalNotes:
      'Built in classic Burmese bell-shaped stupa proportions: octagonal plinth, terraced bands, lotus-petal moldings, inverted alms-bowl dome, tapering spire, and jewel-set hti umbrella.',
    supportsDayNight: true,
    updatedAt: '2026-01-01T00:00:00Z',
    pointsOfInterest: [
      {
        id: 'shwedagon-stupa',
        title: 'Main Golden Stupa & Hti Crown',
        titleMy: 'ပင်မရွှေစေတီတော်နှင့် ထီးတော်',
        description:
          'Sheathed in gold plates and topped by a multi-tiered hti (umbrella) inlaid with precious stones, the central stupa anchors the entire hill terrace.',
        historicalPeriod: '15th–18th Century Expansions',
        position: [0, 7.5, 0],
        cameraTarget: [0, 4.5, 0],
        cameraPosition: [14, 9, 16],
      },
      {
        id: 'shwedagon-planetary-post',
        title: 'Planetary Corner Shrines (Daunt)',
        titleMy: 'ဂြိုဟ်တိုင်ထောင့်များ',
        description:
          'Eight planetary posts correspond to the days of the Burmese week (with Wednesday split into morning and afternoon), where visitors pour water in aspiration for peace.',
        historicalPeriod: 'Living Devotional Tradition',
        position: [5.8, 1.3, 5.8],
        cameraTarget: [5.4, 1.0, 5.4],
        cameraPosition: [10.5, 3.8, 10.5],
      },
      {
        id: 'shwedagon-satellite-stupas',
        title: 'Surrounding Satellite Stupas',
        titleMy: 'အရံစေတီတော်များ',
        description:
          'Scores of smaller gilded and whitewashed stupas encircle the main monument along the marble platform, creating a meditative perimeter for circumambulation.',
        historicalPeriod: 'Konbaung & Modern Eras',
        position: [-7.2, 2.2, 4.0],
        cameraTarget: [-6.5, 1.4, 3.8],
        cameraPosition: [-13, 4.5, 9],
      },
      {
        id: 'shwedagon-tazaung',
        title: 'Pyatthat Prayer Pavilion (Tazaung)',
        titleMy: 'ပြာသာဒ်ဆောင်တန်ဆောင်း',
        description:
          'Multi-tiered Burmese teak roofs (pyatthat) shelter Buddha images and offer cool, shaded places for chanting, offering flowers, and sitting meditation.',
        historicalPeriod: 'Traditional Burmese Architecture',
        position: [0, 2.0, -9.2],
        cameraTarget: [0, 1.5, -8.5],
        cameraPosition: [6.5, 4.2, -15.5],
      },
    ],
  },
  {
    id: 'pagoda-mahamuni',
    slug: 'mahamuni',
    name: 'Mahamuni Pagoda',
    nameMy: 'မဟာမုနိဘုရားကြီး',
    location: 'Mandalay',
    region: 'Mandalay Region, Myanmar',
    summary:
      'Home to the deeply venerated bronze Mahamuni Buddha image, housed within a gilded Mandalay hall of carved columns, brass bells, and serene candlelight.',
    historicalSignificance:
      'Originating in ancient Dhanyawadi (Rakhine State), the Mahamuni image was transported to Amarapura in 1784 during the reign of King Bodawpaya. Over centuries, devotees have applied gold leaf onto the image’s body while keeping its face untouched.',
    architecturalNotes:
      'Approached through four cardinal covered walkways leading into a central gilded sanctuary chamber crowned by a seven-tiered Mandalay pyatthat spire.',
    supportsDayNight: false,
    updatedAt: '2026-01-01T00:00:00Z',
    pointsOfInterest: [
      {
        id: 'mahamuni-image',
        title: 'Mahamuni Buddha Image',
        titleMy: 'မဟာမုနိရုပ်ပွားတော်မြတ်',
        description:
          'Seated in Bhumisparsha Mudra (earth-touching posture), the 3.8-meter bronze image glows under generations of gold leaf offered by devout pilgrims.',
        historicalPeriod: 'Ancient Rakhine / 1784 Enshrinement',
        position: [0, 3.2, -2.5],
        cameraTarget: [0, 2.4, -2.5],
        cameraPosition: [0, 3.2, 6.8],
      },
      {
        id: 'mahamuni-sanctum-pillars',
        title: 'Gilded Teak Columns & Canopy',
        titleMy: 'ရွှေချတိုင်လုံးများနှင့် မျက်နှာကြက်',
        description:
          'Tall lacquered and gilded pillars frame the central sanctuary corridor, reflecting warm candlelight across the polished marble floor.',
        historicalPeriod: 'Konbaung Period Craftsmanship',
        position: [3.6, 2.6, 1.5],
        cameraTarget: [2.8, 2.2, 1.0],
        cameraPosition: [7.5, 3.8, 7.5],
      },
      {
        id: 'mahamuni-altar-offerings',
        title: 'Candle & Flower Offering Altar',
        titleMy: 'ဆီမီးနှင့် ပန်းပူဇော်ရာစင်',
        description:
          'Devotees gather quietly at dawn and dusk to offer lotus blossoms, incense, and oil lamps while reciting Pali homages.',
        historicalPeriod: 'Daily Ritual Practice',
        position: [-2.4, 1.1, 2.8],
        cameraTarget: [0, 1.0, 1.8],
        cameraPosition: [-6.5, 2.8, 7.2],
      },
    ],
  },
  {
    id: 'pagoda-kyaiktiyo',
    slug: 'kyaiktiyo',
    name: 'Kyaiktiyo Pagoda (Golden Rock)',
    nameMy: 'ကျိုက်ထီးရိုးစေတီတော်',
    location: 'Mount Kyaiktiyo, Mon State',
    region: 'Mon State, Myanmar',
    summary:
      'A gilded granite boulder balanced high above mist-filled valleys of Mon State, crowned by a slender stupa overlooking layered mountain ridges.',
    historicalSignificance:
      'Standing at roughly 1,100 meters above sea level, Kyaiktiyo is one of Myanmar’s most treasured pilgrimage sites. According to Mon and Burmese legend, the boulder maintains its extraordinary balance upon a single hair relic of the Buddha.',
    architecturalNotes:
      'A naturally rounded 7.3-meter boulder covered in gold leaf rests atop a sloping cliff ledge, surmounted by a 7.3-meter golden stupa and encircled by viewing terraces.',
    supportsDayNight: true,
    updatedAt: '2026-01-01T00:00:00Z',
    pointsOfInterest: [
      {
        id: 'kyaiktiyo-boulder',
        title: 'The Balanced Golden Boulder',
        titleMy: 'ရွှေကျောက်တုံးတော်',
        description:
          'Perched on an inclined granite shelf with minimal contact area, the boulder glows warmly through drifting mountain clouds.',
        historicalPeriod: 'Ancient Mon Heritage',
        position: [0, 3.2, 0],
        cameraTarget: [0, 3.0, 0],
        cameraPosition: [9.5, 4.8, 10.5],
      },
      {
        id: 'kyaiktiyo-stupa',
        title: 'Summit Stupa & Sacred Reliquary',
        titleMy: 'ကျောက်တုံးထိပ်စေတီတော်',
        description:
          'A compact, finely proportioned golden stupa rises directly from the crest of the boulder, topped by a delicate hti catching the mountain wind.',
        historicalPeriod: 'Traditional Mon Design',
        position: [0, 6.2, 0],
        cameraTarget: [0, 5.2, 0],
        cameraPosition: [7.5, 7.0, 8.5],
      },
      {
        id: 'kyaiktiyo-ridge',
        title: 'Mountain Terrace & Sea of Clouds',
        titleMy: 'တောင်ထိပ်ရင်ပြင်နှင့် တိမ်ပင်လယ်',
        description:
          'The cliffside platform opens directly onto panoramic mountain valleys where morning mist drifts below pilgrims chanting and meditating.',
        historicalPeriod: 'Natural Sanctuary Setting',
        position: [-6.5, 1.2, 4.5],
        cameraTarget: [-3.0, 1.5, 2.0],
        cameraPosition: [5.0, 5.2, 13.5],
      },
    ],
  },
];

export const PAGODA_IMAGES: Record<Pagoda['slug'], string> = {
  shwedagon: '/src/assets/images/hero_shwedagon_sanctuary_1794906334149.jpg',
  mahamuni: '/src/assets/images/pagoda_mahamuni_interior_1794906334092.jpg',
  kyaiktiyo: '/src/assets/images/pagoda_kyaiktiyo_golden_rock_1794906334536.jpg',
};

export const PAGODA_HISTORY_ARCHIVE: Record<Pagoda['slug'], PagodaHistoryArchive> = {
  shwedagon: {
    originLegend:
      'In Myanmar’s sacred chronicles, two merchant brothers from Ukkalapa—Tapussa and Bhallika—met Gautama Buddha forty-nine days after his Awakening under the Rajayatana tree and offered him honey-cakes. Receiving eight strands of the Buddha’s hair as sacred relics, they journeyed home with King Okkalapa to Singuttara Hill, where relics of three previous Buddhas (Kakusandha, Konagamana, and Kassapa) were also believed to rest.',
    royalPatronage:
      'Over centuries of Mon and Burmese history, successive monarchs enlarged the reliquary mound into a monumental stupa. In the 14th century King Binnya U of Bago raised the spire, and in the 15th century Queen Shin Sawbu established the broad marble terrace and donated her own body weight in beaten gold for gilding. Her son-in-law King Dhammazedi later cast a monumental bronze bell and erected multilingual stone inscriptions in Pali, Mon, and Burmese recounting the pagoda’s lineage. In 1774, King Hsinbyushin raised the stupa to its present height of roughly 99 meters and crowned it with a new jeweled hti.',
    architecturalProfile:
      'Shwedagon exemplifies classical Burmese stupa geometry: an octagonal plinth supporting three concentric terraces, lotus-petal moldings symbolizing purity, a graceful bell-shaped dome (Khaung Laung), conical ringed bands, a stylized banana-bud spire, and an intricate seven-tiered golden hti finial hung with thousands of small bells.',
    keyFacts: [
      { label: 'Location', value: 'Singuttara Hill, Yangon' },
      { label: 'Stupa Height', value: '99 meters (325 ft)' },
      { label: 'Sacred Relics', value: 'Eight Hair Relics of Gautama Buddha' },
      { label: 'Key Royal Patrons', value: 'Queen Shin Sawbu, King Dhammazedi, King Hsinbyushin' },
    ],
    timeline: [
      {
        period: 'Traditional Founding Era',
        title: 'Enshrinement of the Eight Hair Relics',
        summary:
          'Merchants Tapussa and Bhallika return from Bodh Gaya and enshrine the eight hair relics with King Okkalapa atop Singuttara Hill.',
      },
      {
        period: '1362–1472 CE (Hanthawaddy Mon Era)',
        title: 'Terrace Expansion & Royal Gilding',
        summary:
          'King Binnya U and Queen Shin Sawbu expand the hill platform; Queen Shin Sawbu donates gold equal to her weight and King Dhammazedi records the chronicle.',
      },
      {
        period: '1774 CE (Konbaung Era)',
        title: 'Elevation to Present 99-Meter Spire',
        summary:
          'Following earthquake repairs, King Hsinbyushin raises the central stupa to its current height and places a new gilded hti crown.',
      },
      {
        period: 'Living Heritage',
        title: 'Circumambulation & Eight Planetary Corners',
        summary:
          'Devotees continue daily circumambulation, morning oil-lamp offerings, and water-pouring prayers at the eight planetary shrines.',
      },
    ],
    gallery: [
      {
        src: '/src/assets/images/hero_shwedagon_sanctuary_1794906334149.jpg',
        alt: 'Shwedagon Pagoda main golden stupa bathed in golden hour light',
        caption: 'Fig. 1 — Main 99-meter golden stupa rising above Singuttara Hill at dusk.',
        eraOrSetting: 'Singuttara Hill Summit',
      },
      {
        src: '/src/assets/images/shwedagon_terrace_shrines_1794908981304.jpg',
        alt: 'Shwedagon marble terrace with satellite stupas and carved teak pyatthat pavilion',
        caption: 'Fig. 2 — Marble circumambulation terrace, satellite stupas, and multi-tiered teak prayer pavilion.',
        eraOrSetting: '15th-Century Terrace Complex',
      },
      {
        src: '/src/assets/images/shwedagon_hti_twilight_1794908981981.jpg',
        alt: 'Shwedagon spire and jeweled hti illuminated against evening sky with oil lamps',
        caption: 'Fig. 3 — Evening twilight illumination with traditional oil lamps lining the marble balustrade.',
        eraOrSetting: 'Twilight Offering Vigil',
      },
    ],
  },
  mahamuni: {
    originLegend:
      'According to Rakhine and Myanmar chronicles, the great bronze Mahamuni image was cast in ancient Dhanyawadi (modern Rakhine State) during the reign of King Sanda Thuriya. For centuries it served as the focal sanctuary of western Myanmar before entering Konbaung royal history.',
    royalPatronage:
      'In 1784, during the reign of King Bodawpaya, the 3.8-meter bronze image was carefully dismantled and transported overland across the Rakhine Yoma mountain passes and down the Irrawaddy River to Amarapura, just south of Mandalay. Enshrined inside a grand hall built for it, the temple later received extensive Konbaung restoration and architectural embellishment—including its ornate seven-tiered Mandalay pyatthat spire and carved teak arcades.',
    architecturalProfile:
      'Mahamuni is approached through four covered cardinal corridors bordered by workshops of traditional craftspeople and leading to a richly gilded central chamber. Over two centuries, devotees have applied thin squares of pure gold leaf to the statue’s torso and shoulders—forming a textured golden mantle several inches thick—while the serene bronze face remains untouched and washed each dawn in a centuries-old ceremonial rite.',
    keyFacts: [
      { label: 'Location', value: 'Mandalay, Myanmar' },
      { label: 'Image Height', value: '3.8 meters (12.5 ft) cast bronze' },
      { label: 'Historic Transfer', value: '1784 CE from Dhanyawadi to Amarapura' },
      { label: 'Living Ritual', value: 'Daily 4:00 AM Ceremonial Face-Washing' },
    ],
    timeline: [
      {
        period: 'Ancient Dhanyawadi Period',
        title: 'Casting of the Mahamuni Bronze Image',
        summary:
          'Venerated in the ancient Rakhine capital of Dhanyawadi as one of Southeast Asia’s most sacred Buddha images.',
      },
      {
        period: '1784 CE (Konbaung Dynasty)',
        title: 'Journey Across the Mountains to Mandalay',
        summary:
          'Transported across the Rakhine Yoma range and along the Irrawaddy under King Bodawpaya to its sanctuary south of Mandalay.',
      },
      {
        period: '1884–1890s (Mandalay Reconstruction)',
        title: 'Seven-Tiered Pyatthat & Covered Arcades',
        summary:
          'Rebuilt after fire with iron-framed masonry and towering lacquered teak columns preserving classic Mandalay proportions.',
      },
      {
        period: 'Living Tradition',
        title: 'Dawn Homage & Generations of Gold Leaf',
        summary:
          'Monks perform the daily dawn face-washing service while pilgrims offer lotus blossoms, oil lamps, and gold leaf.',
      },
    ],
    gallery: [
      {
        src: '/src/assets/images/pagoda_mahamuni_interior_1794906334092.jpg',
        alt: 'Mahamuni Buddha image glowing with layered gold leaf inside the gilded Mandalay sanctum',
        caption: 'Fig. 1 — The venerated bronze Mahamuni Buddha seated in Bhumisparsha Mudra beneath gilded arches.',
        eraOrSetting: 'Central Sanctum Chamber',
      },
      {
        src: '/src/assets/images/mahamuni_gilded_hall_1794908982685.jpg',
        alt: 'Red-lacquered and gold-gilded columns leading toward the Mahamuni altar',
        caption: 'Fig. 2 — Lacquered and gold-leafed Mandalay hall columns framing the approach to the altar.',
        eraOrSetting: 'Konbaung Hall Architecture',
      },
      {
        src: '/src/assets/images/mahamuni_courtyard_bells_1794908983049.jpg',
        alt: 'Mahamuni covered courtyard walkway with carved eaves, bronze bell, and pyatthat roof',
        caption: 'Fig. 3 — Covered cardinal walkway, historic bronze temple bell, and seven-tiered pyatthat spire.',
        eraOrSetting: 'Courtyard & Bronze Bell Arcade',
      },
    ],
  },
  kyaiktiyo: {
    originLegend:
      'In Mon and Burmese sacred tradition, a hermit named Taik Tha received a single hair relic from the Buddha and carried it knotted within his topknot until late in life. Wishing to preserve the relic in an unforgettable natural shrine, he asked King Tissa of Thaton—who possessed a maritime guardian’s assistance—to find a granite boulder shaped like the hermit’s own head.',
    royalPatronage:
      'Found resting on the seabed and raised to the 1,100-meter crest of Mount Kyaiktiyo in the Paunglaung range, the rounded 7.3-meter boulder was balanced delicately atop an inclined cliff shelf over a tiny cavity housing the hair relic. Surmounted by a slender 7.3-meter Mon-style golden stupa, the site has drawn Mon, Bamar, and international pilgrims for generations, especially during the dry-season pilgrimage months from Tazaungdaing to Tabaung.',
    architecturalProfile:
      'Unlike urban terraced complexes, Kyaiktiyo weaves minimal, respectful masonry directly into dramatic granite cliff topography. Pilgrims step along stone bridges onto viewing platforms cantilevered above deep forested ravines, where layers of pure gold leaf coat the boulder and catch the shifting mountain mist.',
    keyFacts: [
      { label: 'Location', value: 'Mount Kyaiktiyo (1,100 m), Mon State' },
      { label: 'Boulder & Stupa', value: '7.3 m granite boulder · 7.3 m golden stupa' },
      { label: 'Sacred Tradition', value: 'Balanced upon a single Hair Relic of the Buddha' },
      { label: 'Pilgrimage Season', value: 'Tazaungdaing through Tabaung (Nov–Mar)' },
    ],
    timeline: [
      {
        period: 'Ancient Thaton & Mon Lineage',
        title: 'Hermit Taik Tha & King Tissa',
        summary:
          'Mon chronicles record the entrusting of the Buddha’s hair relic and the placement of the head-shaped granite boulder on Mount Kyaiktiyo.',
      },
      {
        period: 'Centuries of Mountain Pilgrimage',
        title: 'Forest Footpaths & Devotional Gilding',
        summary:
          'Generations of pilgrims climbed steep mountain trails carrying incense, candles, and gold leaf to offer at the cliffside terrace.',
      },
      {
        period: 'Modern Sanctuary Terraces',
        title: 'Cliffside Balustrades & Night Vigil',
        summary:
          'Viewing terraces and quiet chanting halls surround the ridge, where visitors keep dusk-to-dawn vigils above the clouds.',
      },
    ],
    gallery: [
      {
        src: '/src/assets/images/pagoda_kyaiktiyo_golden_rock_1794906334536.jpg',
        alt: 'Kyaiktiyo Golden Rock perched on the misty cliff edge of Mon State',
        caption: 'Fig. 1 — The balanced granite boulder gilded in gold leaf overlooking Mon State mountain valleys.',
        eraOrSetting: 'Mount Kyaiktiyo Cliff Crest',
      },
      {
        src: '/src/assets/images/kyaiktiyo_golden_sunset_1794908984183.jpg',
        alt: 'Close view of the Golden Rock boulder, slender summit stupa, and cliffside pilgrim walkway',
        caption: 'Fig. 2 — Late afternoon light across the 7.3-meter stupa and cantilevered pilgrim terrace.',
        eraOrSetting: 'Cliffside Terrace & Summit',
      },
      {
        src: '/src/assets/images/kyaiktiyo_mist_ridge_1794908983166.jpg',
        alt: 'Dawn sea of mountain clouds below the gilded balustrade of Mount Kyaiktiyo',
        caption: 'Fig. 3 — Morning sea of clouds drifting below pilgrims praying along the ridge balustrade.',
        eraOrSetting: 'Dawn Sea of Clouds',
      },
    ],
  },
};

export interface PagodaTourMedia {
  mapsSearchQuery: string;
  streetViewPrompt: string;
}

export const PAGODA_TOUR_MEDIA: Record<Pagoda['slug'], PagodaTourMedia> = {
  shwedagon: {
    mapsSearchQuery: 'Shwedagon Pagoda, Yangon, Myanmar',
    streetViewPrompt:
      'Drag the yellow Pegman person avatar onto any blue path or circle on the map, or walk using the 360° Street View arrows around Singuttara Hill.',
  },
  kyaiktiyo: {
    mapsSearchQuery: 'Kyaiktiyo Pagoda, Mon State, Myanmar',
    streetViewPrompt:
      'Drag the yellow Pegman person avatar onto highlighted ridge paths or viewpoints to walk around Mount Kyaiktiyo in 360°.',
  },
  mahamuni: {
    mapsSearchQuery: 'Mahamuni Buddha Temple, Mandalay, Myanmar',
    streetViewPrompt:
      'Drag the yellow Pegman person avatar onto any blue street or courtyard highlight to walk through Mahamuni Temple grounds in Mandalay.',
  },
};
