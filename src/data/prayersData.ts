export interface TraditionalPrayer {
  id: string;
  title: string;
  titleMy: string;
  paliText: string;
  myanmarMeaning: string;
  englishTranslation: string;
  contextNote: string;
  attribution: string;
}

export const TRADITIONAL_PRAYERS: TraditionalPrayer[] = [
  {
    id: 'namo-tassa',
    title: 'Homage to the Buddha (Namo Tassa)',
    titleMy: 'ဘုရားရှိခိုး ပဏာမ (နမော တဿ)',
    paliText: 'Namo tassa bhagavato arahato sammāsambuddhassa.',
    myanmarMeaning:
      'ဘုန်းတော်ခြောက်ပါးနှင့် ပြည့်စုံတော်မူသော၊ ကိလေသာအပူအပင် ကင်းဝေးတော်မူသော၊ သစ္စာလေးပါးတရားကို ကိုယ်တိုင်မှန်ကန်စွာ သိမြင်တော်မူသော မြတ်စွာဘုရားအား ရှိခိုးပါ၏။',
    englishTranslation:
      'Homage to the Blessed One, the Worthy One, the Fully Self-Awakened One.',
    contextNote:
      'Traditionally recited three times at the opening of devotion, mindfulness practice, or Dhamma reflection.',
    attribution: 'Traditional Theravada Pali Devotional Homage',
  },
  {
    id: 'tisarana',
    title: 'The Three Refuges (Tisaraṇa)',
    titleMy: 'သရဏဂုံသုံးပါး',
    paliText:
      'Buddhaṃ saraṇaṃ gacchāmi.\nDhammaṃ saraṇaṃ gacchāmi.\nSaṅghaṃ saraṇaṃ gacchāmi.',
    myanmarMeaning:
      'မြတ်စွာဘုရားကို ကိုးကွယ်ရာဟူ၍ ဆည်းကပ်ပါ၏။ တရားတော်မြတ်ကို ကိုးကွယ်ရာဟူ၍ ဆည်းကပ်ပါ၏။ သံဃာတော်မြတ်ကို ကိုးကွယ်ရာဟူ၍ ဆည်းကပ်ပါ၏။',
    englishTranslation:
      'I go to the Buddha for refuge.\nI go to the Dhamma for refuge.\nI go to the Sangha for refuge.',
    contextNote:
      'An aspiration to align one’s mind with awakening, truth, and the noble community of practitioners.',
    attribution: 'Khuddakapāṭha, Saraṇattaya',
  },
  {
    id: 'metta-aspiration',
    title: 'Loving-Kindness Aspiration (Mettā)',
    titleMy: 'မေတ္တာပို့ (သတ္တဝါအားလုံး ချမ်းသာကြပါစေ)',
    paliText:
      'Sabbe sattā averā hontu, abyāpajjā hontu, anīghā hontu, sukhī attānaṃ pariharantu.',
    myanmarMeaning:
      'လုံးစုံများစွာ သတ္တဝါတို့သည် ဘေးရန်ခပ်သိမ်း ကင်းငြိမ်းကြပါစေ။ စိတ်ဆင်းရဲခြင်း ကင်းကြပါစေ။ ကိုယ်ဆင်းရဲခြင်း ကင်းကြပါစေ။ မိမိတို့ ခန္ဓာဝန်ကို ချမ်းသာစွာ ရွက်ဆောင်နိုင်ကြပါစေ။',
    englishTranslation:
      'May all beings be free from enmity and danger. May they be free from mental suffering. May they be free from physical suffering. May they look after themselves with ease and happiness.',
    contextNote:
      'Recited daily across Myanmar monasteries and homes at the conclusion of prayer and meditation.',
    attribution: 'Traditional Burmese Theravada Mettā Formula',
  },
];
