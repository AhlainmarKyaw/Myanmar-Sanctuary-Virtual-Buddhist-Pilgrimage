import type { LanguageCode, PagodaSlug } from '../types/sanctuary';

export interface BilingualPagodaText {
  name: string;
  location: string;
  summary: string;
  historicalSignificance: string;
  originLegend: string;
  royalPatronage: string;
  architecturalProfile: string;
  keyFacts: Array<{ label: string; value: string }>;
  timeline: Array<{ period: string; title: string; summary: string }>;
  galleryCaptions: string[];
  gallerySettings: string[];
}

export const PAGODA_TRANSLATIONS_MY: Record<PagodaSlug, BilingualPagodaText> = {
  shwedagon: {
    name: 'ရွှေတိဂုံစေတီတော်',
    location: 'သိင်္ဂုတ္တရကုန်းတော်၊ ရန်ကုန်မြို့',
    summary:
      'သိင်္ဂုတ္တရကုန်းတော်ထက်ဝယ် ဉာဏ်တော် ၉၉ မီတာမြင့်မားစွာ တည်ထားကိုးကွယ်အပ်သော မြန်မာနိုင်ငံ၏ အထွတ်အမြတ်ဆုံး ရွှေစေတီတော်မြတ်ကြီး ဖြစ်ပါသည်။',
    historicalSignificance:
      'မြန်မာနှင့် မွန်ရာဇဝင်သမိုင်းများအရ ကုန်သည်ညီနောင် တပုဿနှင့် ဘလ္လိကတို့သည် မြတ်စွာဘုရားရှင်၏ ဆံတော်မြတ် ရှစ်ဆူကို ရရှိခဲ့ပြီး သိင်္ဂုတ္တရကုန်းတော်တွင် ဌာပနာတည်ထားကိုးကွယ်ခဲ့ကြသည်။ ၁၅ ရာစုတွင် ရှင်စောပုဘုရင်မကြီးနှင့် ဓမ္မစေတီမင်းတို့က ချဲ့ထွင်ရွှေချပူဇော်ခဲ့ကြသည်။',
    originLegend:
      'မြတ်စွာဘုရားရှင် ဘုရားအဖြစ်သို့ ရောက်တော်မူပြီး ၄၉ ရက်အကြာ လင်းလွန်းပင်အောက်တွင် ဥက္ကလာပတိုင်းသား ကုန်သည်ညီနောင် တပုဿနှင့် ဘလ္လိကတို့က ပျားမုန့်ဆွမ်း ဆက်ကပ်လှူဒါန်းခဲ့ကြသည်။ ဘုရားရှင်ထံမှ ဆံတော်မြတ် ရှစ်ဆူကို ချီးမြှင့်တော်မူသဖြင့် ဥက္ကလာပမင်းကြီးနှင့်အတူ ရှေးဘုရားသုံးဆူတို့၏ ပရိဘောဂဓာတ်တော်များ ကိန်းဝပ်ရာ သိင်္ဂုတ္တရကုန်းတော်ထက်တွင် တည်ထားကိုးကွယ်ခဲ့ကြသည်။',
    royalPatronage:
      'ခေတ်အဆက်ဆက် မွန်နှင့် မြန်မာမင်းများက စေတီတော်ကြီးကို တိုးချဲ့မွမ်းမံခဲ့ကြသည်။ ၁၄ ရာစုတွင် ဟံသာဝတီဘုရင် ဗညားဦးက ဉာဏ်တော်မြှင့်တင်ခဲ့ပြီး ၁၅ ရာစုတွင် ဘုရင်မကြီး ရှင်စောပုက စေတီရင်ပြင်တော်ကို ချဲ့ထွင်ကာ မိမိ၏ ကိုယ်အလေးချိန်နှင့်ညီမျှသော ရွှေစင်များဖြင့် ရွှေသင်္ကန်းကပ်လှူခဲ့သည်။ ထို့နောက် ဓမ္မစေတီမင်းက ခေါင်းလောင်းတော်နှင့် ကျောက်စာများ ထိုးမှတ်ခဲ့ပြီး ၁၇၇၄ ခုနှစ်တွင် ဆင်ဖြူရှင်မင်းတရားကြီးက ယနေ့မြင်တွေ့ရသည့် ၉၉ မီတာ ဉာဏ်တော်အထိ မြှင့်တင်ကာ ရွှေထီးတော်သစ် တင်လှူတော်မူခဲ့သည်။',
    architecturalProfile:
      'ရှေးရိုးမြန်မာ စေတီပုထိုးတော် ဗိသုကာဟန်ပန်အတိုင်း ရှစ်ထောင့်ပစ္စယာခံ၊ ပစ္စယာသုံးဆင့်၊ ကြာမှောက်ကြာလန်၊ ခေါင်းလောင်းပုံ၊ ဖောင်းရစ်အဆင့်ဆင့်၊ ငှက်ပျောဖူးနှင့် ရတနာစီခြယ်ထားသော ထီးတော်ခုနစ်ဆင့်တို့ဖြင့် တင့်တယ်သပ္ပာယ်စွာ တည်ဆောက်ထားပါသည်။',
    keyFacts: [
      { label: 'တည်နေရာ', value: 'သိင်္ဂုတ္တရကုန်းတော်၊ ရန်ကုန်မြို့' },
      { label: 'ဉာဏ်တော်အမြင့်', value: '၉၉ မီတာ (၃၂၅ ပေ)' },
      { label: 'ဌာပနာတော်', value: 'မြတ်စွာဘုရားရှင်၏ ဆံတော်မြတ် ရှစ်ဆူ' },
      { label: 'အဓိက ကုသိုလ်ရှင်များ', value: 'ရှင်စောပု၊ ဓမ္မစေတီမင်း၊ ဆင်ဖြူရှင်မင်း' },
    ],
    timeline: [
      {
        period: 'သမိုင်းဦးကာလ',
        title: 'ဆံတော်ရှစ်ဆူ ဌာပနာခြင်း',
        summary: 'တပုဿနှင့် ဘလ္လိက ကုန်သည်ညီနောင်တို့က ဥက္ကလာပမင်းကြီးနှင့်အတူ သိင်္ဂုတ္တရကုန်းတော်တွင် ဌာပနာတည်ထားခဲ့သည်။',
      },
      {
        period: '၁၃၆၂–၁၄၇၂ ခုနှစ် (ဟံသာဝတီခေတ်)',
        title: 'ရင်ပြင်တော် ချဲ့ထွင်ခြင်းနှင့် ရွှေသင်္ကန်းကပ်လှူခြင်း',
        summary: 'ဗညားဦးနှင့် ရှင်စောပုဘုရင်မကြီးတို့က ရင်ပြင်တော်ကို ချဲ့ထွင်၍ ရွှေချပူဇော်ခဲ့ပြီး ဓမ္မစေတီမင်းက သမိုင်းကျောက်စာ စိုက်ထူခဲ့သည်။',
      },
      {
        period: '၁၇၇၄ ခုနှစ် (ကုန်းဘောင်ခေတ်)',
        title: 'ဉာဏ်တော် ၉၉ မီတာသို့ မြှင့်တင်ခြင်း',
        summary: 'ဆင်ဖြူရှင်မင်းတရားကြီးက စေတီတော်ကြီးကို ယနေ့ဉာဏ်တော်အမြင့်သို့ မြှင့်တင်တည်ထားကာ ထီးတော်သစ် တင်လှူတော်မူခဲ့သည်။',
      },
      {
        period: 'မျက်မှောက်ခေတ် သာသနာ',
        title: 'နေ့စဉ်ဝတ်ပြုခြင်းနှင့် ဂြိုဟ်တိုင်ထောင့်များ',
        summary: 'ဗုဒ္ဓဘာသာဝင်များသည် လက်ယာရစ် လှည့်လည်ပူဇော်ခြင်း၊ ဆီမီးထွန်းညှိခြင်းနှင့် ဂြိုဟ်တိုင်ထောင့်များတွင် ရေသပ္ပာယ်ခြင်းများ ပြုလုပ်ကြသည်။',
      },
    ],
    galleryCaptions: [
      'ပုံ (၁) — နေဝင်ဆည်းဆာအလင်းရောင်အောက်တွင် တင့်တယ်သပ္ပာယ်နေသော ရွှေတိဂုံစေတီတော်မြတ်ကြီး။',
      'ပုံ (၂) — စကျင်ကျောက်ရင်ပြင်တော်၊ အရံစေတီများနှင့် ရှေးမူမပျက် ပြာသာဒ်ဆောင်တန်ဆောင်း။',
      'ပုံ (၃) — ညနေဆည်းဆာအချိန် ဆီမီးရောင်များဖြင့် ထွန်းလင်းတောက်ပနေသော စေတီတော်နှင့် ထီးတော်မြတ်။',
    ],
    gallerySettings: ['သိင်္ဂုတ္တရကုန်းတော် ထိပ်ဖျား', '၁၅ ရာစု ရင်ပြင်တော်', 'ညနေဆည်းဆာ ဆီမီးပူဇော်ပွဲ'],
  },
  mahamuni: {
    name: 'မဟာမုနိဘုရားကြီး',
    location: 'မန္တလေးမြို့',
    summary:
      'ရွှေချတိုင်လုံးများ၊ မြန်မာ့ပန်းပုလက်ရာများနှင့် တည်ငြိမ်အေးချမ်းသော ဖယောင်းတိုင်မီးရောင်အောက်တွင် သီတင်းသုံးတော်မူသော မဟာမုနိရုပ်ပွားတော်မြတ်ကြီး ဖြစ်ပါသည်။',
    historicalSignificance:
      'ရှေးဟောင်း ရခိုင်ပြည် ဓညဝတီမြို့တော်မှ စတင်ခဲ့သော မဟာမုနိရုပ်ပွားတော်မြတ်ကြီးကို ၁၇၈၄ ခုနှစ် ဘိုးတော်ဘုရားလက်ထက်တွင် အမရပူရမြို့တော်သို့ ပင့်ဆောင်ကိုးကွယ်ခဲ့သည်။ မျက်နှာတော်မှအပ ကိုယ်တော်တစ်ခုလုံးကို ခေတ်အဆက်ဆက် ရွှေဆိုင်းများ ကပ်လှူပူဇော်ထားကြသည်။',
    originLegend:
      'ရခိုင်နှင့် မြန်မာရာဇဝင်များအရ မဟာမုနိ ကြေးသွန်းရုပ်ပွားတော်မြတ်ကြီးကို စန္ဒသူရိယမင်းကြီးလက်ထက် ဓညဝတီမြို့ဟောင်းတွင် သွန်းလုပ်ပူဇော်ခဲ့ပြီး မြတ်စွာဘုရားရှင် ကိုယ်တိုင် သက်ရှိထင်ရှားရှိစဉ် ကိုယ်စားတော်အဖြစ် ချီးမြှင့်ခဲ့သည်ဟု ယုံကြည်ကိုးကွယ်ကြသည်။',
    royalPatronage:
      'ခရစ်နှစ် ၁၇၈၄ ခုနှစ် ကုန်းဘောင်မင်းဆက် ဘိုးတော်ဘုရားလက်ထက်တွင် အမြင့် ၃.၈ မီတာရှိသော ကြေးဆင်းတုတော်ကြီးကို ရခိုင်ရိုးမတောင်တန်းနှင့် ဧရာဝတီမြစ်ကြောင်းအတိုင်း အမရပူရသို့ ပင့်ဆောင်တော်မူခဲ့သည်။ ထို့နောက် မန္တလေးတောင်ပိုင်းရှိ စံကျောင်းတော်ကြီးအတွင်း ဘုံခုနစ်ဆင့်ရှိသော ပြာသာဒ်ဆောင်နှင့် တန်ဆောင်းစောင်းတန်းလေးသွယ်ဖြင့် ထည်ဝါစွာ တည်ဆောက်ကိုးကွယ်ခဲ့သည်။',
    architecturalProfile:
      'အရပ်လေးမျက်နှာရှိ စောင်းတန်းလေးသွယ်မှတစ်ဆင့် ရွှေချထားသော ကျွန်းတိုင်လုံးကြီးများဝန်းရံထားသည့် ပင်မဂန္ဓကုဋိတိုက်အတွင်းသို့ ဝင်ရောက်ဖူးမြော်ရသည်။ ရုပ်ပွားတော်မြတ်၏ ကိုယ်တော်ပေါ်တွင် ဘုရားဖူးများ ကပ်လှူထားသော ရွှေဆိုင်းများ ထူထဲစွာ တည်ရှိနေသော်လည်း မျက်နှာတော်ကိုမူ ရွှေချခြင်းမပြုဘဲ နေ့စဉ်အရုဏ်တက်ချိန်တွင် မျက်နှာသစ်တော်ရေ ဆက်ကပ်လေ့ရှိသည်။',
    keyFacts: [
      { label: 'တည်နေရာ', value: 'မန္တလေးမြို့၊ မြန်မာနိုင်ငံ' },
      { label: 'ဉာဏ်တော်အမြင့်', value: '၃.၈ မီတာ (၁၂.၅ ပေ) ကြေးသွန်းဆင်းတုတော်' },
      { label: 'သမိုင်းဝင် ပင့်ဆောင်နှစ်', value: '၁၇၈၄ ခုနှစ် (ဓညဝတီမှ အမရပူရသို့)' },
      { label: 'နေ့စဉ် ဝတ်ပြုမှု', value: 'နံနက် ၄:၀၀ နာရီ မျက်နှာသစ်တော်ရေ ဆက်ကပ်ပွဲ' },
    ],
    timeline: [
      {
        period: 'ရှေးဟောင်း ဓညဝတီခေတ်',
        title: 'မဟာမုနိ ကြေးသွန်းရုပ်ပွားတော် သွန်းလုပ်ခြင်း',
        summary: 'ရခိုင်ပြည် ဓညဝတီမြို့တော်တွင် ရှေးအကျဆုံးနှင့် အထွတ်အမြတ်ဆုံး ရုပ်ပွားတော်အဖြစ် ကိုးကွယ်ခဲ့ကြသည်။',
      },
      {
        period: '၁၇၈၄ ခုနှစ် (ကုန်းဘောင်ခေတ်)',
        title: 'ရခိုင်ရိုးမကို ဖြတ်ကျော်၍ မန္တလေးသို့ ပင့်ဆောင်ခြင်း',
        summary: 'ဘိုးတော်ဘုရားလက်ထက်တွင် ရခိုင်ရိုးမတောင်တန်းနှင့် ဧရာဝတီမြစ်ကြောင်းအတိုင်း အမရပူရသို့ ပင့်ဆောင်တည်ထားခဲ့သည်။',
      },
      {
        period: '၁၈၈၄–၁၈၉၀ ပြည့်နှစ်များ',
        title: 'ဘုံခုနစ်ဆင့် ပြာသာဒ်ဆောင်နှင့် စောင်းတန်းများ',
        summary: 'မီးဘေးသင့်ပြီးနောက် မန္တလေးဗိသုကာဟန်ပန်အတိုင်း ကျွန်းတိုင်လုံးကြီးများနှင့် ပြာသာဒ်တော်ကို ပြန်လည်တည်ဆောက်ခဲ့သည်။',
      },
      {
        period: 'မျက်မှောက်ခေတ် ဓလေ့',
        title: 'အရုဏ်တက် မျက်နှာသစ်တော်နှင့် ရွှေဆိုင်းပူဇော်ခြင်း',
        summary: 'နေ့စဉ် အရုဏ်တက်ချိန် မျက်နှာသစ်တော်ရေ ဆက်ကပ်ခြင်းနှင့် ပန်း၊ ဆီမီး၊ ရွှေဆိုင်း ကပ်လှူပူဇော်မှုများ ဆက်လက်ပြုလုပ်ကြသည်။',
      },
    ],
    galleryCaptions: [
      'ပုံ (၁) — ရွှေရောင်တဝင်းဝင်းဖြင့် ဘူမိဖဿမုဒြာဟန် သီတင်းသုံးတော်မူသော မဟာမုနိရုပ်ပွားတော်မြတ်။',
      'ပုံ (၂) — ပင်မဂန္ဓကုဋိတိုက်အတွင်းရှိ သစ်စေးသုတ် ရွှေချကျွန်းတိုင်လုံးကြီးများနှင့် မီးအလင်းရောင်။',
      'ပုံ (၃) — စောင်းတန်းလမ်းမ၊ သမိုင်းဝင် ကြေးခေါင်းလောင်းကြီးနှင့် ဘုံခုနစ်ဆင့် ပြာသာဒ်ဆောင်။',
    ],
    gallerySettings: ['ပင်မဂန္ဓကုဋိတိုက်', 'ကုန်းဘောင်ခေတ် ခန်းမဆောင်', 'စောင်းတန်းနှင့် ခေါင်းလောင်းတော်'],
  },
  kyaiktiyo: {
    name: 'ကျိုက်ထီးရိုးစေတီတော်',
    location: 'ကျိုက်ထီးရိုးတောင်၊ မွန်ပြည်နယ်',
    summary:
      'မွန်ပြည်နယ်၏ မြူခိုးဝေသော တောင်ကြောထက် ချောက်ကမ်းပါးစွန်းတွင် ထူးခြားအံ့ဖွယ် တည်ရှိနေသည့် ရွှေကျောက်တုံးတော်နှင့် စေတီတော်မြတ် ဖြစ်ပါသည်။',
    historicalSignificance:
      'ပင်လယ်ရေမျက်နှာပြင်အထက် မီတာ ၁,၁၀၀ ခန့်အမြင့်တွင် တည်ရှိသော ကျိုက်ထီးရိုးစေတီတော်သည် မြတ်စွာဘုရားရှင်၏ ဆံတော်မြတ် တစ်ဆူပေါ်တွင် အံ့ဖွယ်တည်မြဲနေသည်ဟု မွန်နှင့် မြန်မာတို့ အထွတ်အမြတ် ယုံကြည်ကိုးကွယ်ကြသည်။',
    originLegend:
      'မွန်နှင့် မြန်မာသမိုင်းကြောင်းများအရ တိဿရသေ့ကြီးသည် မြတ်စွာဘုရားရှင်ထံမှ ရရှိခဲ့သော ဆံတော်မြတ်တစ်ဆူကို မိမိ၏ ဆံထုံးအတွင်း၌ ထိန်းသိမ်းကိုးကွယ်ခဲ့သည်။ သက်တော်ရင့်လာသောအခါ သထုံပြည့်ရှင် တိဿမင်းကြီးထံ အပ်နှံ၍ မိမိ၏ ဦးခေါင်းနှင့်တူသော ကျောက်တုံးတစ်တုံးကို ရှာဖွေကာ ဆံတော်မြတ်ကို ဌာပနာတည်ထားပေးရန် မှာကြားတော်မူခဲ့သည်။',
    royalPatronage:
      'ပင်လယ်ကြမ်းပြင်မှ ရှာဖွေတွေ့ရှိခဲ့သော ၇.၃ မီတာခန့်ရှိ နှမ်းဖတ်ကျောက်တုံးကြီးကို ပေါင်လောင်းတောင်တန်းရှိ မီတာ ၁,၁၀၀ မြင့်သော ကျိုက်ထီးရိုးတောင်ထိပ် ကမ်းပါးစွန်းတွင် ဆံတော်မြတ် ဌာပနာ၍ တင်ထားခဲ့သည်။ ကျောက်တုံးတော်ထိပ်တွင် ၇.၃ မီတာမြင့်သော မွန်စေတီတော်ကို တည်ထားကိုးကွယ်ခဲ့ရာ တန်ဆောင်မုန်းလမှ တပေါင်းလအထိ နှစ်စဉ် ဘုရားဖူးများဖြင့် စည်ကားလှပါသည်။',
    architecturalProfile:
      'သဘာဝတောင်ကမ်းပါးနှင့် သဟဇာတဖြစ်အောင် တည်ဆောက်ထားသော ရင်ပြင်တော်များ၊ တံတားငယ်များနှင့် ကျောက်တုံးတော်ပေါ်မှ ရွှေသင်္ကန်းများသည် တောင်ပေါ်မြူနှင်းများကြားတွင် တင့်တယ်စွာ ထွန်းလင်းတောက်ပနေပါသည်။',
    keyFacts: [
      { label: 'တည်နေရာ', value: 'ကျိုက်ထီးရိုးတောင် (၁,၁၀၀ မီတာ)၊ မွန်ပြည်နယ်' },
      { label: 'ကျောက်တုံးနှင့် စေတီ', value: '၇.၃ မီတာ ကျောက်တုံးတော် · ၇.၃ မီတာ စေတီတော်' },
      { label: 'သမိုင်းဝင် ယုံကြည်မှု', value: 'မြတ်စွာဘုရားရှင်၏ ဆံတော်မြတ်တစ်ဆူပေါ်တွင် တည်ရှိခြင်း' },
      { label: 'ဘုရားဖူးရာသီ', value: 'တန်ဆောင်မုန်းလမှ တပေါင်းလအထိ (နိုဝင်ဘာ–မတ်)' },
    ],
    timeline: [
      {
        period: 'ရှေးဟောင်း သထုံနှင့် မွန်ခေတ်',
        title: 'တိဿရသေ့ကြီးနှင့် တိဿမင်းကြီး',
        summary: 'မြတ်စွာဘုရားရှင်၏ ဆံတော်မြတ်ကို ရသေ့ဦးခေါင်းသဏ္ဌာန် ကျောက်တုံးတော်အောက်တွင် ဌာပနာတည်ထားခဲ့သည်။',
      },
      {
        period: 'ရာစုနှစ်များစွာ တောင်တက်ဘုရားဖူး ဓလေ့',
        title: 'တောတောင်လမ်းများနှင့် ရွှေဆိုင်းကပ်လှူခြင်း',
        summary: 'ဘုရားဖူးများသည် တောတောင်ခရီးကြမ်းကို ခြေကျင်တက်ရောက်၍ ဆီမီး၊ အမွှေးတိုင်နှင့် ရွှေဆိုင်းများ ကပ်လှူပူဇော်ခဲ့ကြသည်။',
      },
      {
        period: 'မျက်မှောက်ခေတ် တောင်ထိပ်ရင်ပြင်',
        title: 'တောင်ကမ်းပါး ရင်ပြင်တော်နှင့် ညဉ့်ဝတ်ပြုပွဲ',
        summary: 'တိမ်ပင်လယ်ကို မျက်နှာမူထားသော ရင်ပြင်တော်များထက်တွင် ဘုရားဖူးများ ငြိမ်းချမ်းစွာ တရားထိုင် ဝတ်ပြုကြသည်။',
      },
    ],
    galleryCaptions: [
      'ပုံ (၁) — မွန်ပြည်နယ် တောင်တန်းမြူခိုးများကြားတွင် ထူးခြားစွာ တည်ရှိနေသော ကျိုက်ထီးရိုးရွှေကျောက်တုံးတော်။',
      'ပုံ (၂) — ညနေခင်း နေရောင်ခြည်အောက်မှ ၇.၃ မီတာ စေတီတော်နှင့် ဘုရားဖူးရင်ပြင်တော်။',
      'ပုံ (၃) — နံနက်ခင်း တိမ်ပင်လယ်အထက် ရွှေလက်ရန်းဘေးတွင် ဝတ်ပြုဆုတောင်းနေကြသော ဘုရားဖူးများ။',
    ],
    gallerySettings: ['ကျိုက်ထီးရိုးတောင်ထိပ် ကမ်းပါး', 'ရင်ပြင်တော်နှင့် စေတီတော်', 'နံနက်ခင်း တိမ်ပင်လယ်'],
  },
};

interface UiDictionary {
  nav: {
    pagodas: string;
    meditation: string;
    prayerMala: string;
    heritage: string;
    dhamma: string;
    signIn: string;
    dashboard: string;
  };
  footer: {
    tagline: string;
    pagodas: string;
    meditation: string;
    prayerMala: string;
    heritage: string;
    dhamma: string;
    journal: string;
  };
  landing: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    enterSanctuary: string;
    beginMeditation: string;
    purposeKicker: string;
    purposeTitle: string;
    purposeP1: string;
    purposeP2: string;
    pagodasKicker: string;
    pagodasTitle: string;
    readPagodaHistories: string;
    viewAllTours: string;
    walkMapStreetView: string;
    pointsOfInterest: string;
    mindfulnessKicker: string;
    mindfulnessTitle: string;
    meditationTitle: string;
    meditationDesc: string;
    openMeditation: string;
    prayerTitle: string;
    prayerDesc: string;
    visitPrayer: string;
    malaTitle: string;
    malaDesc: string;
    practiceMala: string;
    heritageKicker: string;
    heritageTitle: string;
    heritageDesc: string;
    todaysDhamma: string;
    exploreFigures: string;
    readDhamma: string;
  };
  pagodas: {
    kicker: string;
    title: string;
    subtitle: string;
    save: string;
    saved: string;
    highlightsMeta: string;
    visitInPerson: string;
    readHistoryPhotos: string;
    archiveKicker: string;
    archiveTitle: string;
    allPagodas: string;
    mapAndStreetView: string;
    walk360: string;
    historyAndPhotos: string;
    favorite: string;
    favorited: string;
    sacredHighlights: string;
    showHighlights: string;
    hideHighlights: string;
  };
  history: {
    kickerPrefix: string;
    walkInMap: string;
    archivalPhotos: string;
    inspectHint: string;
    enlarge: string;
    originTitle: string;
    patronageTitle: string;
    architectureTitle: string;
    timelineTitle: string;
    photoCounter: (idx: number, total: number) => string;
  };
  meditation: {
    kicker: string;
    title: string;
    chimeBell: string;
    audioOn: string;
    muted: string;
    completeTitle: string;
    completeDesc: (time: string, guided: boolean) => string;
    completeNote: string;
    prepareAnother: string;
    breathInhale: string;
    breathHold: string;
    breathExhale: string;
    sessionPaused: string;
    readyToBegin: string;
    idleQuote: string;
    guidedPrompts: string[];
    start: string;
    pause: string;
    resume: string;
    endSession: string;
    practiceStyle: string;
    guidedCues: string;
    silentSitting: string;
    durationLabel: string;
    ambientLabel: string;
    ambientOptions: Record<'bells' | 'birds' | 'wind' | 'water' | 'none', string>;
  };
  prayer: {
    kicker: string;
    title: string;
    tabAltar: string;
    tabMala: string;
    respectfulNote: string;
    candleLit: string;
    lightCandle: string;
    incenseOffered: string;
    offerIncense: string;
    chantDrone: string;
    chantAudio: string;
    quietOn: string;
    quietMode: string;
    traditionalRecitation: string;
    bell: string;
    hideTranslations: string;
    showTranslations: string;
    saveActivity: string;
    savedActivity: string;
  };
  mala: {
    kicker: string;
    title: string;
    soundOn: string;
    muted: string;
    resetRound: string;
    of108Beads: string;
    tapRing: string;
    completedRounds: string;
    lifetimeBeads: string;
    description: string;
    countNextBead: string;
  };
  heritage: {
    kicker: string;
    titleFigures: string;
    titlePagodas: string;
    descFigures: string;
    descPagodas: string;
    tabFigures: string;
    tabPagodas: string;
    bioTitle: string;
    teachingsTitle: string;
    contributionsTitle: string;
    quotesTitle: string;
    sourceLabel: string;
  };
  dhamma: {
    kicker: string;
    title: string;
    featuredPrefix: string;
    saved: string;
    saveTeaching: string;
    save: string;
    meaningContext: string;
    dailyReflection: string;
    archiveTitle: string;
    allTeachings: string;
    savedFilter: string;
    emptySaved: string;
  };
  auth: {
    memberAccess: string;
    signInTitle: string;
    registerTitle: string;
    resetTitle: string;
    subtitle: string;
    continueGoogle: string;
    orWithEmail: string;
    tabSignIn: string;
    tabRegister: string;
    tabReset: string;
    displayName: string;
    emailLabel: string;
    passwordLabel: string;
    createAccount: string;
    sendReset: string;
    signInEmail: string;
    signedInAs: string;
    syncedNote: string;
    openDashboard: string;
    explorePagodas: string;
  };
  dashboard: {
    loading: string;
    protectedTitle: string;
    protectedDesc: string;
    signInOrRegister: string;
    journalKicker: string;
    welcome: string;
    adminConsole: string;
    signOut: string;
    totalMeditation: string;
    completedSessions: string;
    malaRounds: string;
    prayerReflections: string;
    favAndRecent: string;
    explorePagodas: string;
    favorites: string;
    noFavorites: string;
    recentVisits: string;
    noVisits: string;
    recentActivity: string;
    noActivity: string;
    savedDhammaTitle: string;
    browseAll: string;
    noSavedDhamma: string;
    profileSettings: string;
    displayName: string;
    preferredLang: string;
    recordPractice: string;
    recordPracticeDesc: string;
    keepPrivate: string;
    keepPrivateDesc: string;
    saving: string;
    settingsSaved: string;
    saveSettings: string;
  };
}

const EN_DICT: UiDictionary = {
  nav: {
    pagodas: 'Pagodas',
    meditation: 'Meditation',
    prayerMala: 'Prayer & Mala',
    heritage: 'Heritage',
    dhamma: 'Dhamma',
    signIn: 'Sign In',
    dashboard: 'Dashboard',
  },
  footer: {
    tagline:
      'A respectful digital space for contemplation, mindfulness practice, and exploring Myanmar’s sacred Buddhist heritage.',
    pagodas: 'Pagodas',
    meditation: 'Meditation',
    prayerMala: 'Prayer & Mala',
    heritage: 'Heritage',
    dhamma: 'Daily Dhamma',
    journal: 'Personal Journal',
  },
  landing: {
    heroKicker: 'Myanmar Buddhist Heritage · Street View & Mindfulness',
    heroTitle: 'Virtual Myanmar Buddhist Sanctuary',
    heroSubtitle:
      'Step calmly into a digital refuge honoring Myanmar’s sacred pagodas. Walk the real grounds of Shwedagon, Mahamuni, and Kyaiktiyo through Google Street View and Pegman map exploration, alongside meditation and prayer.',
    enterSanctuary: 'Enter Sanctuary',
    beginMeditation: 'Begin Quiet Meditation',
    purposeKicker: 'Purpose of the Platform',
    purposeTitle: 'A quiet bridge to Myanmar’s living Buddhist sanctuaries',
    purposeP1:
      'Built with deep respect for Myanmar’s Theravada Buddhist heritage, this sanctuary welcomes travelers, diaspora communities, and students of mindfulness who wish to experience sacred spaces from afar.',
    purposeP2:
      'Rather than replacing temple attendance or monastic guidance, the platform offers an educational, contemplative companion—uniting real-world 360° Street View presence, mindful silence, and verified historical teachings.',
    pagodasKicker: 'Three Sacred Destinations',
    pagodasTitle: 'Walk Sacred Pagoda Grounds in Person',
    readPagodaHistories: 'Read Pagoda Histories',
    viewAllTours: 'View all pagoda tours',
    walkMapStreetView: 'Walk in Map & Street View',
    pointsOfInterest: 'Points of Interest',
    mindfulnessKicker: 'Mindfulness & Devotion',
    mindfulnessTitle: 'Spaces for Meditation, Prayer, and Bead Counting',
    meditationTitle: 'Meditation Room',
    meditationDesc:
      'Settle into guided or silent mindfulness sessions with 5 to 60-minute timers, calm breathing pacing, and natural soundscapes of temple bells, breeze, birds, and flowing water.',
    openMeditation: 'Open Meditation Room',
    prayerTitle: 'Virtual Prayer Altar',
    prayerDesc:
      'Offer virtual candlelight and incense in quiet contemplation, read traditional Pali homages alongside Burmese and English translations, or switch to Quiet Prayer Mode.',
    visitPrayer: 'Visit Prayer Room',
    malaTitle: '108-Bead Digital Mala',
    malaDesc:
      'Practice focused recitation with a traditional circular 108-bead mala ring, tactile tap or keyboard progression, subtle sandalwood sound cues, and round tracking.',
    practiceMala: 'Practice with Mala',
    heritageKicker: 'Myanmar Buddhist Heritage',
    heritageTitle: 'Lineage of Scholarship & Insight',
    heritageDesc:
      'For centuries, Myanmar’s monasteries have preserved the Pali Tipiṭaka and cultivated insight meditation lineages carried across the globe. Explore verified biographies of Ledi Sayadaw, Mahasi Sayadaw, and Mingun Sayadaw.',
    todaysDhamma: 'Today’s Dhamma',
    exploreFigures: 'Explore Three Buddhist Figures',
    readDhamma: 'Read Daily Dhamma',
  },
  pagodas: {
    kicker: 'Virtual Pagoda Exploration',
    title: 'Choose a Sacred Myanmar Pagoda',
    subtitle:
      'Experience each sacred Myanmar pagoda as if standing on its grounds—walk 360° Google Street View with the Pegman person avatar on the interactive map and explore historical archives with photography.',
    save: 'Save',
    saved: 'Saved',
    highlightsMeta: 'Interactive Map & 360° Street View',
    visitInPerson: 'Visit Pagoda in Person',
    readHistoryPhotos: 'Read History & Photos',
    archiveKicker: 'Pagodas Historical Archive',
    archiveTitle: 'Origins, Royal Patronage & Sacred Architecture',
    allPagodas: 'All Pagodas',
    mapAndStreetView: 'Map & Street View',
    walk360: '360° Walk',
    historyAndPhotos: 'History & Photos',
    favorite: 'Favorite',
    favorited: 'Favorited',
    sacredHighlights: 'Sacred Highlights:',
    showHighlights: 'Show Sacred Highlights',
    hideHighlights: 'Hide Highlights (H)',
  },
  history: {
    kickerPrefix: 'Historical Chronicle & Visual Archive',
    walkInMap: 'Walk in Map & Street View',
    archivalPhotos: 'Archival Photographs',
    inspectHint: 'Select any photograph to inspect full view',
    enlarge: 'Enlarge',
    originTitle: 'Sacred Origin & Relic Tradition',
    patronageTitle: 'Royal Patronage & Centuries of Expansion',
    architectureTitle: 'Architectural Proportions & Craftsmanship',
    timelineTitle: 'Historical Timeline',
    photoCounter: (idx, total) => `Photo ${idx} of ${total}`,
  },
  meditation: {
    kicker: 'Mindfulness Practice · Ānāpānasati',
    title: 'Meditation Room',
    chimeBell: 'Chime Bell',
    audioOn: 'Audio On',
    muted: 'Muted',
    completeTitle: 'Meditation Session Complete',
    completeDesc: (time, guided) =>
      `Sādhu. You practiced for ${time} in ${guided ? 'Guided Mindfulness' : 'Silent Practice'} mode.`,
    completeNote:
      'Recorded to your practice journal. Sign in anytime to sync your sessions across devices.',
    prepareAnother: 'Prepare Another Session',
    breathInhale: 'Inhale gently',
    breathHold: 'Hold softly',
    breathExhale: 'Exhale slowly',
    sessionPaused: 'Session Paused',
    readyToBegin: 'Ready to Begin',
    idleQuote: '“When the breath is quiet and steady, the mind settles like clear mountain water.”',
    guidedPrompts: [
      'Settle your posture gently. Let the shoulders soften and notice the weight of the body.',
      'Bring quiet attention to the natural rhythm of your breath at the nostrils or abdomen.',
      'As you breathe in, know you are breathing in. As you breathe out, release unnecessary tension.',
      'If thoughts wander, acknowledge them kindly without judgment and return to the breath.',
      'Rest in open, steady awareness—nothing to force, simply observing each moment as it arises.',
    ],
    start: 'Start Meditation',
    pause: 'Pause',
    resume: 'Resume',
    endSession: 'End Session',
    practiceStyle: 'Practice Style',
    guidedCues: 'Guided Cues',
    silentSitting: 'Silent Sitting',
    durationLabel: 'Duration (Minutes)',
    ambientLabel: 'Ambient Soundscape',
    ambientOptions: {
      bells: 'Temple Bells',
      birds: 'Morning Birds',
      wind: 'Hillside Wind',
      water: 'Flowing Water',
      none: 'Pure Silence',
    },
  },
  prayer: {
    kicker: 'Devotion & Contemplation',
    title: 'Virtual Prayer Room & Digital Mala',
    tabAltar: 'Sacred Prayer Altar',
    tabMala: '108-Bead Digital Mala',
    respectfulNote:
      'Created respectfully as an educational and contemplative aid—honoring, never replacing, traditional temple worship and monastic guidance.',
    candleLit: 'Candle Lit',
    lightCandle: 'Light Candle',
    incenseOffered: 'Incense Offered',
    offerIncense: 'Offer Incense',
    chantDrone: 'Chant Drone',
    chantAudio: 'Chant Audio',
    quietOn: 'Quiet Mode On',
    quietMode: 'Quiet Mode',
    traditionalRecitation: 'Traditional Recitation',
    bell: 'Bell',
    hideTranslations: 'Hide Translations',
    showTranslations: 'Show Translations',
    saveActivity: 'Save Prayer Activity Privately',
    savedActivity: 'Prayer Activity Saved Privately',
  },
  mala: {
    kicker: '108-Bead Mala · စိပ်ပုတီး',
    title: 'Digital Buddhist Prayer Beads',
    soundOn: 'Sound On',
    muted: 'Muted',
    resetRound: 'Reset Round',
    of108Beads: 'of 108 beads',
    tapRing: 'Tap ring to advance',
    completedRounds: 'Completed Rounds',
    lifetimeBeads: 'Lifetime Beads',
    description:
      'Often paired with contemplations such as Buddho, Anicca, or the Nine Virtues of the Buddha (ဂုဏ်တော်ကိုးပါး). Completing bead 108 rings a soft temple bell and increments your round total.',
    countNextBead: 'Count Next Bead',
  },
  heritage: {
    kicker: 'Myanmar Buddhist Heritage',
    titleFigures: 'Three Famous Buddhist Figures of Myanmar',
    titlePagodas: 'History & Archives of Myanmar’s Sacred Pagodas',
    descFigures:
      'Explore the verified biographies, historical contexts, and enduring teachings of three revered Theravada masters whose scholarship and insight practice shaped modern Myanmar Buddhism.',
    descPagodas:
      'Trace the sacred relic traditions, royal patronage, architectural lineages, and archival photography of Shwedagon, Mahamuni, and Kyaiktiyo pagodas.',
    tabFigures: 'Buddhist Figures',
    tabPagodas: 'Pagodas History',
    bioTitle: 'Biography & Historical Context',
    teachingsTitle: 'Core Teachings',
    contributionsTitle: 'Key Contributions',
    quotesTitle: 'Selected Teachings & Verified Sources',
    sourceLabel: 'Source',
  },
  dhamma: {
    kicker: 'Canonical Buddhist Wisdom',
    title: 'Daily Dhamma',
    featuredPrefix: 'Featured Reflection',
    saved: 'Saved',
    saveTeaching: 'Save Teaching',
    save: 'Save',
    meaningContext: 'Meaning & Context',
    dailyReflection: 'Daily Reflection',
    archiveTitle: 'Previous Teachings Archive',
    allTeachings: 'All Teachings',
    savedFilter: 'Saved',
    emptySaved:
      'No saved teachings in the archive yet. Click “Save Teaching” on any reflection to bookmark it here.',
  },
  auth: {
    memberAccess: 'Sanctuary Member Access',
    signInTitle: 'Sign In to Your Practice',
    registerTitle: 'Create a Member Account',
    resetTitle: 'Reset Your Password',
    subtitle:
      'Visitors can explore pagodas and practice freely; signing in saves meditation sessions, prayer history, mala rounds, and saved Dhamma privately.',
    continueGoogle: 'Continue with Google',
    orWithEmail: 'or with email',
    tabSignIn: 'Sign In',
    tabRegister: 'Register',
    tabReset: 'Reset',
    displayName: 'Display Name',
    emailLabel: 'Email Address',
    passwordLabel: 'Password',
    createAccount: 'Create Account',
    sendReset: 'Send Reset Email',
    signInEmail: 'Sign In with Email',
    signedInAs: 'Signed in as',
    syncedNote:
      'Your meditation sessions, prayer reflections, mala rounds, and saved Dhamma are synced with your Sanctuary account.',
    openDashboard: 'Open Practice Dashboard',
    explorePagodas: 'Explore Pagodas',
  },
  dashboard: {
    loading: 'Loading your personal sanctuary journal...',
    protectedTitle: 'Protected Member Dashboard',
    protectedDesc:
      'Sign in to view your meditation minutes, private prayer history, 108-bead mala rounds, favorite pagodas, and saved Dhamma teachings.',
    signInOrRegister: 'Sign In or Register',
    journalKicker: 'Personal Sanctuary Journal',
    welcome: 'Welcome,',
    adminConsole: 'Admin Console',
    signOut: 'Sign Out',
    totalMeditation: 'Total Meditation Time',
    completedSessions: 'Completed Sessions',
    malaRounds: '108-Bead Mala Rounds',
    prayerReflections: 'Prayer Reflections',
    favAndRecent: 'Favorite & Recently Visited Pagodas',
    explorePagodas: 'Explore Pagodas',
    favorites: 'Favorites',
    noFavorites: 'No favorite pagodas saved yet.',
    recentVisits: 'Recent Visits',
    noVisits: 'No recent pagoda visits logged yet.',
    recentActivity: 'Recent Meditation & Prayer Activity',
    noActivity: 'Complete a meditation or prayer session to see your practice history here.',
    savedDhammaTitle: 'Saved Dhamma Teachings',
    browseAll: 'Browse All',
    noSavedDhamma: 'Bookmark reflections in Daily Dhamma to keep them in your personal archive.',
    profileSettings: 'Profile & Privacy Settings',
    displayName: 'Display Name',
    preferredLang: 'Preferred Language',
    recordPractice: 'Record Personal Practice',
    recordPracticeDesc:
      'Save meditation sessions, mala rounds, and private prayer reflections to your account.',
    keepPrivate: 'Keep Profile Private',
    keepPrivateDesc: 'When unchecked, your practice activity remains visible only to you.',
    saving: 'Saving...',
    settingsSaved: 'Settings Saved',
    saveSettings: 'Save Settings',
  },
};

const MY_DICT: UiDictionary = {
  nav: {
    pagodas: 'စေတီပုထိုးများ',
    meditation: 'တရားထိုင်ခြင်း',
    prayerMala: 'ဝတ်ပြုခြင်းနှင့် ပုတီး',
    heritage: 'အမွေအနှစ်',
    dhamma: 'နေ့စဉ်ဓမ္မ',
    signIn: 'အကောင့်ဝင်ရန်',
    dashboard: 'ကိုယ်ပိုင်မှတ်တမ်း',
  },
  footer: {
    tagline:
      'မြန်မာ့ဗုဒ္ဓသာသနာ အမွေအနှစ် စေတီပုထိုးတော်များကို လေ့လာဖူးမြော်ရန်နှင့် တရားဘာဝနာ ကျင့်ကြံပွားများရန် ငြိမ်းချမ်းသော ဒစ်ဂျစ်တယ်နေရာ ဖြစ်ပါသည်။',
    pagodas: 'စေတီပုထိုးများ',
    meditation: 'တရားထိုင်ခြင်း',
    prayerMala: 'ဝတ်ပြုခြင်းနှင့် ပုတီး',
    heritage: 'အမွေအနှစ်',
    dhamma: 'နေ့စဉ်ဓမ္မ',
    journal: 'ကိုယ်ပိုင်မှတ်တမ်း',
  },
  landing: {
    heroKicker: 'မြန်မာ့ဗုဒ္ဓသာသနာအမွေအနှစ် · မြေပုံလမ်းညွှန်နှင့် သတိပဋ္ဌာန်',
    heroTitle: 'မြန်မာ့ဗုဒ္ဓသာသနာ ငြိမ်းချမ်းရာဥယျာဉ်',
    heroSubtitle:
      'မြန်မာနိုင်ငံရှိ ထင်ရှားသော ရွှေတိဂုံ၊ မဟာမုနိနှင့် ကျိုက်ထီးရိုး စေတီပုထိုးတော်မြတ်များကို ကိုယ်တိုင်ရောက်ရှိသကဲ့သို့ Google Street View နှင့် မြေပုံလမ်းညွှန်စနစ်ဖြင့် ဖူးမြော်ကြည်ညိုနိုင်ပြီး တရားဘာဝနာ ရှုမှတ်ခြင်း၊ ဝတ်ပြုပုတီးစိပ်ခြင်းနှင့် ဓမ္မသုတများကို ငြိမ်းချမ်းစွာ လေ့လာကျင့်ကြံနိုင်ပါသည်။',
    enterSanctuary: 'စေတီပုထိုးများ ဖူးမြော်မည်',
    beginMeditation: 'တရားဘာဝနာ စတင်မည်',
    purposeKicker: 'ပလက်ဖောင်း၏ ရည်ရွယ်ချက်',
    purposeTitle: 'မြန်မာ့သက်ဝင်လှုပ်ရှားနေသော ဗုဒ္ဓသာသနာ့နယ်မြေများသို့ ငြိမ်းချမ်းသောတံတားတစ်စင်း',
    purposeP1:
      'မြန်မာ့ထေရဝါဒ ဗုဒ္ဓသာသနာအမွေအနှစ်ကို အလေးအမြတ်ထား၍ တည်ဆောက်ထားသော ဤနေရာသည် ခရီးသွားဧည့်သည်များ၊ ပြည်ပရောက် မြန်မာမိသားစုများနှင့် တရားဘာဝနာ လေ့လာလိုသူများအတွက် အဝေးမှပင် ကြည်ညိုဖူးမြော်နိုင်ရန် ရည်ရွယ်ပါသည်။',
    purposeP2:
      'ဘုရားကျောင်းကန်သို့ ကိုယ်တိုင်သွားရောက် ဝတ်ပြုခြင်းနှင့် သံဃာတော်များ၏ ဆုံးမသြဝါဒကို အစားထိုးရန်မဟုတ်ဘဲ ၃၆၀° Street View မြင်ကွင်းစစ်စစ်များ၊ တိတ်ဆိတ်ငြိမ်သက်မှုနှင့် စစ်မှန်သော သမိုင်းဓမ္မသုတများကို စုစည်းပေးထားခြင်း ဖြစ်ပါသည်။',
    pagodasKicker: 'အထွတ်အမြတ် နေရာသုံးဌာန',
    pagodasTitle: 'စေတီပုထိုးပရိဝုဏ်တော်များသို့ ကိုယ်တိုင်လမ်းလျှောက် ဖူးမြော်ပါ',
    readPagodaHistories: 'စေတီသမိုင်းများ ဖတ်ရှုမည်',
    viewAllTours: 'စေတီပုထိုးအားလုံး ကြည့်ရှုမည်',
    walkMapStreetView: 'မြေပုံနှင့် ၃၆၀° မြင်ကွင်းဖြင့် ဖူးမြော်မည်',
    pointsOfInterest: 'ထင်ရှားသောနေရာများ',
    mindfulnessKicker: 'သတိပဋ္ဌာန်နှင့် ကုသိုလ်ပွားများမှု',
    mindfulnessTitle: 'တရားထိုင်ခြင်း၊ ဝတ်ပြုခြင်းနှင့် ပုတီးစိပ်ခြင်း နေရာများ',
    meditationTitle: 'တရားဘာဝနာခန်းမ',
    meditationDesc:
      '၅ မိနစ်မှ ၆၀ မိနစ်အထိ အချိန်မှတ်စက်၊ ဝင်လေထွက်လေ ရှုမှတ်လမ်းညွှန်နှင့် ခေါင်းလောင်းသံ၊ လေပြည်သံ၊ ငှက်သံ၊ စမ်းရေစီးသံများဖြင့် တရားဘာဝနာ ရှုမှတ်ပါ။',
    openMeditation: 'တရားခန်းမသို့ ဝင်မည်',
    prayerTitle: 'ဘုရားဝတ်ပြု စင်တော်',
    prayerDesc:
      'ဆီမီးနှင့် အမွှေးတိုင် ပူဇော်၍ ပါဠိဂါထာတော်များကို မြန်မာ-အင်္ဂလိပ် အနက်အဓိပ္ပာယ်များနှင့်တကွ ရွတ်ဖတ်ပူဇော်နိုင်ပြီး တိတ်ဆိတ်ဝတ်ပြုမှုစနစ်ကိုလည်း ရွေးချယ်နိုင်ပါသည်။',
    visitPrayer: 'ဝတ်ပြုခန်းမသို့ ဝင်မည်',
    malaTitle: '၁၀၈ လုံး ဒစ်ဂျစ်တယ် စိပ်ပုတီး',
    malaDesc:
      'ဂုဏ်တော်ကိုးပါး၊ ဗုဒ္ဓေါ၊ အနိစ္စ စသည်ဖြင့် နှလုံးသွင်းပွားများရန် ၁၀၈ လုံး စိပ်ပုတီးစက်ဝိုင်း၊ အသံအချက်ပြမှုနှင့် ပုတီးအပတ်ရေ မှတ်တမ်းစနစ်တို့ ပါဝင်ပါသည်။',
    practiceMala: 'ပုတီးစိပ်ပွားများမည်',
    heritageKicker: 'မြန်မာ့ဗုဒ္ဓသာသနာ အမွေအနှစ်',
    heritageTitle: 'ပရိယတ္တိနှင့် ပဋိပတ္တိ သာသနာ့အစဉ်အလာ',
    heritageDesc:
      'ရာစုနှစ်ပေါင်းများစွာ မြန်မာနိုင်ငံရှိ ကျောင်းတိုက်ကြီးများသည် ပိဋကတ်သုံးပုံကို ထိန်းသိမ်းစောင့်ရှောက်၍ ဝိပဿနာတရားတော်များကို ကမ္ဘာအနှံ့ ဖြန့်ဝေခဲ့ကြသည်။ လယ်တီဆရာတော်၊ မဟာစည်ဆရာတော်နှင့် မင်းကွန်းတိပိဋကဆရာတော်တို့၏ အတ္ထုပ္ပတ္တိများကို လေ့လာပါ။',
    todaysDhamma: 'ယနေ့ဓမ္မ',
    exploreFigures: 'ဆရာတော်ကြီးသုံးပါးအကြောင်း လေ့လာမည်',
    readDhamma: 'နေ့စဉ်ဓမ္မ ဖတ်ရှုမည်',
  },
  pagodas: {
    kicker: 'စေတီပုထိုးများ လေ့လာဖူးမြော်ခြင်း',
    title: 'မြန်မာ့အထွတ်အမြတ် စေတီပုထိုးတော်တစ်ဆူ ရွေးချယ်ပါ',
    subtitle:
      'စေတီတော်ကြီးများ၏ ရင်ပြင်တော်ပေါ်တွင် ကိုယ်တိုင်ရောက်ရှိနေသကဲ့သို့ မြေပုံပေါ်ရှိ Pegman လူရုပ်လေးဖြင့် ၃၆၀° Google Street View လှည့်လည်ကြည့်ရှုပြီး သမိုင်းကြောင်းနှင့် ဓာတ်ပုံမှတ်တမ်းများကို လေ့လာပါ။',
    save: 'သိမ်းမည်',
    saved: 'သိမ်းပြီး',
    highlightsMeta: 'မြေပုံနှင့် ၃၆၀° Street View',
    visitInPerson: 'ကိုယ်တိုင်ရောက်သကဲ့သို့ ဖူးမြော်မည်',
    readHistoryPhotos: 'သမိုင်းကြောင်းနှင့် ဓာတ်ပုံများ ဖတ်ရှုမည်',
    archiveKicker: 'စေတီပုထိုးများ သမိုင်းမှတ်တမ်း',
    archiveTitle: 'သမိုင်းဦးအစ၊ မင်းအဆက်ဆက်ကုသိုလ်နှင့် ဗိသုကာလက်ရာများ',
    allPagodas: 'စေတီအားလုံး',
    mapAndStreetView: 'မြေပုံနှင့် ၃၆၀°',
    walk360: '၃၆၀° မြင်ကွင်း',
    historyAndPhotos: 'သမိုင်းနှင့် ဓာတ်ပုံများ',
    favorite: 'နှစ်သက်မှုမှတ်',
    favorited: 'မှတ်သားပြီး',
    sacredHighlights: 'ထင်ရှားသောနေရာများ -',
    showHighlights: 'ထင်ရှားသောနေရာများ ပြရန်',
    hideHighlights: 'ဝှက်ထားရန် (H)',
  },
  history: {
    kickerPrefix: 'သမိုင်းကြောင်းနှင့် ဓာတ်ပုံမှတ်တမ်း',
    walkInMap: 'မြေပုံနှင့် ၃၆၀° မြင်ကွင်းဖြင့် ဖူးမြော်မည်',
    archivalPhotos: 'စေတီတော် ဓာတ်ပုံမှတ်တမ်းများ',
    inspectHint: 'ပုံကြီးချဲ့ကြည့်ရှုရန် ဓာတ်ပုံကို နှိပ်ပါ',
    enlarge: 'ပုံကြီးချဲ့ရန်',
    originTitle: 'သမိုင်းဦးအစနှင့် ဓာတ်တော်မွေတော် အစဉ်အလာ',
    patronageTitle: 'မင်းအဆက်ဆက်တို့၏ ကုသိုလ်တော်နှင့် တိုးချဲ့မွမ်းမံမှု',
    architectureTitle: 'ဗိသုကာအချိုးအစားနှင့် အနုပညာလက်ရာ',
    timelineTitle: 'သမိုင်းဖြစ်စဉ် မှတ်တမ်း',
    photoCounter: (idx, total) => `ဓာတ်ပုံ ${idx} / ${total}`,
  },
  meditation: {
    kicker: 'သတိပဋ္ဌာန် ကျင့်စဉ် · အာနာပါနဿတိ',
    title: 'တရားဘာဝနာခန်းမ',
    chimeBell: 'ခေါင်းလောင်းတီးမည်',
    audioOn: 'အသံဖွင့်ထား',
    muted: 'အသံပိတ်ထား',
    completeTitle: 'တရားထိုင်ခြင်း ပြီးမြောက်ပါပြီ',
    completeDesc: (time, guided) =>
      `သာဓုပါ။ သင်သည် ${guided ? 'လမ်းညွှန်ရှုမှတ်မှု' : 'တိတ်ဆိတ်စွာရှုမှတ်မှု'} စနစ်ဖြင့် ${time} ကြာ တရားဘာဝနာ ပွားများခဲ့ပါသည်။`,
    completeNote:
      'သင်၏ ကိုယ်ပိုင်မှတ်တမ်းတွင် သိမ်းဆည်းပြီးပါပြီ။ စက်ပစ္စည်းအားလုံးတွင် မှတ်တမ်းတင်ထားရန် အကောင့်ဝင်နိုင်ပါသည်။',
    prepareAnother: 'နောက်တစ်ကြိမ် ထပ်မံပြင်ဆင်မည်',
    breathInhale: 'ညင်သာစွာ ရှူသွင်းပါ',
    breathHold: 'ခေတ္တ ထိန်းထားပါ',
    breathExhale: 'ဖြည်းညှင်းစွာ ရှူထုတ်ပါ',
    sessionPaused: 'ခေတ္တရပ်နားထားသည်',
    readyToBegin: 'စတင်ရန် အသင့်ဖြစ်ပါပြီ',
    idleQuote: '“ဝင်လေထွက်လေ ငြိမ်သက်မှန်ကန်လာသောအခါ စိတ်နှလုံးသည် ကြည်လင်သော တောင်ပေါ်ရေကန်ကဲ့သို့ အေးချမ်းတည်ငြိမ်လာပါသည်။”',
    guidedPrompts: [
      'ကိုယ်နေဟန်ထားကို သက်သာစွာ ထားပါ။ ပခုံးများကို လျှော့ချ၍ ခန္ဓာကိုယ်၏ တည်ရှိမှုကို သတိပြုပါ။',
      'နှာသီးဝ သို့မဟုတ် ဝမ်းဗိုက်၌ ဝင်လေထွက်လေ၏ သဘာဝလှုပ်ရှားမှုကို ညင်သာစွာ သတိကပ်ပါ။',
      'အသက်ရှူသွင်းစဉ် ရှူသွင်းနေကြောင်း သိပါ။ ရှူထုတ်စဉ် ကိုယ်စိတ်တင်းကျပ်မှုများကို လွှတ်ချပါ။',
      'စိတ်အတွေးများ ပျံ့လွင့်သွားပါက အပြစ်မတင်ဘဲ သတိပြုမိပြီး ဝင်လေထွက်လေသို့ ပြန်လည်စုစည်းပါ။',
      'တစ်စုံတစ်ရာ အတင်းအကျပ်မပြုဘဲ ပစ္စုပ္ပန်အခိုက်အတန့်တိုင်းကို ကြည်လင်စွာ သတိကပ်ရှုမှတ်နေပါ။',
    ],
    start: 'တရားစတင်ထိုင်မည်',
    pause: 'ခေတ္တရပ်မည်',
    resume: 'ဆက်လက်ရှုမှတ်မည်',
    endSession: 'ပြီးဆုံးမည်',
    practiceStyle: 'ရှုမှတ်မှု ပုံစံ',
    guidedCues: 'လမ်းညွှန်စာသားဖြင့်',
    silentSitting: 'တိတ်ဆိတ်စွာ ရှုမှတ်ခြင်း',
    durationLabel: 'ကြာချိန် (မိနစ်)',
    ambientLabel: 'နောက်ခံသဘာဝအသံ',
    ambientOptions: {
      bells: 'ကျောင်းခေါင်းလောင်းသံ',
      birds: 'နံနက်ခင်း ငှက်သံ',
      wind: 'တောင်ပေါ်လေပြည်သံ',
      water: 'စမ်းရေစီးသံ',
      none: 'လုံးဝတိတ်ဆိတ်မှု',
    },
  },
  prayer: {
    kicker: 'ကြည်ညိုပူဇော်မှုနှင့် ဆင်ခြင်ပွားများမှု',
    title: 'ဘုရားဝတ်ပြုခန်းမနှင့် ဒစ်ဂျစ်တယ် စိပ်ပုတီး',
    tabAltar: 'ဘုရားဝတ်ပြု စင်တော်',
    tabMala: '၁၀၈ လုံး ဒစ်ဂျစ်တယ် စိပ်ပုတီး',
    respectfulNote:
      'သာသနာတော်ကို ကြည်ညိုလေးစားသော စိတ်ဖြင့် ဖန်တီးထားသည့် လေ့လာဝတ်ပြုမှု အကူအညီတစ်ခုဖြစ်ပြီး ဘုရားကျောင်းကန်သို့ ကိုယ်တိုင်သွားရောက်ခြင်းကို အစားထိုးရန် မဟုတ်ပါ။',
    candleLit: 'ဆီမီးထွန်းပြီး',
    lightCandle: 'ဆီမီးထွန်းရန်',
    incenseOffered: 'အမွှေးတိုင်ပူဇော်ပြီး',
    offerIncense: 'အမွှေးတိုင်ပူဇော်ရန်',
    chantDrone: 'ရွတ်ဆိုသံ ဖွင့်ထား',
    chantAudio: 'နောက်ခံရွတ်ဆိုသံ',
    quietOn: 'တိတ်ဆိတ်စနစ် ဖွင့်ထား',
    quietMode: 'တိတ်ဆိတ်စနစ်',
    traditionalRecitation: 'မိရိုးဖလာ ဘုရားရှိခိုးဂါထာတော်များ',
    bell: 'ခေါင်းလောင်း',
    hideTranslations: 'အနက်အဓိပ္ပာယ် ဝှက်ရန်',
    showTranslations: 'အနက်အဓိပ္ပာယ် ပြရန်',
    saveActivity: 'ဝတ်ပြုမှုမှတ်တမ်း သီးသန့်သိမ်းဆည်းမည်',
    savedActivity: 'ဝတ်ပြုမှုမှတ်တမ်း သိမ်းဆည်းပြီးပါပြီ',
  },
  mala: {
    kicker: '၁၀၈ လုံး စိပ်ပုတီး · 108-Bead Mala',
    title: 'ဒစ်ဂျစ်တယ် ဗုဒ္ဓဘာသာ စိပ်ပုတီး',
    soundOn: 'အသံဖွင့်ထား',
    muted: 'အသံပိတ်ထား',
    resetRound: 'အစမှပြန်စမည်',
    of108Beads: '၁၀၈ လုံးအနက်',
    tapRing: 'ပုတီးစေ့ချရန် နှိပ်ပါ',
    completedRounds: 'ပြီးမြောက်သော အပတ်ရေ',
    lifetimeBeads: 'စုစုပေါင်း ပုတီးလုံးရေ',
    description:
      'ဗုဒ္ဓေါ၊ အနိစ္စ သို့မဟုတ် ဂုဏ်တော်ကိုးပါး စသည်တို့ကို နှလုံးသွင်းပွားများလေ့ရှိပါသည်။ ၁၀၈ လုံး ပြည့်မြောက်တိုင်း ခေါင်းလောင်းသံတိုးတိုးလေး မြည်ကာ ပုတီးတစ်ပတ် တိုးမြှင့်ပေးပါသည်။',
    countNextBead: 'နောက်ပုတီးတစ်လုံး ချမည်',
  },
  heritage: {
    kicker: 'မြန်မာ့ဗုဒ္ဓသာသနာ အမွေအနှစ်',
    titleFigures: 'မြန်မာနိုင်ငံ၏ ထင်ရှားသော ဆရာတော်ကြီးသုံးပါး',
    titlePagodas: 'မြန်မာ့အထွတ်အမြတ် စေတီပုထိုးတော်များ၏ သမိုင်းနှင့် မှတ်တမ်း',
    descFigures:
      'ခေတ်သစ်မြန်မာ့ဗုဒ္ဓသာသနာတွင် ပရိယတ္တိနှင့် ပဋိပတ္တိသာသနာတော်ကို ထွန်းလင်းစေခဲ့သော ထေရဝါဒ ဆရာတော်ကြီးသုံးပါး၏ ထေရုပ္ပတ္တိနှင့် အဆုံးအမများကို လေ့လာပါ။',
    descPagodas:
      'ရွှေတိဂုံ၊ မဟာမုနိနှင့် ကျိုက်ထီးရိုး စေတီပုထိုးတော်များ၏ ဓာတ်တော်သမိုင်း၊ မင်းအဆက်ဆက်ကုသိုလ်နှင့် ဗိသုကာဓာတ်ပုံမှတ်တမ်းများကို လေ့လာပါ။',
    tabFigures: 'ဆရာတော်ကြီးများ',
    tabPagodas: 'စေတီပုထိုးသမိုင်း',
    bioTitle: 'ထေရုပ္ပတ္တိနှင့် သမိုင်းနောက်ခံ',
    teachingsTitle: 'အဓိက အဆုံးအမတော်များ',
    contributionsTitle: 'သာသနာပြု လုပ်ငန်းစဉ်များ',
    quotesTitle: 'ရွေးချယ်ထားသော ဓမ္မသြဝါဒများ',
    sourceLabel: 'ကိုးကားချက်',
  },
  dhamma: {
    kicker: 'ပိဋကတ်တော်လာ ဓမ္မပညာ',
    title: 'နေ့စဉ်ဓမ္မ',
    featuredPrefix: 'ယနေ့ အထူးဓမ္မလက်ဆောင်',
    saved: 'သိမ်းပြီး',
    saveTeaching: 'သိမ်းဆည်းမည်',
    save: 'သိမ်းမည်',
    meaningContext: 'အနက်အဓိပ္ပာယ်နှင့် နောက်ခံ',
    dailyReflection: 'နေ့စဉ် ဆင်ခြင်ပွားများရန်',
    archiveTitle: 'ယခင် ဓမ္မသုတမှတ်တမ်းများ',
    allTeachings: 'အားလုံး',
    savedFilter: 'သိမ်းဆည်းထားသော',
    emptySaved:
      'သိမ်းဆည်းထားသော ဓမ္မသုတ မရှိသေးပါ။ နှစ်သက်ရာ တရားတော်တွင် "သိမ်းဆည်းမည်" ကို နှိပ်၍ မှတ်သားနိုင်ပါသည်။',
  },
  auth: {
    memberAccess: 'အဖွဲ့ဝင် အကောင့်ဝင်ရောက်ခြင်း',
    signInTitle: 'ကိုယ်ပိုင်အကောင့်သို့ ဝင်ရောက်ပါ',
    registerTitle: 'အဖွဲ့ဝင်အကောင့်အသစ် ဖွင့်လှစ်ပါ',
    resetTitle: 'စကားဝှက် ပြန်လည်သတ်မှတ်ပါ',
    subtitle:
      'ဧည့်သည်အနေဖြင့် စေတီပုထိုးများကို လွတ်လပ်စွာ ဖူးမြော်နိုင်ပြီး အကောင့်ဝင်ရောက်ပါက တရားထိုင်ခြင်း၊ ဝတ်ပြုမှုနှင့် ပုတီးမှတ်တမ်းများကို သီးသန့်သိမ်းဆည်းနိုင်ပါသည်။',
    continueGoogle: 'Google ဖြင့် ဆက်လက်ဝင်ရောက်မည်',
    orWithEmail: 'သို့မဟုတ် အီးမေးလ်ဖြင့်',
    tabSignIn: 'ဝင်ရောက်မည်',
    tabRegister: 'အကောင့်သစ်ဖွင့်မည်',
    tabReset: 'စကားဝှက်ပြန်ယူမည်',
    displayName: 'အမည်',
    emailLabel: 'အီးမေးလ်လိပ်စာ',
    passwordLabel: 'စကားဝှက်',
    createAccount: 'အကောင့်ဖွင့်လှစ်မည်',
    sendReset: 'စကားဝှက်ပြန်လည်သတ်မှတ်ရန် ပို့မည်',
    signInEmail: 'အီးမေးလ်ဖြင့် ဝင်ရောက်မည်',
    signedInAs: 'ဝင်ရောက်ထားသော အကောင့် -',
    syncedNote:
      'သင်၏ တရားထိုင်မှတ်တမ်း၊ ဝတ်ပြုမှုများ၊ စိပ်ပုတီးနှင့် သိမ်းဆည်းထားသော ဓမ္မသုတများကို ချိတ်ဆက်သိမ်းဆည်းပြီး ဖြစ်ပါသည်။',
    openDashboard: 'ကိုယ်ပိုင်မှတ်တမ်း ဖွင့်မည်',
    explorePagodas: 'စေတီပုထိုးများ ဖူးမြော်မည်',
  },
  dashboard: {
    loading: 'သင်၏ ကိုယ်ပိုင်မှတ်တမ်းကို ဖွင့်နေပါသည်...',
    protectedTitle: 'အဖွဲ့ဝင် ကိုယ်ပိုင်မှတ်တမ်း',
    protectedDesc:
      'တရားထိုင်ချိန် မိနစ်များ၊ ဝတ်ပြုမှတ်တမ်း၊ ၁၀၈ လုံး စိပ်ပုတီး အပတ်ရေနှင့် သိမ်းဆည်းထားသော စေတီပုထိုးများကို ကြည့်ရှုရန် အကောင့်ဝင်ပါ။',
    signInOrRegister: 'အကောင့်ဝင်ရန် သို့မဟုတ် အကောင့်သစ်ဖွင့်ရန်',
    journalKicker: 'ကိုယ်ပိုင် သာသနာ့မှတ်တမ်း',
    welcome: 'မင်္ဂလာပါ၊',
    adminConsole: 'စီမံခန့်ခွဲမှုခန်းမ',
    signOut: 'အကောင့်ထွက်မည်',
    totalMeditation: 'စုစုပေါင်း တရားထိုင်ချိန်',
    completedSessions: 'ပြီးမြောက်သော အကြိမ်ရေ',
    malaRounds: '၁၀၈ လုံး ပုတီးအပတ်ရေ',
    prayerReflections: 'ဝတ်ပြုမှု အကြိမ်ရေ',
    favAndRecent: 'နှစ်သက်သောနှင့် မကြာသေးမီက ဖူးမြော်ခဲ့သော စေတီများ',
    explorePagodas: 'စေတီပုထိုးများ ကြည့်ရှုမည်',
    favorites: 'နှစ်သက်ရာစေတီများ',
    noFavorites: 'နှစ်သက်ရာ စေတီပုထိုး မမှတ်သားရသေးပါ။',
    recentVisits: 'မကြာသေးမီက ဖူးမြော်မှု',
    noVisits: 'မကြာသေးမီက ဖူးမြော်မှု မှတ်တမ်းမရှိသေးပါ။',
    recentActivity: 'မကြာသေးမီက တရားထိုင်နှင့် ဝတ်ပြုမှု မှတ်တမ်း',
    noActivity: 'တရားထိုင်ခြင်း သို့မဟုတ် ဝတ်ပြုခြင်း ပြုလုပ်ပြီးပါက ဤနေရာတွင် တွေ့မြင်ရပါမည်။',
    savedDhammaTitle: 'သိမ်းဆည်းထားသော ဓမ္မသုတများ',
    browseAll: 'အားလုံးကြည့်မည်',
    noSavedDhamma: 'နေ့စဉ်ဓမ္မ စာမျက်နှာမှ နှစ်သက်ရာ တရားတော်များကို သိမ်းဆည်းနိုင်ပါသည်။',
    profileSettings: 'ကိုယ်ရေးအချက်အလက်နှင့် ဘာသာစကား ဆက်တင်',
    displayName: 'ပြသမည့်အမည်',
    preferredLang: 'အသုံးပြုလိုသော ဘာသာစကား',
    recordPractice: 'ကိုယ်ပိုင်ကျင့်ကြံမှု မှတ်တမ်းတင်မည်',
    recordPracticeDesc: 'တရားထိုင်ချိန်၊ ပုတီးအပတ်ရေနှင့် ဝတ်ပြုမှုများကို အကောင့်တွင် သိမ်းဆည်းပါ။',
    keepPrivate: 'ပရိုဖိုင်ကို သီးသန့်ထားမည်',
    keepPrivateDesc: 'သင်၏ ကျင့်ကြံမှုမှတ်တမ်းများကို သင်တစ်ဦးတည်းသာ မြင်တွေ့နိုင်ပါမည်။',
    saving: 'သိမ်းဆည်းနေသည်...',
    settingsSaved: 'ဆက်တင် သိမ်းဆည်းပြီးပါပြီ',
    saveSettings: 'ဆက်တင် သိမ်းဆည်းမည်',
  },
};

export function useTranslations(): UiDictionary {
  return EN_DICT;
}

export function getTranslations(language: LanguageCode): UiDictionary {
  return language === 'my' ? MY_DICT : EN_DICT;
}
