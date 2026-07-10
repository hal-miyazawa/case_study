import { useEffect, useMemo, useRef, useState } from 'react'
import badEndBackground from './assets/backgrounds/BadEnd.png'
import afterDisasterBackground from './assets/backgrounds/災害後画面.png'
import backpackBackground from './assets/backgrounds/リュック画面.png'
import backpackEscapeBackground from './assets/backgrounds/リュック画面脱出.png'
import bookWarningBackground from './assets/backgrounds/予告本画面.png'
import fixedAfterDisasterBackground from './assets/backgrounds/固定器具使用災害後画面.png'
import fixedNormalRoomBackground from './assets/backgrounds/固定器具使用通常部屋画面.png'
import panicRoadBackground from './assets/backgrounds/焦り道.png'
import panicRoadBackground1 from './assets/backgrounds/焦り道1.png'
import panicRoadBackground2 from './assets/backgrounds/焦り道2.png'
import panicRoadBackground3 from './assets/backgrounds/焦り道3.png'
import normalRoomBackground from './assets/backgrounds/通常部屋画面.png'
import nightRoomBackground from './assets/backgrounds/通常部屋画面夜.png'
import phoneScreenBackground from './assets/backgrounds/スマホ画面.png'
import phoneWhiteBackground from './assets/backgrounds/スマホ画面_白背景.png'
import phoneBatteryChargingBackground from './assets/backgrounds/phone/バッテリー切れ充電画面.png'
import phoneBatteryDeadBackground from './assets/backgrounds/phone/バッテリー切れ画面.png'
import phoneFinalDayWhiteBackground from './assets/backgrounds/phone/スマホ最終日白画面.png'
import phoneLowBatteryBackground from './assets/backgrounds/phone/スマホ画面少な目.png'
import phoneLowBatteryWhiteBackground from './assets/backgrounds/phone/スマホ画面少な目白画面.png'
import phoneMobileChargingBackground from './assets/backgrounds/phone/スマホモバ充使用中.png'
import phoneMobileChargingWhiteBackground from './assets/backgrounds/phone/スマホモバ充使用中白画面.png'
import shelterArrivalBackground from './assets/backgrounds/学校到着画面.png'
import shelterArrivalNightBackground from './assets/backgrounds/学校到着画面_夜.png'
import startBackground from './assets/backgrounds/開始画面.png'
import bookNewsImage from './assets/backgrounds/news/book.png'
import bookNewsThumbnail from './assets/backgrounds/news/book_i.png'
import cafeNewsImage from './assets/backgrounds/news/cafe.png'
import cafeNewsThumbnail from './assets/backgrounds/news/cafe_i.png'
import saleNewsImage from './assets/backgrounds/news/sale.png'
import saleNewsThumbnail from './assets/backgrounds/news/sale_i.png'
import weatherNewsImage from './assets/backgrounds/news/weather.png'
import weatherNewsThumbnail from './assets/backgrounds/news/weather_i.png'
import shelterSchoolImage from './assets/backgrounds/shelter/school.png'
import trueEndBackground from './assets/backgrounds/TrueEnd.png'
import futureBookCutBackground from './assets/backgrounds/ワイが見た未来.png'
import badEndBgm from './assets/bgm/BADエンド.mp3'
import trueEndBgm from './assets/bgm/TRUEエンド.mp3'
import itemUseSound from './assets/bgm/アイテム使用音.mp3'
import shopBgm from './assets/bgm/ショップ.mp3'
import shopPurchaseSound from './assets/bgm/ショップ購入音.mp3'
import textBoxClickSound from './assets/bgm/テキストボックスクリック音.mp3'
import modalSound from './assets/bgm/モーダル音.mp3'
import preparationBgm from './assets/bgm/対策フェーズ.mp3'
import beforeQuakeBgm from './assets/bgm/地震_起こる前.mp3'
import quakeBgm from './assets/bgm/地震発生.mp3'
import groundRumbleSound from './assets/bgm/地響き.mp3'
import escapeBgm from './assets/bgm/脱出パートBGM.mp3'
import escapeBgm2 from './assets/bgm/脱出パートBGM2.mp3'
import normalRoomBgm from './assets/bgm/部屋_通常.mp3'
import nightRoomBgm from './assets/bgm/部屋_夜.mp3'
import measureIcon from './assets/icons/対策icon.png'
import backpackIcon from './assets/icons/リュックicon.png'
import phoneIcon from './assets/icons/スマホicon.png'
import shopIcon from './assets/icons/ショップicon.png'
import './App.css'
import { EscapeControls } from './features/escape/EscapeControls'
import { initialEscapeDialogue } from './features/escape/escapeSteps'
import { useEscapeFlow } from './features/escape/useEscapeFlow'
import ShopScreen, { type ItemId } from './screens/ShopScreen'

type Screen =
  | 'start'
  | 'book-warning'
  | 'future-book-cut'
  | 'room-intro'
  | 'preparation'
  | 'backpack'
  | 'room-change-preview'
  | 'shop'
  | 'night'
  | 'day-start'
  | 'quake-arrival'
  | 'post-disaster'
  | 'escape'
  | 'shelter-arrival'
  | 'bad-end'
  | 'true-end'
  | 'result-review'
  | 'real-life-message'
  | 'ending-actions'

type StoryDay = 0 | 1 | 2

type Dialogue = {
  speaker: string
  text: string
}

type PreparationGuideTarget =
  | 'message'
  | 'shop'
  | 'backpack'
  | 'phone'
  | 'finish'
  | 'furniture'
type PreparationGuideKind = 'initial' | 'final'

type PreparationGuideStep = {
  target: PreparationGuideTarget
  dialogue: Dialogue
}

type PhoneAppView = 'home' | 'contact' | 'news' | 'shelter'
type ContactId = 'mother' | 'friend' | 'relative'
type NewsArticleId = 'preparedness' | 'station-drill' | 'prediction-day' | 'weather'

type ContactMessage = {
  from: 'me' | 'them'
  text: string
}

type ContactThread = {
  id: ContactId
  name: string
  relation: string
  preview: string
  time: string
  messages: ContactMessage[]
  quickReplies: {
    text: string
    response: string
  }[]
}

type NewsArticle = {
  id: NewsArticleId
  source: string
  title: string
  summary: string
  body: string[]
  image?: string
  imageAlt?: string
  thumbnail: string
}

type EscapeRouteChoiceStage = 'warning' | 'prompt' | 'choices' | null
type EscapePhonePowerState = 'normal' | 'dead' | 'charging' | 'charged'
type EscapePhonePromptStage = 'dead' | 'backpack' | 'charging-wait' | 'panic' | null
type EscapeOutcome = 'true' | 'bad'

// 商品ごとの購入数とリュック収納数を管理する型。
// 0なら未購入/未収納、1以上なら購入済み/収納済みとして扱う。
type ItemFlags = {
  purchased: number
  packed: number
}

// リュック画面で表示するアイテム1件分の型。
// idはShopScreen.tsxの商品IDと必ず一致させる。
type BackpackItem = {
  id: ItemId
  name: string
  description: string
}

// アイテム以外のシナリオ進行に関わるflag。
// 画面を閉じてもApp側で状態を保持する。
type StoryFlags = {
  contactedFamily: boolean
  checkedNews: boolean
  checkedShelter: boolean
}

const roomMeasureActions = [
  '本棚の上のものをおろす',
  'テレビを倒す',
  '薬をおろす',
  '本をおろす',
]

const contactThreads: ContactThread[] = [
  {
    id: 'mother',
    name: '母',
    relation: '家族',
    preview: '備えだけ確認しておいてね。',
    time: '10:12',
    messages: [
      { from: 'them', text: '最近変なニュースも見るし、少し心配だね。' },
      { from: 'me', text: 'うん。水と食べ物は買っておくよ。' },
      { from: 'them', text: '家具も倒れないようにしておいてね。' },
      { from: 'me', text: 'わかった。部屋も確認しておく。' },
    ],
    quickReplies: [
      {
        text: '備蓄はもう少し確認しておく',
        response: 'ありがとう。水と食べ物があるだけでも安心だね。',
      },
      {
        text: '家具の固定もしておく',
        response: 'それが一番大事かも。無理せず早めにやってね。',
      },
    ],
  },
  {
    id: 'friend',
    name: '友達',
    relation: '友人',
    preview: '今日いつも通り？',
    time: '09:48',
    messages: [
      { from: 'them', text: '今日いつも通り？' },
      { from: 'me', text: 'うん、でも少し防災用品見ておこうかな。' },
      { from: 'them', text: 'えらい。自分も帰りに水買っておく。' },
    ],
    quickReplies: [
      {
        text: '帰りに店を見てくる',
        response: 'いいね。売り切れる前に買っておいた方がよさそう。',
      },
      {
        text: '避難場所も確認しておく',
        response: 'それ大事。自分も帰ったら地図見ておく。',
      },
    ],
  },
  {
    id: 'relative',
    name: '親戚',
    relation: '親戚',
    preview: '何かあったら連絡して。',
    time: '昨日',
    messages: [
      { from: 'them', text: 'そっちは最近どう？' },
      { from: 'me', text: '普通だよ。少し防災の確認はしてる。' },
      { from: 'them', text: '何かあったら連絡して。無理に動かないでね。' },
      { from: 'me', text: 'ありがとう。避難場所も確認しておく。' },
    ],
    quickReplies: [
      {
        text: '家の中を片付けておく',
        response: '足元に物がないだけでも安心だね。気をつけて。',
      },
      {
        text: '家族にも共有しておく',
        response: 'うん、連絡先だけでも決めておくと安心だよ。',
      },
    ],
  },
]

const newsArticles: NewsArticle[] = [
  {
    id: 'preparedness',
    source: '街の話題',
    title: '駅前に新しいカフェがオープン',
    summary: '地元食材を使ったメニューに注目。',
    image: cafeNewsImage,
    imageAlt: '駅前にオープンしたカフェ',
    thumbnail: cafeNewsThumbnail,
    body: [
      '駅前通りに新しいカフェがオープンし、朝から多くの人が訪れています。',
      '店では地元の野菜や果物を使った軽食を用意しており、仕事帰りに立ち寄れる場所として期待されています。',
    ],
  },
  {
    id: 'station-drill',
    source: '生活ニュース',
    title: '商店街で週末セールを開催',
    summary: '食品や日用品を中心に特価販売。',
    image: saleNewsImage,
    imageAlt: '商店街の週末セール',
    thumbnail: saleNewsThumbnail,
    body: [
      '駅近くの商店街では、週末に合わせて食品や日用品のセールが行われます。',
      '買い物客を呼び込むため、各店舗では限定商品やポイント還元も用意されています。',
    ],
  },
  {
    id: 'prediction-day',
    source: '話題',
    title: '「予言の日」がSNSで再注目',
    summary: '古い本の一節をめぐり、静かな話題に。',
    image: bookNewsImage,
    imageAlt: '予言の日について書かれた古い本',
    thumbnail: bookNewsThumbnail,
    body: [
      '古い本に書かれた一節が、SNSで再び注目されています。',
      '公的機関から災害発生の発表はありませんが、防災を見直すきっかけにする声もあります。',
    ],
  },
  {
    id: 'weather',
    source: '気象',
    title: '週末は晴れ、気温差に注意',
    summary: '大きな地震の公式発表はありません。',
    image: weatherNewsImage,
    imageAlt: '週末の晴れた空',
    thumbnail: weatherNewsThumbnail,
    body: [
      '週末は広い範囲で晴れる見込みです。',
      '朝晩と日中の気温差が大きくなるため、体調管理に注意してください。',
    ],
  },
]

const bookWarningDialogues: Dialogue[] = [
  {
    speaker: '主人公',
    text: '……なんだ、この本。',
  },
  {
    speaker: '主人公',
    text: '『ワイが見た未来』……？',
  },
  {
    speaker: '主人公',
    text: '二日後、この街で大きな地震が起こる……',
  },
  {
    speaker: '主人公',
    text: '……って書いてある。',
  },
  {
    speaker: '主人公',
    text: 'ただの作り話だよな。でも、なぜか嫌な感じがする。',
  },
  {
    speaker: '主人公',
    text: '今のうちに、できることをしておこう。',
  },
]

const roomIntroDialogues: Dialogue[] = [
  {
    speaker: '主人公',
    text: 'いつもの部屋なのに、落ち着かない。',
  },
  {
    speaker: '主人公',
    text: 'さっきの本のことが頭から離れない。',
  },
  {
    speaker: '主人公',
    text: '本当に地震が来るなら、備えないと。',
  },
]

const getDayLabel = (day: StoryDay) =>
  day === 0 ? '災害当日' : `災害まであと${day}日`

const getPreparationDialogue = (day: StoryDay): Dialogue => {
  if (day === 0) {
    return {
      speaker: 'ナレーション',
      text: '最後にできる対策を選ぼう。',
    }
  }

  return {
    speaker: 'ナレーション',
    text: `災害まであと${day}日。対策を選ぼう。`,
  }
}

const nightDialoguesByDay: Record<1 | 2, Dialogue[]> = {
  2: [
    {
      speaker: '主人公',
      text: '災害まであと二日。今日はもう寝よう。',
    },
    {
      speaker: 'ナレーション',
      text: '不安を残したまま、部屋の明かりを消した。',
    },
  ],
  1: [
    {
      speaker: '主人公',
      text: '災害まであと一日。できることはまだあるはずだ。',
    },
    {
      speaker: 'ナレーション',
      text: '明日の自分に言い聞かせ、眠りについた。',
    },
  ],
}

const dayStartDialoguesByDay: Record<0 | 1, Dialogue[]> = {
  1: [
    {
      speaker: 'ナレーション',
      text: '朝になった。災害まであと一日。',
    },
    {
      speaker: '主人公',
      text: '昨日より現実味が増してきた。',
    },
    {
      speaker: '主人公',
      text: '今日も対策を進めよう。',
    },
  ],
  0: [
    {
      speaker: 'ナレーション',
      text: '予告されていた当日になった。',
    },
    {
      speaker: '主人公',
      text: '落ち着かない。でも、最後にできることをやるしかない。',
    },
  ],
}

const quakeArrivalDialogue: Dialogue = {
  speaker: '主人公',
  text: '……ついに、この時がやってきた。',
}

const createRoomChangePreviewDialogue = (
  hasFurnitureFasteners: boolean,
  hasWindowFilm: boolean,
): Dialogue => {
  if (hasFurnitureFasteners && hasWindowFilm) {
    return {
      speaker: 'ナレーション',
      text: '家具と窓の対策ができた。部屋が少し安全になった。',
    }
  }

  if (hasFurnitureFasteners) {
    return {
      speaker: 'ナレーション',
      text: '家具を固定した。部屋の安全性が上がった。',
    }
  }

  return {
    speaker: 'ナレーション',
    text: '窓にフィルムを貼った。ガラスが飛び散りにくくなった。。',
  }
}

const postDisasterDialogues: Dialogue[] = [
  {
    speaker: 'ナレーション',
    text: '大きな揺れが部屋を襲った。',
  },
  {
    speaker: 'ナレーション',
    text: '本棚が倒れ、床には物とガラス片が散らばった。',
  },
  {
    speaker: '主人公',
    text: '何も準備していない。',
  },
  {
    speaker: '主人公',
    text: '足元も見えず、出口まで安全に進めそうにない。',
  },
  {
    speaker: 'ナレーション',
    text: '備えがないまま地震を迎えてしまった。',
  },
  {
    speaker: 'ナレーション',
    text: '部屋から動き出すことすら難しい。',
  },
]

const truePostDisasterDialogues: Dialogue[] = [
  {
    speaker: 'ナレーション',
    text: '大きな揺れが部屋を襲った。',
  },
  {
    speaker: 'ナレーション',
    text: '固定した家具は倒れず、通路はふさがれなかった。',
  },
  {
    speaker: '主人公',
    text: 'よかった……動ける。',
  },
  {
    speaker: 'ナレーション',
    text: '事前の備えが、身を守る力になった。',
  },
]

const badEndDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'Bad End。足りなかった備えを思い出そう。',
}

const trueEndDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'True End。家具固定の備えが命を守った。',
}

const escapeDialogue: Dialogue = initialEscapeDialogue

const shelterArrivalDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: '避難所にたどり着いた。',
}

const resultReviewDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: '今回の結果を確認しました。次は、この物語を現実の備えに置き換えて考えてみましょう。',
}

const realLifeDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'この物語では、主人公は二日後の地震を知っていました。でも現実では、いつ起こるかは分かりません。',
}

const backpackItems: BackpackItem[] = [
  {
    id: 'water',
    name: '飲料水',
    description: '地震後に水分を確保するための大切な備え。',
  },
  {
    id: 'emergency-food',
    name: '非常食セット',
    description: '避難後や停電時でも食べられる食料。',
  },
  {
    id: 'flashlight',
    name: '懐中電灯',
    description: '停電した部屋や夜の避難で足元を照らせる。',
  },
  {
    id: 'power-bank',
    name: 'モバイルバッテリー',
    description: 'スマホの充電を保ち、連絡や情報確認を続けられる。',
  },
  {
    id: 'first-aid-kit',
    name: '救急セット',
    description: '軽いけがをしたときに応急処置ができる。',
  },
  {
    id: 'furniture-fasteners',
    name: '家具固定器具',
    description: '棚や家具を固定して、揺れで倒れる危険を減らせる。',
  },
  {
    id: 'window-film',
    name: '窓ガラス飛散防止フィルム',
    description: '割れたガラスが飛び散るのを防ぎ、けがをしにくくする。',
  },
  {
    id: 'radio',
    name: '携帯ラジオ',
    description: '停電や通信障害のときでも避難情報を確認できる。',
  },
  {
    id: 'gloves-slippers',
    name: '軍手・厚底スリッパ',
    description: '割れたガラスや散乱物の上を歩くときに足元を守れる。',
  },
  {
    id: 'canned-food',
    name: '缶詰',
    description: '火や水が使えない状況でも食べられる保存食。',
  },
  {
    id: 'nutrition-supplements',
    name: '栄養補助食品',
    description: '短時間で食べられて、避難中の体力を保ちやすい。',
  },
  {
    id: 'retort-rice',
    name: 'レトルトご飯・保存食',
    description: '自宅に残る場合や避難生活で役立つ備蓄食。',
  },
  {
    id: 'portable-toilet',
    name: '生米',
    description: '白米はおいしい！元気が出る！',
  },
  {
    id: 'medication',
    name: '頭痛薬',
    description: '体調不良や持病がある場合に欠かせない備え。',
  },
  {
    id: 'disinfectant',
    name: '消毒液・ウェットシート',
    description: '手や傷口を清潔にして、衛生状態を保ちやすくする。',
  },
  {
    id: 'mask',
    name: 'マスク',
    description: '粉じんや避難所での衛生対策に使える。',
  },
  {
    id: 'thermometer',
    name: '体温計',
    description: '避難中や避難所で体調を確認するときに役立つ。',
  },
  {
    id: 'cooling-blanket',
    name: '冷却シート・保温シート',
    description: '暑さや寒さから体を守り、避難生活の負担を減らせる。',
  },
]

const escapeProgressPercentByStep = {
  start: 0,
  'route-check': 25,
  'near-shelter': 50,
  'safe-road': 75,
} as const

// 全アイテムのflag初期値を作る関数。
// 購入数と収納数をnumberで持つため、後から複数購入にも対応できる。
const createInitialItemFlags = (): Record<ItemId, ItemFlags> => ({
  'furniture-fasteners': { purchased: 0, packed: 0 },
  'window-film': { purchased: 0, packed: 0 },
  flashlight: { purchased: 0, packed: 0 },
  radio: { purchased: 0, packed: 0 },
  'power-bank': { purchased: 0, packed: 0 },
  'gloves-slippers': { purchased: 0, packed: 0 },
  water: { purchased: 0, packed: 0 },
  'emergency-food': { purchased: 0, packed: 0 },
  'canned-food': { purchased: 0, packed: 0 },
  'nutrition-supplements': { purchased: 0, packed: 0 },
  'retort-rice': { purchased: 0, packed: 0 },
  'portable-toilet': { purchased: 0, packed: 0 },
  'first-aid-kit': { purchased: 0, packed: 0 },
  medication: { purchased: 0, packed: 0 },
  disinfectant: { purchased: 0, packed: 0 },
  mask: { purchased: 0, packed: 0 },
  thermometer: { purchased: 0, packed: 0 },
  'cooling-blanket': { purchased: 0, packed: 0 },
})

// ショップ画面に渡す購入数だけのデータを作る関数。
const createPurchasedItemCounts = (
  itemFlags: Record<ItemId, ItemFlags>,
): Record<ItemId, number> => {
  return Object.fromEntries(
    Object.entries(itemFlags).map(([itemId, flags]) => [
      itemId,
      flags.purchased,
    ]),
  ) as Record<ItemId, number>
}

// スマホなど、アイテム以外の行動flagの初期値。
const createInitialStoryFlags = (): StoryFlags => ({
  contactedFamily: false,
  checkedNews: false,
  checkedShelter: false,
})

// 部屋対策の実行済みflagの初期値。
const createInitialRoomMeasureFlags = (): Record<string, boolean> =>
  Object.fromEntries(roomMeasureActions.map((action) => [action, false]))

const createInitialContactReplyLog = (): Record<ContactId, ContactMessage[]> => ({
  mother: [],
  friend: [],
  relative: [],
})

const preparationGuideSteps: PreparationGuideStep[] = [
  {
    target: 'message',
    dialogue: {
      speaker: 'ガイド',
      text: '対策フェーズでは、災害に備えるための行動を選んでいきます。',
    },
  },
  {
    target: 'shop',
    dialogue: {
      speaker: 'ガイド',
      text: 'ショップでは、防災に役立つアイテムを購入できます。',
    },
  },
  {
    target: 'backpack',
    dialogue: {
      speaker: 'ガイド',
      text: 'リュックでは、ショップで購入したアイテムを使用できます。',
    },
  },
  {
    target: 'phone',
    dialogue: {
      speaker: 'ガイド',
      text: 'スマホでは、家族への連絡、ニュース確認、避難場所の確認ができます。',
    },
  },
  {
    target: 'finish',
    dialogue: {
      speaker: 'ガイド',
      text: '対策を終えたい場合は、右上の「対策を終える」を押します。',
    },
  },
  {
    target: 'message',
    dialogue: {
      speaker: 'ガイド',
      text: '説明は以上です。行動を開始してください。',
    },
  },
]

const finalPreparationGuideSteps: PreparationGuideStep[] = [
  {
    target: 'furniture',
    dialogue: {
      speaker: 'ガイド',
      text: '今日、地震が起こるかもしれません。最後に部屋の対策をしておきましょう。',
    },
  },
]

const escapeRouteWarningDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: '最短は右の道だけど、危なそうだな。',
}

const escapeRoutePromptDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'どっちに進もうか。',
}

const escapePhoneDeadDialogue: Dialogue = {
  speaker: '主人公',
  text: '電源が切れてしまっている。どうしよう。',
}

const escapeBackpackPromptDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'リュックに使えるアイテムがあるかもしれない。',
}

const escapePhoneChargingWaitDialogue: Dialogue = {
  speaker: '主人公',
  text: 'スマホを充電中だ。少し待とう。',
}

const escapePhonePanicDialogue: Dialogue = {
  speaker: '主人公',
  text: 'どうしよう、どうしよう。スマホが使えない。',
}

const escapePhonePanicDialogues: Dialogue[] = [
  escapePhonePanicDialogue,
  {
    speaker: '主人公',
    text: '早く避難しないと、早く避難しないと。',
  },
  {
    speaker: '主人公',
    text: '急がなきゃ、急がなきゃ。',
  },
  {
    speaker: '主人公',
    text: '焦って時間を使ってしまった。冷静にならないと。',
  },
  {
    speaker: '主人公',
    text: 'まずは息を整えよう。周りを確認すれば、まだ進めるはずだ。',
  },
]

const escapePanicWanderingDialogues: Dialogue[] = [
  {
    speaker: '主人公',
    text: '道が分からない。どっちへ進めばいいんだ。',
  },
  {
    speaker: '主人公',
    text: '早く、早く。足だけが勝手に前へ出る。',
  },
  {
    speaker: '主人公',
    text: 'ここも通れない。別の道を探さないと。',
  },
  {
    speaker: '主人公',
    text: 'どれだけ歩いたんだ。避難所はどこだ。',
  },
]

const escapePanicRoadBackgrounds = [
  panicRoadBackground,
  panicRoadBackground1,
  panicRoadBackground2,
  panicRoadBackground3,
]


function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [currentDay, setCurrentDay] = useState<StoryDay>(2)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [roomIntroIndex, setRoomIntroIndex] = useState(0)
  const [nightDialogueIndex, setNightDialogueIndex] = useState(0)
  const [dayStartDialogueIndex, setDayStartDialogueIndex] = useState(0)
  const [postDisasterDialogueIndex, setPostDisasterDialogueIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionText, setTransitionText] = useState<string | null>(null)
  const [hoveredAction, setHoveredAction] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<BackpackItem | null>(null)
  const [selectedItem, setSelectedItem] = useState<BackpackItem | null>(null)
  const [isUiHidden, setIsUiHidden] = useState(false)
  const [isLogOpen, setIsLogOpen] = useState(false)
  const [isPhoneOpen, setIsPhoneOpen] = useState(false)
  const [phoneAppView, setPhoneAppView] = useState<PhoneAppView>('home')
  const [selectedContactId, setSelectedContactId] = useState<ContactId | null>(null)
  const [isContactReplyMenuOpen, setIsContactReplyMenuOpen] = useState(false)
  const [pendingContactResponseId, setPendingContactResponseId] =
    useState<ContactId | null>(null)
  const [contactReplyLog, setContactReplyLog] =
    useState<Record<ContactId, ContactMessage[]>>(createInitialContactReplyLog)
  const [selectedNewsArticleId, setSelectedNewsArticleId] =
    useState<NewsArticleId | null>(null)
  const [isShelterDetailOpen, setIsShelterDetailOpen] = useState(false)
  const [backpackReturnScreen, setBackpackReturnScreen] =
    useState<'preparation' | 'escape'>('preparation')
  const [isMeasuresOpen, setIsMeasuresOpen] = useState(false)
  const [selectedMeasure, setSelectedMeasure] = useState<string | null>(null)
  const [isQuitMessageVisible, setIsQuitMessageVisible] = useState(false)
  const [isItemUseFlashActive, setIsItemUseFlashActive] = useState(false)
  const [isScreenShaking, setIsScreenShaking] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [hasCheckedEscapeShelter, setHasCheckedEscapeShelter] = useState(false)
  const [escapeOutcome, setEscapeOutcome] = useState<EscapeOutcome>('true')
  const [isEscapeLightOn, setIsEscapeLightOn] = useState(false)
  const [escapeWaterLevel, setEscapeWaterLevel] = useState(1)
  const [escapeFoodLevel, setEscapeFoodLevel] = useState(1)
  const [escapeProgressOverride, setEscapeProgressOverride] = useState<number | null>(null)
  const [escapeRouteChoiceStage, setEscapeRouteChoiceStage] =
    useState<EscapeRouteChoiceStage>(null)
  const [escapePhonePowerState, setEscapePhonePowerState] =
    useState<EscapePhonePowerState>('normal')
  const [escapePhonePromptStage, setEscapePhonePromptStage] =
    useState<EscapePhonePromptStage>(null)
  const [escapePanicDialogueIndex, setEscapePanicDialogueIndex] = useState(0)
  const [escapePanicRoadIndex, setEscapePanicRoadIndex] = useState<number | null>(null)
  const [isEscapePanicFading, setIsEscapePanicFading] = useState(false)
  const [hoveredEscapeRouteChoice, setHoveredEscapeRouteChoice] = useState<
    'right' | 'left' | null
  >(null)
  const [isPreparationGuideActive, setIsPreparationGuideActive] = useState(false)
  const [hasSeenPreparationGuide, setHasSeenPreparationGuide] = useState(false)
  const [hasSeenFinalPreparationGuide, setHasSeenFinalPreparationGuide] =
    useState(false)
  const [preparationGuideKind, setPreparationGuideKind] =
    useState<PreparationGuideKind>('initial')
  const [preparationGuideIndex, setPreparationGuideIndex] = useState(0)
  const [isRoomChangePreviewPending, setIsRoomChangePreviewPending] =
    useState(false)
  const [roomChangePreviewDialogue, setRoomChangePreviewDialogue] =
    useState<Dialogue>(() => createRoomChangePreviewDialogue(false, false))
  const [dialogueLog, setDialogueLog] = useState<Dialogue[]>([
    bookWarningDialogues[0],
  ])

  // 商品IDごとの購入数とリュック収納数。
  // ショップ画面・リュック画面・災害後判定で共通利用する。
  const [itemFlags, setItemFlags] = useState<Record<ItemId, ItemFlags>>(
    createInitialItemFlags,
  )
  const [purchasedItemOrder, setPurchasedItemOrder] = useState<ItemId[]>([])

  // スマホでの連絡や避難場所確認など、アイテム以外の行動flag。
  const [storyFlags, setStoryFlags] = useState<StoryFlags>(
    createInitialStoryFlags,
  )

  // 部屋の対策が実行済みかを管理するflag。
  const [roomMeasureFlags, setRoomMeasureFlags] = useState<Record<string, boolean>>(
    createInitialRoomMeasureFlags,
  )

  const logBodyRef = useRef<HTMLDivElement | null>(null)
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null)
  const currentBgmSrcRef = useRef<string | null>(null)
  const groundRumbleAudioRef = useRef<HTMLAudioElement | null>(null)
  const {
    currentEscapeStep,
    resetEscapeFlow,
    advanceEscapeStep: advanceEscapeFlowStep,
  } = useEscapeFlow()

  const isStart = screen === 'start'
  const isBookWarning = screen === 'book-warning'
  const isFutureBookCut = screen === 'future-book-cut'
  const isRoomIntro = screen === 'room-intro'
  const isPreparation = screen === 'preparation'
  const isBackpack = screen === 'backpack'
  const isRoomChangePreview = screen === 'room-change-preview'
  const isShop = screen === 'shop'
  const isNight = screen === 'night'
  const isDayStart = screen === 'day-start'
  const isQuakeArrival = screen === 'quake-arrival'
  const isPostDisaster = screen === 'post-disaster'
  const isEscape = screen === 'escape'
  const isShelterArrival = screen === 'shelter-arrival'
  const isBadEnd = screen === 'bad-end'
  const isTrueEnd = screen === 'true-end'
  const isResultReview = screen === 'result-review'
  const isRealLifeMessage = screen === 'real-life-message'
  const isEndingActions = screen === 'ending-actions'
  const isAfterBadEnd = isResultReview || isRealLifeMessage || isEndingActions
  const shouldHideGlobalControls = isBadEnd || isTrueEnd || isAfterBadEnd
  const currentDayLabel = getDayLabel(currentDay)
  const preparationDialogue = getPreparationDialogue(currentDay)
  const isFurnitureFastenerUsed = itemFlags['furniture-fasteners'].packed > 0
  const isWindowFilmUsed = itemFlags['window-film'].packed > 0
  const isMobileBatteryPurchased = itemFlags['power-bank'].purchased > 0
  const isMobileBatteryUsable =
    itemFlags['power-bank'].purchased > 0 && itemFlags['power-bank'].packed === 0
  const activePreparationGuideSteps =
    preparationGuideKind === 'final'
      ? finalPreparationGuideSteps
      : preparationGuideSteps
  const currentPreparationGuideStep =
    activePreparationGuideSteps[preparationGuideIndex] ??
    activePreparationGuideSteps[0]
  const isPreparationGuideTarget = (target: PreparationGuideTarget) =>
    isPreparationGuideActive && currentPreparationGuideStep.target === target
  const currentPostDisasterDialogues = isFurnitureFastenerUsed
    ? truePostDisasterDialogues
    : postDisasterDialogues
  const selectedNewsArticle = newsArticles.find(
    (article) => article.id === selectedNewsArticleId,
  )
  const selectedContact = contactThreads.find(
    (contact) => contact.id === selectedContactId,
  )
  const selectedContactReplyLog = selectedContact
    ? contactReplyLog[selectedContact.id]
    : []
  const selectedContactMessages = selectedContact
    ? [...selectedContact.messages, ...selectedContactReplyLog]
    : []
  const hasSelectedContactReply = selectedContactReplyLog.length > 0
  const activeBgmSrc = isShop
    ? shopBgm
    : isPreparation || isBackpack || isRoomChangePreview
      ? preparationBgm
    : isEscape
      ? isMobileBatteryPurchased
        ? escapeBgm
        : escapeBgm2
      : isShelterArrival
        ? trueEndBgm
      : isNight
        ? nightRoomBgm
        : isQuakeArrival
          ? beforeQuakeBgm
          : isPostDisaster
            ? quakeBgm
            : isTrueEnd
              ? trueEndBgm
              : isBadEnd
                ? badEndBgm
                : isAfterBadEnd
                  ? isFurnitureFastenerUsed
                    ? trueEndBgm
                    : badEndBgm
                  : normalRoomBgm

  // ShopScreenに渡す購入数データ。
  // itemFlagsから購入数だけを取り出して作る。
  const purchasedItemCounts = useMemo(
    () => createPurchasedItemCounts(itemFlags),
    [itemFlags],
  )

  // リュック画面には購入数が1以上のアイテムだけを表示する。
  // 使用済みのアイテムは優先度を下げて下に並べる。
  const ownedBackpackItems = useMemo(
    () =>
      purchasedItemOrder
        .map((itemId) => backpackItems.find((item) => item.id === itemId))
        .filter((item): item is BackpackItem => Boolean(item))
        .filter((item) => itemFlags[item.id].purchased > 0)
        .sort((a, b) => {
          const aUsed = itemFlags[a.id].packed > 0
          const bUsed = itemFlags[b.id].packed > 0

          if (aUsed === bUsed) {
            return 0
          }

          return aUsed ? 1 : -1
        }),
    [itemFlags, purchasedItemOrder],
  )

  // 部屋対策の達成数。今後のエンディング判定や結果画面に使える。
  const completedRoomMeasureCount = Object.values(roomMeasureFlags).filter(Boolean).length
  const baseEscapeProgressPercent =
    escapeOutcome === 'bad'
      ? 60 + ((escapeProgressPercentByStep[currentEscapeStep.id] ?? 0) / 100) * 30
      : escapeProgressPercentByStep[currentEscapeStep.id] ?? 0
  const escapeProgressPercent = escapeProgressOverride ?? baseEscapeProgressPercent
  const isEscapeNightBackground = escapeProgressPercent >= 60
  const currentEscapeBackground =
    escapePanicRoadIndex !== null
      ? escapePanicRoadBackgrounds[escapePanicRoadIndex]
      : isEscapeNightBackground
      ? isEscapeLightOn
        ? currentEscapeStep.lightBackground
        : currentEscapeStep.nightBackground
      : currentEscapeStep.background
  const isEscapePanicActive = escapePhonePromptStage === 'panic'
  const isEscapePanicWandering =
    isEscapePanicActive && escapePanicDialogueIndex === 2
  const isEscapeRouteChoiceOpen = escapeRouteChoiceStage !== null
  const canAdvanceEscapeRouteText =
    escapeRouteChoiceStage === 'warning' || escapeRouteChoiceStage === 'prompt'
  const areEscapeRouteChoicesVisible = escapeRouteChoiceStage === 'choices'
  const canAdvanceEscapePhonePrompt =
    escapePhonePromptStage === 'dead' ||
    escapePhonePromptStage === 'charging-wait' ||
    escapePhonePromptStage === 'panic'
  const isEscapeBackpackPromptActive = escapePhonePromptStage === 'backpack'
  const isEscapePhoneBlocked =
    isEscape &&
    (escapePhonePowerState === 'dead' || escapePhonePowerState === 'charging')
  const isPhoneDetailLayout = phoneAppView !== 'home' && !isEscapePhoneBlocked
  const usesPhoneDetailShell = isPhoneDetailLayout || isEscapePhoneBlocked
  const escapePhoneHomeFrameImage =
    escapePhonePowerState === 'charged'
      ? phoneMobileChargingBackground
      : phoneLowBatteryBackground
  const escapePhoneDetailFrameImage =
    escapePhonePowerState === 'charged'
      ? phoneMobileChargingWhiteBackground
      : phoneLowBatteryWhiteBackground
  const preparationPhoneDetailFrameImage =
    currentDay === 0 ? phoneFinalDayWhiteBackground : phoneWhiteBackground
  const usesTallPhoneDetailFrame =
    usesPhoneDetailShell && (isEscapePhoneBlocked || isEscape || currentDay === 0)
  const phoneFrameImage = isEscapePhoneBlocked
    ? escapePhonePowerState === 'charging'
      ? phoneBatteryChargingBackground
      : phoneBatteryDeadBackground
    : isEscape
      ? phoneAppView === 'home'
        ? escapePhoneHomeFrameImage
        : escapePhoneDetailFrameImage
      : phoneAppView === 'home'
        ? phoneScreenBackground
        : preparationPhoneDetailFrameImage
  const canAdvanceDialogue =
    isPreparationGuideActive ||
    canAdvanceEscapeRouteText ||
    canAdvanceEscapePhonePrompt ||
    isBookWarning ||
    isRoomIntro ||
    isFutureBookCut ||
    isNight ||
    isDayStart ||
    isQuakeArrival ||
    isRoomChangePreview ||
    isPostDisaster ||
    isShelterArrival ||
    isBadEnd ||
    isTrueEnd ||
    isResultReview ||
    isRealLifeMessage
  const currentDialogue = isPreparationGuideActive
    ? currentPreparationGuideStep.dialogue
    : isBookWarning
      ? bookWarningDialogues[dialogueIndex]
    : isFutureBookCut
      ? bookWarningDialogues[0]
    : isRoomIntro
      ? roomIntroDialogues[roomIntroIndex]
      : isNight
        ? nightDialoguesByDay[currentDay as 1 | 2][nightDialogueIndex]
        : isDayStart
          ? dayStartDialoguesByDay[currentDay as 0 | 1][dayStartDialogueIndex]
          : isQuakeArrival
            ? quakeArrivalDialogue
            : isRoomChangePreview
              ? roomChangePreviewDialogue
              : isPostDisaster
                ? currentPostDisasterDialogues[postDisasterDialogueIndex]
                : isShelterArrival
                  ? shelterArrivalDialogue
                  : isBadEnd
                    ? badEndDialogue
                    : isTrueEnd
                      ? trueEndDialogue
                      : isResultReview
                        ? resultReviewDialogue
                        : isRealLifeMessage
                          ? realLifeDialogue
      : hoveredAction === 'shop'
        ? {
            speaker: 'ナレーション',
            text: 'ショップに行きますか？',
          }
        : hoveredAction === 'backpack'
          ? {
              speaker: 'ナレーション',
              text: 'リュックを整理しますか？',
            }
          : hoveredAction === 'phone'
            ? {
                speaker: 'ナレーション',
                text: 'スマホを確認しますか？',
              }
            : hoveredAction === 'furniture'
              ? {
                  speaker: 'ナレーション',
                  text: '部屋の対策を確認しますか？',
                }
          : hoveredAction === 'phase'
            ? {
                speaker: 'ナレーション',
                text: '何か対策をしよう。',
              }
            : hoveredAction === 'days-left'
              ? {
                  speaker: '主人公',
                  text:
                    currentDay === 0
                      ? '今日、地震が起こるはず……気を抜けない。'
                      : `あと${currentDay}日で地震が起こるはず……何か対策しないと。`,
                }
              : hoveredAction === 'finish-day'
                ? {
                    speaker: 'ナレーション',
                    text:
                      currentDay === 0
                        ? '最後の対策を終えますか？'
                        : '今日の対策を終えて休みますか？',
                  }
              : isBackpack
                ? selectedItem
                  ? itemFlags[selectedItem.id].packed > 0
                    ? {
                        speaker: 'ナレーション',
                        text: `${selectedItem.name}は使用済みです。`,
                      }
                    : {
                        speaker: 'ナレーション',
                        text: `${selectedItem.name}を使用しますか？`,
                      }
                  : hoveredItem
                    ? {
                        speaker: hoveredItem.name,
                        text: hoveredItem.description,
                      }
                    : ownedBackpackItems.length === 0
                      ? {
                          speaker: 'ナレーション',
                          text: '購入したアイテムがまだありません。',
                        }
                      : {
                          speaker: 'ナレーション',
                          text: '非常用リュックに入れる準備をしよう。',
                        }
                : escapePhonePromptStage === 'dead'
                  ? escapePhoneDeadDialogue
                  : escapePhonePromptStage === 'backpack'
                    ? escapeBackpackPromptDialogue
                    : escapePhonePromptStage === 'charging-wait'
                      ? escapePhoneChargingWaitDialogue
                      : escapePhonePromptStage === 'panic'
                        ? escapePanicRoadIndex !== null
                          ? escapePanicWanderingDialogues[escapePanicRoadIndex]
                          : escapePhonePanicDialogues[escapePanicDialogueIndex]
                        : escapeRouteChoiceStage === 'warning'
                          ? escapeRouteWarningDialogue
                          : escapeRouteChoiceStage === 'prompt'
                            ? escapeRoutePromptDialogue
                            : isEscape
                              ? currentEscapeStep.dialogue
                              : preparationDialogue
  const isLastBookDialogue =
    isBookWarning && dialogueIndex === bookWarningDialogues.length - 1
  const isLastRoomIntroDialogue =
    isRoomIntro && roomIntroIndex === roomIntroDialogues.length - 1
  const isLastNightDialogue =
    isNight &&
    nightDialogueIndex ===
      nightDialoguesByDay[currentDay as 1 | 2].length - 1
  const isLastDayStartDialogue =
    isDayStart &&
    dayStartDialogueIndex ===
      dayStartDialoguesByDay[currentDay as 0 | 1].length - 1
  const isLastPostDisasterDialogue =
    isPostDisaster &&
    postDisasterDialogueIndex === currentPostDisasterDialogues.length - 1

  const resetGame = () => {
    groundRumbleAudioRef.current?.pause()
    groundRumbleAudioRef.current = null
    setScreen('start')
    setCurrentDay(2)
    setDialogueIndex(0)
    setRoomIntroIndex(0)
    setNightDialogueIndex(0)
    setDayStartDialogueIndex(0)
    setPostDisasterDialogueIndex(0)
    resetEscapeFlow()
    setIsTransitioning(false)
    setTransitionText(null)
    setHoveredAction(null)
    setHoveredItem(null)
    setSelectedItem(null)
    setIsUiHidden(false)
    setIsLogOpen(false)
    setIsPhoneOpen(false)
    setPhoneAppView('home')
    setSelectedContactId(null)
    setIsContactReplyMenuOpen(false)
    setSelectedNewsArticleId(null)
    setIsShelterDetailOpen(false)
    setBackpackReturnScreen('preparation')
    setIsMeasuresOpen(false)
    setSelectedMeasure(null)
    setIsQuitMessageVisible(false)
    setIsItemUseFlashActive(false)
    setIsScreenShaking(false)
    setHasCheckedEscapeShelter(false)
    setEscapeRouteChoiceStage(null)
    setEscapePhonePowerState('normal')
    setEscapePhonePromptStage(null)
    setHoveredEscapeRouteChoice(null)
    setIsPreparationGuideActive(false)
    setHasSeenPreparationGuide(false)
    setHasSeenFinalPreparationGuide(false)
    setPreparationGuideKind('initial')
    setPreparationGuideIndex(0)
    setIsRoomChangePreviewPending(false)
    setRoomChangePreviewDialogue(createRoomChangePreviewDialogue(false, false))
    setItemFlags(createInitialItemFlags())
    setPurchasedItemOrder([])
    setStoryFlags(createInitialStoryFlags())
    setRoomMeasureFlags(createInitialRoomMeasureFlags())
    setDialogueLog([bookWarningDialogues[0]])
  }

  const handleStartGame = () => {
    setIsAudioEnabled(true)
    setScreen('book-warning')
    addDialogueLog(bookWarningDialogues[0])
  }

  useEffect(() => {
    if (isLogOpen && logBodyRef.current) {
      logBodyRef.current.scrollTop = logBodyRef.current.scrollHeight
    }
  }, [isLogOpen, dialogueLog])

  useEffect(() => {
    const enableAudio = () => setIsAudioEnabled(true)

    window.addEventListener('pointerdown', enableAudio, { once: true })
    window.addEventListener('keydown', enableAudio, { once: true })

    return () => {
      window.removeEventListener('pointerdown', enableAudio)
      window.removeEventListener('keydown', enableAudio)
    }
  }, [])

  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.volume = 0.45
    bgmAudioRef.current = audio

    return () => {
      audio.pause()
      bgmAudioRef.current = null
      currentBgmSrcRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = bgmAudioRef.current

    if (!audio || !isAudioEnabled) {
      return
    }

    if (currentBgmSrcRef.current !== activeBgmSrc) {
      audio.pause()
      audio.src = activeBgmSrc
      audio.currentTime = 0
      currentBgmSrcRef.current = activeBgmSrc
    }

    void audio.play().catch(() => {
      // Browser autoplay policy can still block playback until a trusted gesture.
    })
  }, [activeBgmSrc, isAudioEnabled])

  useEffect(() => {
    if (isPostDisaster) {
      return
    }

    if (groundRumbleAudioRef.current) {
      groundRumbleAudioRef.current.pause()
      groundRumbleAudioRef.current.currentTime = 0
      groundRumbleAudioRef.current = null
    }

    setIsScreenShaking(false)
  }, [isPostDisaster])

  useEffect(() => {
    if (
      !isPreparation ||
      isPreparationGuideActive ||
      isTransitioning
    ) {
      return
    }

    if (currentDay === 0 && !hasSeenFinalPreparationGuide) {
      setHoveredAction(null)
      setPreparationGuideKind('final')
      setPreparationGuideIndex(0)
      setIsPreparationGuideActive(true)
      return
    }

    if (hasSeenPreparationGuide) {
      return
    }

    setHoveredAction(null)
    setPreparationGuideKind('initial')
    setPreparationGuideIndex(0)
    setIsPreparationGuideActive(true)
  }, [
    currentDay,
    hasSeenFinalPreparationGuide,
    hasSeenPreparationGuide,
    isPreparation,
    isPreparationGuideActive,
    isTransitioning,
  ])

  const addDialogueLog = (dialogue: Dialogue) => {
    setDialogueLog((current) => {
      const latest = current.at(-1)

      if (latest?.speaker === dialogue.speaker && latest.text === dialogue.text) {
        return current
      }

      return [...current, dialogue]
    })
  }

  useEffect(() => {
    if (escapePhonePromptStage !== 'panic' || escapePanicDialogueIndex !== 2) {
      return
    }

    setEscapeProgressOverride(40)
    setEscapePanicRoadIndex(null)

    const timers: number[] = []
    const addPanicLog = (dialogue: Dialogue) => {
      setDialogueLog((current) => {
        const latest = current.at(-1)

        if (latest?.speaker === dialogue.speaker && latest.text === dialogue.text) {
          return current
        }

        return [...current, dialogue]
      })
    }
    const showPanicFade = () => {
      setIsEscapePanicFading(true)
      timers.push(window.setTimeout(() => setIsEscapePanicFading(false), 720))
    }

    escapePanicWanderingDialogues.forEach((dialogue, index) => {
      timers.push(
        window.setTimeout(
          () => {
            showPanicFade()
            setEscapePanicRoadIndex(index)
            addPanicLog(dialogue)
          },
          2000 + index * 2000,
        ),
      )
    })

    timers.push(
      window.setTimeout(() => {
        showPanicFade()
        const aftermathDialogue = escapePhonePanicDialogues[3]

        setEscapePanicRoadIndex(null)
        setEscapePanicDialogueIndex(3)
        addPanicLog(aftermathDialogue)
      }, 10000),
    )

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      setIsEscapePanicFading(false)
    }
  }, [escapePhonePromptStage, escapePanicDialogueIndex])

  const playSound = (src: string, volume: number) => {
    const audio = new Audio(src)
    audio.volume = volume

    void audio.play().catch(() => {
      // Sound effects are best-effort if the browser has not unlocked audio yet.
    })

    return audio
  }

  const playItemUseSound = () => {
    playSound(itemUseSound, 0.8)
  }

  const playShopPurchaseSound = () => {
    playSound(shopPurchaseSound, 0.42)
  }

  const playTextBoxClickSound = () => {
    playSound(textBoxClickSound, 0.26)
  }

  const playModalSound = () => {
    playSound(modalSound, 0.34)
  }

  const playGroundRumbleSound = () => {
    groundRumbleAudioRef.current?.pause()

    const audio = playSound(groundRumbleSound, 0.46)
    groundRumbleAudioRef.current = audio

    return audio
  }

  // ショップで商品を購入したときの処理。
  // purchasedを+1して購入数として管理する。
  const handleBuyItem = (itemId: ItemId, itemName: string) => {
    playShopPurchaseSound()

    setPurchasedItemOrder((current) =>
      current.includes(itemId) ? current : [...current, itemId],
    )

    setItemFlags((current) => ({
      ...current,
      [itemId]: {
        ...current[itemId],
        purchased: current[itemId].purchased + 1,
      },
    }))

    addDialogueLog({
      speaker: 'ナレーション',
      text: `${itemName}を購入した。`,
    })
  }

  // リュック画面で「はい」を押したときの処理。
  // packedを使用済みflagとして扱い、同じアイテムは再使用できないようにする。
  const handlePackSelectedItem = () => {
    if (!selectedItem) {
      return
    }

    const flags = itemFlags[selectedItem.id]

    if (flags.packed > 0) {
      addDialogueLog({
        speaker: 'ナレーション',
        text: `${selectedItem.name}は使用済みです。`,
      })
      setSelectedItem(null)
      return
    }

    playItemUseSound()

    setItemFlags((current) => ({
      ...current,
      [selectedItem.id]: {
        ...current[selectedItem.id],
        packed: current[selectedItem.id].packed + 1,
      },
    }))

    addDialogueLog({
      speaker: 'ナレーション',
      text: `${selectedItem.name}を使用した。`,
    })

    if (selectedItem.id === 'furniture-fasteners') {
      setIsItemUseFlashActive(true)
      window.setTimeout(() => {
        setIsItemUseFlashActive(false)
      }, 560)
    }

    if (
      selectedItem.id === 'furniture-fasteners' ||
      selectedItem.id === 'window-film'
    ) {
      setRoomChangePreviewDialogue(
        createRoomChangePreviewDialogue(
          selectedItem.id === 'furniture-fasteners' || isFurnitureFastenerUsed,
          selectedItem.id === 'window-film' || isWindowFilmUsed,
        ),
      )
      setIsRoomChangePreviewPending(true)
    }

    if (
      selectedItem.id === 'power-bank' &&
      backpackReturnScreen === 'escape' &&
      currentEscapeStep.id === 'route-check'
    ) {
      setEscapePhonePowerState('charging')
      setEscapePhonePromptStage(null)
      setHoveredItem(null)
      setSelectedItem(null)
      setScreen('escape')
      setPhoneAppView('home')
      setSelectedContactId(null)
      setIsContactReplyMenuOpen(false)
      setSelectedNewsArticleId(null)
      setIsShelterDetailOpen(false)
      setHasCheckedEscapeShelter(false)
      setIsPhoneOpen(true)
      addDialogueLog({
        speaker: 'ナレーション',
        text: 'モバイルバッテリーをつないだ。',
      })
      return
    }

    setSelectedItem(null)
  }

  // スマホ画面の各行動を実行済みflagとして保存する。
  const handlePhoneAction = (
    flagName: keyof StoryFlags,
    logText: string,
    nextView: Exclude<PhoneAppView, 'home'>,
  ) => {
    if (isEscape && flagName === 'checkedShelter') {
      setHasCheckedEscapeShelter(true)
    }

    setStoryFlags((current) => ({
      ...current,
      [flagName]: true,
    }))

    setPhoneAppView(nextView)
    setSelectedContactId(null)
    setIsContactReplyMenuOpen(false)
    setSelectedNewsArticleId(null)
    setIsShelterDetailOpen(false)

    addDialogueLog({
      speaker: 'ナレーション',
      text: logText,
    })
  }

  const handleOpenPhone = () => {
    setHoveredAction(null)
    setPhoneAppView('home')
    setSelectedContactId(null)
    setIsContactReplyMenuOpen(false)
    setSelectedNewsArticleId(null)
    setIsShelterDetailOpen(false)
    setHasCheckedEscapeShelter(false)

    if (
      isEscape &&
      currentEscapeStep.id === 'route-check' &&
      escapePhonePowerState !== 'charged'
    ) {
      setEscapePhonePowerState('dead')
      setEscapePhonePromptStage(null)
      setIsPhoneOpen(true)
      return
    }

    setIsPhoneOpen(true)
  }

  const advanceEscapeStep = () => {
    if (isTransitioning) {
      return
    }

    setTransitionText(null)
    setIsTransitioning(true)
    setHoveredAction(null)

    window.setTimeout(() => {
      const result = advanceEscapeFlowStep()

      if (result.type === 'shelter') {
        setScreen('shelter-arrival')
        addDialogueLog(shelterArrivalDialogue)
        return
      }

      addDialogueLog(result.step.dialogue)
    }, 140)

    finishTransition()
  }

  const handleClosePhone = () => {
    const shouldAdvanceEscape = isEscape && hasCheckedEscapeShelter
    const shouldOpenRouteChoice =
      shouldAdvanceEscape && currentEscapeStep.id === 'near-shelter'
    const shouldResolveDeadPhone =
      isEscape &&
      currentEscapeStep.id === 'route-check' &&
      escapePhonePowerState === 'dead'
    const shouldStartChargingWait =
      isEscape &&
      currentEscapeStep.id === 'route-check' &&
      escapePhonePowerState === 'charging'

    setIsPhoneOpen(false)
    setPhoneAppView('home')
    setSelectedContactId(null)
    setIsContactReplyMenuOpen(false)
    setSelectedNewsArticleId(null)
    setIsShelterDetailOpen(false)
    setHasCheckedEscapeShelter(false)

    if (shouldResolveDeadPhone) {
      setEscapePhonePromptStage('dead')
      addDialogueLog(escapePhoneDeadDialogue)
      return
    }

    if (shouldStartChargingWait) {
      setEscapePhonePromptStage('charging-wait')
      addDialogueLog(escapePhoneChargingWaitDialogue)
      return
    }

    if (shouldOpenRouteChoice) {
      setEscapeRouteChoiceStage('warning')
      setHoveredEscapeRouteChoice(null)
      addDialogueLog(escapeRouteWarningDialogue)
      return
    }

    if (shouldAdvanceEscape) {
      advanceEscapeStep()
    }
  }

  const handleChooseEscapeRoute = (route: 'right' | 'left') => {
    setHoveredEscapeRouteChoice(null)
    setEscapeRouteChoiceStage(null)
    addDialogueLog({
      speaker: 'ナレーション',
      text:
        route === 'right'
          ? '右の道へ進むことにした。'
          : '左の道へ進むことにした。',
    })
    advanceEscapeStep()
  }

  const handleContactQuickReply = (
    contactId: ContactId,
    reply: ContactThread['quickReplies'][number],
  ) => {
    if (contactReplyLog[contactId].length > 0 || pendingContactResponseId) {
      return
    }

    setIsContactReplyMenuOpen(false)
    setPendingContactResponseId(contactId)
    setContactReplyLog((current) => ({
      ...current,
      [contactId]: [...current[contactId], { from: 'me', text: reply.text }],
    }))

    window.setTimeout(() => {
      setContactReplyLog((current) => ({
        ...current,
        [contactId]: [
          ...current[contactId],
          { from: 'them', text: reply.response },
        ],
      }))
      setPendingContactResponseId((current) =>
        current === contactId ? null : current,
      )
    }, 520)
  }

  // 部屋対策の「はい」を押したときの処理。
  // 選んだ対策を実行済みとして保存する。
  const handleConfirmMeasure = () => {
    if (!selectedMeasure) {
      return
    }

    setRoomMeasureFlags((current) => ({
      ...current,
      [selectedMeasure]: true,
    }))

    addDialogueLog({
      speaker: 'ナレーション',
      text: `${selectedMeasure}を実行した。`,
    })

    setSelectedMeasure(null)
  }

  const finishTransition = () => {
    window.setTimeout(() => {
      setIsTransitioning(false)
      setTransitionText(null)
    }, 620)
  }

  const handleFinishPreparation = () => {
    if (isTransitioning) {
      return
    }

    setHoveredAction(null)
    setIsPhoneOpen(false)
    setIsMeasuresOpen(false)
    setSelectedMeasure(null)

    if (currentDay === 0) {
      setScreen('quake-arrival')
      addDialogueLog(quakeArrivalDialogue)
      return
    }

    setTransitionText('-夜-')
    setIsTransitioning(true)

    window.setTimeout(() => {
      setScreen('night')
      setNightDialogueIndex(0)
      addDialogueLog(nightDialoguesByDay[currentDay as 1 | 2][0])
    }, 140)

    finishTransition()
  }

  const jumpToFinalPreparation = () => {
    setCurrentDay(0)
    setScreen('preparation')
    setHoveredAction(null)
    setHoveredItem(null)
    setSelectedItem(null)
    setIsUiHidden(false)
    setIsLogOpen(false)
    setIsPhoneOpen(false)
    setIsMeasuresOpen(false)
    setSelectedMeasure(null)
    setIsPreparationGuideActive(false)
    setHasSeenFinalPreparationGuide(false)
    setPreparationGuideKind('final')
    setPreparationGuideIndex(0)
    addDialogueLog(getPreparationDialogue(0))
  }

  const jumpToEscapePart = () => {
    setScreen('escape')
    setEscapeOutcome('true')
    setIsEscapeLightOn(false)
    setEscapeWaterLevel(1)
    setEscapeFoodLevel(1)
    setEscapeProgressOverride(null)
    setEscapePanicDialogueIndex(0)
    setEscapePanicRoadIndex(null)
    resetEscapeFlow()
    setHoveredAction(null)
    setHoveredItem(null)
    setSelectedItem(null)
    setIsUiHidden(false)
    setIsLogOpen(false)
    setIsPhoneOpen(false)
    setPhoneAppView('home')
    setSelectedContactId(null)
    setIsContactReplyMenuOpen(false)
    setSelectedNewsArticleId(null)
    setIsShelterDetailOpen(false)
    setHasCheckedEscapeShelter(false)
    setEscapePhonePowerState('normal')
    setEscapePhonePromptStage(null)
    setEscapeRouteChoiceStage(null)
    setHoveredEscapeRouteChoice(null)
    setBackpackReturnScreen('escape')
    setIsMeasuresOpen(false)
    setSelectedMeasure(null)
    addDialogueLog(escapeDialogue)
  }

  const handleNextDialogue = () => {
    if (isTransitioning) {
      return
    }

    if (isPreparationGuideActive) {
      const nextGuideIndex = preparationGuideIndex + 1

      if (nextGuideIndex >= activePreparationGuideSteps.length) {
        setIsPreparationGuideActive(false)
        if (preparationGuideKind === 'final') {
          setHasSeenFinalPreparationGuide(true)
        } else {
          setHasSeenPreparationGuide(true)
        }
        setPreparationGuideIndex(0)
        setHoveredAction(null)
        return
      }

      setPreparationGuideIndex(nextGuideIndex)
      setHoveredAction(null)
      return
    }

    if (escapeRouteChoiceStage === 'warning') {
      setEscapeRouteChoiceStage('prompt')
      setHoveredAction(null)
      addDialogueLog(escapeRoutePromptDialogue)
      return
    }

    if (escapeRouteChoiceStage === 'prompt') {
      setEscapeRouteChoiceStage('choices')
      setHoveredAction(null)
      return
    }

    if (escapeRouteChoiceStage === 'choices') {
      return
    }

    if (escapePhonePromptStage === 'dead') {
      if (isMobileBatteryUsable) {
        setEscapePhonePromptStage('backpack')
        addDialogueLog(escapeBackpackPromptDialogue)
      } else {
        setEscapePhonePromptStage('panic')
        setEscapePanicDialogueIndex(0)
        setEscapeWaterLevel(0.35)
        addDialogueLog(escapePhonePanicDialogue)
      }

      setHoveredAction(null)
      return
    }

    if (escapePhonePromptStage === 'charging-wait') {
      setTransitionText('-しばらくして-')
      setIsTransitioning(true)
      setEscapePhonePromptStage(null)
      setHoveredAction(null)

      window.setTimeout(() => {
        setEscapePhonePowerState('charged')
        setPhoneAppView('home')
        setSelectedContactId(null)
        setIsContactReplyMenuOpen(false)
        setSelectedNewsArticleId(null)
        setIsShelterDetailOpen(false)
        setHasCheckedEscapeShelter(false)
        setIsPhoneOpen(true)
        addDialogueLog({
          speaker: 'ナレーション',
          text: 'スマホの充電が少し回復した。避難場所を確認できそうだ。',
        })
      }, 140)

      finishTransition()
      return
    }

    if (escapePhonePromptStage === 'panic') {
      if (escapePanicDialogueIndex === 2) {
        setHoveredAction(null)
        return
      }

      if (escapePanicDialogueIndex >= escapePhonePanicDialogues.length - 1) {
        setHoveredAction(null)
        return
      }

      const nextPanicDialogueIndex = escapePanicDialogueIndex + 1

      if (nextPanicDialogueIndex < escapePhonePanicDialogues.length) {
        setEscapePanicDialogueIndex(nextPanicDialogueIndex)
        addDialogueLog(escapePhonePanicDialogues[nextPanicDialogueIndex])
      }

      setHoveredAction(null)
      return
    }

    if (isFutureBookCut) {
      setScreen('book-warning')
      setDialogueIndex(1)
      addDialogueLog(bookWarningDialogues[1])
      return
    }

    if (isBookWarning && isLastBookDialogue) {
      setIsTransitioning(true)

      window.setTimeout(() => {
        setScreen('room-intro')
        setDialogueIndex(0)
        addDialogueLog(roomIntroDialogues[0])
      }, 140)

      window.setTimeout(() => {
        setIsTransitioning(false)
      }, 520)

      return
    }

    if (isBookWarning) {
      const nextIndex = dialogueIndex + 1

      if (dialogueIndex === 0) {
        setScreen('future-book-cut')
        return
      }

      setDialogueIndex(nextIndex)
      addDialogueLog(bookWarningDialogues[nextIndex])
      return
    }

    if (isRoomIntro && isLastRoomIntroDialogue) {
      setTransitionText('-対策フェーズ開始-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setScreen('preparation')
        setRoomIntroIndex(0)
        addDialogueLog(getPreparationDialogue(currentDay))
      }, 140)

      window.setTimeout(() => {
        setIsTransitioning(false)
        setTransitionText(null)
      }, 620)

      return
    }

    if (isRoomIntro) {
      const nextIndex = roomIntroIndex + 1

      setRoomIntroIndex(nextIndex)
      addDialogueLog(roomIntroDialogues[nextIndex])
      return
    }

    if (isNight && isLastNightDialogue) {
      const nextDay = (currentDay - 1) as 0 | 1

      setTransitionText(nextDay === 0 ? '-災害当日-' : '-災害まであと一日-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setCurrentDay(nextDay)
        setScreen('day-start')
        setNightDialogueIndex(0)
        setDayStartDialogueIndex(0)
        addDialogueLog(dayStartDialoguesByDay[nextDay][0])
      }, 140)

      finishTransition()
      return
    }

    if (isNight) {
      const nextIndex = nightDialogueIndex + 1

      setNightDialogueIndex(nextIndex)
      addDialogueLog(nightDialoguesByDay[currentDay as 1 | 2][nextIndex])
      return
    }

    if (isDayStart && isLastDayStartDialogue) {
      setTransitionText('-対策フェーズ-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setScreen('preparation')
        setDayStartDialogueIndex(0)
        addDialogueLog(getPreparationDialogue(currentDay))
      }, 140)

      finishTransition()
      return
    }

    if (isDayStart) {
      const nextIndex = dayStartDialogueIndex + 1

      setDayStartDialogueIndex(nextIndex)
      addDialogueLog(dayStartDialoguesByDay[currentDay as 0 | 1][nextIndex])
      return
    }

    if (isRoomChangePreview) {
      setScreen('preparation')
      addDialogueLog(preparationDialogue)
      return
    }

    if (isQuakeArrival) {
      setTransitionText('-地震発生-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setScreen('post-disaster')
        setIsScreenShaking(true)
        setPostDisasterDialogueIndex(0)
        addDialogueLog(currentPostDisasterDialogues[0])
        const rumbleAudio = playGroundRumbleSound()
        const stopShaking = () => {
          setIsScreenShaking(false)
        }

        rumbleAudio.addEventListener('ended', stopShaking, { once: true })
        rumbleAudio.addEventListener('error', stopShaking, { once: true })
        rumbleAudio.addEventListener(
          'loadedmetadata',
          () => {
            if (Number.isFinite(rumbleAudio.duration)) {
              window.setTimeout(stopShaking, rumbleAudio.duration * 1000 + 240)
            }
          },
          { once: true },
        )

        window.setTimeout(() => {
          if (rumbleAudio.paused && !rumbleAudio.ended) {
            stopShaking()
          }
        }, 320)
      }, 140)

      finishTransition()
      return
    }

    if (isPostDisaster && isLastPostDisasterDialogue) {
      setTransitionText('-脱出開始-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setIsLogOpen(false)
        setScreen('escape')
        setEscapeOutcome(isFurnitureFastenerUsed ? 'true' : 'bad')
        setIsEscapeLightOn(false)
        setEscapeWaterLevel(1)
        setEscapeFoodLevel(1)
        setEscapeProgressOverride(null)
        setEscapePanicDialogueIndex(0)
        setEscapePanicRoadIndex(null)
        resetEscapeFlow()
        setHasCheckedEscapeShelter(false)
        setPostDisasterDialogueIndex(0)
        addDialogueLog(escapeDialogue)
      }, 140)

      finishTransition()
      return
    }

    if (isPostDisaster) {
      const nextIndex = postDisasterDialogueIndex + 1

      setPostDisasterDialogueIndex(nextIndex)
      addDialogueLog(currentPostDisasterDialogues[nextIndex])
      return
    }

    if (isShelterArrival) {
      setTransitionText(escapeOutcome === 'bad' ? '-Bad End-' : '-True End-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setIsLogOpen(false)
        if (escapeOutcome === 'bad') {
          setScreen('bad-end')
          addDialogueLog(badEndDialogue)
          return
        }

        setScreen('true-end')
        addDialogueLog(trueEndDialogue)
      }, 140)

      finishTransition()
      return
    }

    if (isTrueEnd) {
      setTransitionText('-今回の振り返り-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setIsUiHidden(false)
        setIsLogOpen(false)
        setScreen('result-review')
        addDialogueLog(resultReviewDialogue)
        playModalSound()
      }, 140)

      finishTransition()
      return
    }

    if (isBadEnd) {
      setTransitionText('-今回の振り返り-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setIsUiHidden(false)
        setIsLogOpen(false)
        setScreen('result-review')
        addDialogueLog(resultReviewDialogue)
        playModalSound()
      }, 140)

      finishTransition()
      return
    }

    if (isResultReview) {
      setTransitionText('-現実のあなたへ-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setScreen('real-life-message')
        addDialogueLog(realLifeDialogue)
        playModalSound()
      }, 140)

      finishTransition()
      return
    }

    if (isRealLifeMessage) {
      setTransitionText('-これからどうする？-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setScreen('ending-actions')
      }, 140)

      finishTransition()
    }
  }

  const handleMessageBoxClick = () => {
    if (!isTransitioning) {
      playTextBoxClickSound()
    }

    handleNextDialogue()
  }

  if (isShop) {
    return (
      <ShopScreen
        dayLabel={currentDayLabel}
        purchasedItemCounts={purchasedItemCounts}
        onBack={() => {
          addDialogueLog(preparationDialogue)
          setScreen('preparation')
        }}
        onBuy={handleBuyItem}
      />
    )
  }

  return (
    <main className="game-screen">
      <section
        className={`scene ${isStart ? 'is-start' : ''} ${
          isNight ? 'is-night' : ''
        } ${
          isAfterBadEnd ? 'is-ending-panel' : ''
        } ${
          isScreenShaking && isPostDisaster ? 'is-shaking' : ''
        } ${
          isPreparationGuideActive ? 'is-preparation-guide' : ''
        } ${
          isEscapeBackpackPromptActive ? 'is-escape-backpack-guide' : ''
        } ${
          isEscapeRouteChoiceOpen ? 'is-escape-choice' : ''
        } ${
          isEscapePanicActive ? 'is-escape-panic' : ''
        }`}
        style={{
          backgroundImage: `url(${
            isBookWarning
              ? dialogueIndex === 1
                ? futureBookCutBackground
                : bookWarningBackground
              : isFutureBookCut
                ? futureBookCutBackground
              : isStart
                ? startBackground
              : isBackpack
                ? backpackReturnScreen === 'escape'
                  ? backpackEscapeBackground
                  : backpackBackground
                : isRoomChangePreview
                  ? isFurnitureFastenerUsed
                    ? fixedNormalRoomBackground
                    : normalRoomBackground
                : isPostDisaster
                  ? isFurnitureFastenerUsed
                    ? fixedAfterDisasterBackground
                    : afterDisasterBackground
                : isEscape
                    ? currentEscapeBackground
                  : isShelterArrival
                    ? escapeOutcome === 'bad'
                      ? shelterArrivalNightBackground
                      : shelterArrivalBackground
                  : isBadEnd
                    ? badEndBackground
                    : isTrueEnd
                      ? trueEndBackground
                      : isNight
                        ? nightRoomBackground
                        : isFurnitureFastenerUsed
                          ? fixedNormalRoomBackground
                          : normalRoomBackground
          })`,
        }}
        aria-label={
          isBookWarning
            ? '予告本を見る場面'
            : isStart
              ? 'スタート画面'
            : isBackpack
              ? 'リュックを整理する場面'
            : isRoomChangePreview
              ? '対策後の部屋'
            : isNight
              ? '夜の場面'
              : isQuakeArrival
                ? '地震発生直前の部屋'
              : isPostDisaster
                ? '災害後の部屋'
                : isEscape
                  ? '脱出する場面'
                : isShelterArrival
                  ? '避難所に到着した場面'
                  : isBadEnd
                    ? 'バッドエンド'
                    : isTrueEnd
                      ? 'トゥルーエンド'
                      : isResultReview
                        ? '今回の振り返り'
                        : isRealLifeMessage
                          ? '現実への呼びかけ'
                          : isEndingActions
                            ? '終了選択'
              : '主人公の部屋'
        }
      >
        {isStart && (
          <button
            type="button"
            className="start-hotspot"
            onClick={handleStartGame}
            aria-label="はじめる"
          />
        )}

        <div
          className={`item-use-flash ${isItemUseFlashActive ? 'is-active' : ''}`}
          aria-hidden="true"
        />
        <div
          className={`scene-transition ${isTransitioning ? 'is-active' : ''}`}
          aria-hidden="true"
        >
          {transitionText && (
            <strong className="transition-title">{transitionText}</strong>
          )}
        </div>

        {(isPreparationGuideActive || isEscapeBackpackPromptActive) && (
          <div className="preparation-guide-dim" aria-hidden="true" />
        )}

        {areEscapeRouteChoicesVisible && (
          <div
            className={`escape-choice-shade ${
              hoveredEscapeRouteChoice === 'right'
                ? 'is-right-hovered'
                : hoveredEscapeRouteChoice === 'left'
                  ? 'is-left-hovered'
                  : ''
            }`}
            aria-hidden="true"
          >
            <span className="escape-choice-mask is-left" />
            <span className="escape-choice-mask is-right" />
          </div>
        )}

        {isEscapePanicFading && <div className="escape-panic-fade" aria-hidden="true" />}

        {!isStart &&
          !shouldHideGlobalControls &&
          !isEscapeRouteChoiceOpen &&
          !isEscapePanicWandering && (
          <button
            type="button"
            className="ui-toggle"
            onClick={() => setIsUiHidden((current) => !current)}
          >
            {isUiHidden ? 'UI表示' : 'UI非表示'}
          </button>
        )}

        {!isStart &&
          !isUiHidden &&
          !shouldHideGlobalControls &&
          !isEscapeRouteChoiceOpen &&
          !isEscapePanicWandering && (
          <button
            type="button"
            className={`log-toggle ${isBackpack ? 'is-backpack' : ''}`}
            onClick={() => setIsLogOpen(true)}
          >
            テキストログ
          </button>
        )}

        {isPreparation && !isUiHidden && (
          <>
            <header className="game-header">
              <div
                className="game-header-days"
                onMouseEnter={() => setHoveredAction('days-left')}
                onMouseLeave={() => setHoveredAction(null)}
                onFocus={() => setHoveredAction('days-left')}
                onBlur={() => setHoveredAction(null)}
                tabIndex={0}
                aria-label="地震発生までの残り日数"
              >
                {currentDayLabel}
              </div>
              <div
                className="game-header-title"
                onMouseEnter={() => setHoveredAction('phase')}
                onMouseLeave={() => setHoveredAction(null)}
                onFocus={() => setHoveredAction('phase')}
                onBlur={() => setHoveredAction(null)}
                tabIndex={0}
                aria-label="現在のフェーズ"
              >
                対策フェーズ中
              </div>
              <div className="game-header-actions">
                <button
                  type="button"
                  className="debug-skip-button"
                  onClick={jumpToEscapePart}
                >
                  脱出パートへ
                </button>
                <button
                  type="button"
                  className="debug-skip-button"
                  onClick={jumpToFinalPreparation}
                >
                  最終日へ
                </button>
                <button
                  type="button"
                  className={`game-header-action ${
                    isPreparationGuideTarget('finish') ? 'is-guide-target' : ''
                  }`}
                  onMouseEnter={() => setHoveredAction('finish-day')}
                  onMouseLeave={() => setHoveredAction(null)}
                  onFocus={() => setHoveredAction('finish-day')}
                  onBlur={() => setHoveredAction(null)}
                  onClick={handleFinishPreparation}
                >
                  対策を終える
                </button>
              </div>
            </header>
            <div className="action-icons" aria-label="対策行動">
              {currentDay === 0 && (
                <button
                  type="button"
                  className={`action-icon-button action-icon-furniture ${
                    isPreparationGuideTarget('furniture')
                      ? 'is-guide-target'
                      : ''
                  }`}
                  onMouseEnter={() => setHoveredAction('furniture')}
                  onMouseLeave={() => setHoveredAction(null)}
                  onFocus={() => setHoveredAction('furniture')}
                  onBlur={() => setHoveredAction(null)}
                  onClick={() => {
                    setHoveredAction(null)
                    setIsPhoneOpen(false)
                    setIsMeasuresOpen(true)
                  }}
                  aria-label="対策"
                >
                  <img src={measureIcon} alt="" />
                  <span>対策</span>
                </button>
              )}
              <button
                type="button"
                className={`action-icon-button action-icon-shop ${
                  isPreparationGuideTarget('shop') ? 'is-guide-target' : ''
                }`}
                onMouseEnter={() => setHoveredAction('shop')}
                onMouseLeave={() => setHoveredAction(null)}
                onFocus={() => setHoveredAction('shop')}
                onBlur={() => setHoveredAction(null)}
                onClick={() => {
                  setHoveredAction(null)
                  addDialogueLog({
                    speaker: 'ナレーション',
                    text: 'ショップで必要な防災用品を確認しよう。',
                  })
                  setScreen('shop')
                }}
              >
                <img src={shopIcon} alt="" />
                <span>ショップ</span>
              </button>
              <button
                type="button"
                className={`action-icon-button action-icon-phone ${
                  isPreparationGuideTarget('phone') ? 'is-guide-target' : ''
                }`}
                onMouseEnter={() => setHoveredAction('phone')}
                onMouseLeave={() => setHoveredAction(null)}
                onFocus={() => setHoveredAction('phone')}
                onBlur={() => setHoveredAction(null)}
                onClick={handleOpenPhone}
                aria-label="スマホ"
              >
                <img src={phoneIcon} alt="" />
                <span>スマホ</span>
              </button>
              <button
                type="button"
                className={`action-icon-button action-icon-backpack ${
                  isPreparationGuideTarget('backpack') ? 'is-guide-target' : ''
                }`}
                onMouseEnter={() => setHoveredAction('backpack')}
                onMouseLeave={() => setHoveredAction(null)}
                onFocus={() => setHoveredAction('backpack')}
                onBlur={() => setHoveredAction(null)}
                onClick={() => {
                  setHoveredAction(null)
                  setBackpackReturnScreen('preparation')
                  addDialogueLog({
                    speaker: 'ナレーション',
                    text: '持っているものを確認して、非常用リュックに入れる準備をしよう。',
                  })
                  setScreen('backpack')
                }}
              >
                <img src={backpackIcon} alt="" />
                <span>リュック</span>
              </button>
            </div>
          </>
        )}

        {isEscape && !isUiHidden && !isEscapeRouteChoiceOpen && !isEscapePanicWandering && (
          <>
            <div className="escape-progress-panel" aria-label="時間経過">
              <span>経過時間</span>
              <div className="escape-progress-track" aria-hidden="true">
                <span
                  className="escape-progress-fill"
                  style={{ width: `${escapeProgressPercent}%` }}
                />
                <span
                  className="escape-progress-marker"
                  style={{ left: `${escapeProgressPercent}%` }}
                />
              </div>
            </div>
            <aside className="escape-supply-status" aria-label="水分と空腹の状態">
              <div
                className={`${
                  escapeWaterLevel > 0 ? 'is-available' : 'is-empty'
                } ${escapeWaterLevel > 0 && escapeWaterLevel < 1 ? 'is-low' : ''}`}
              >
                <span>水分</span>
                <strong className="escape-vertical-gauge" aria-hidden="true">
                  <span style={{ height: `${escapeWaterLevel * 100}%` }} />
                </strong>
              </div>
              <div
                className={`${
                  escapeFoodLevel > 0 ? 'is-available' : 'is-empty'
                } ${escapeFoodLevel > 0 && escapeFoodLevel < 1 ? 'is-low' : ''}`}
              >
                <span>空腹</span>
                <strong className="escape-vertical-gauge" aria-hidden="true">
                  <span style={{ height: `${escapeFoodLevel * 100}%` }} />
                </strong>
              </div>
              {isEscapeNightBackground && !isEscapePanicActive && (
                <button
                  type="button"
                  className={`escape-light-toggle ${isEscapeLightOn ? 'is-on' : ''}`}
                  onClick={() => setIsEscapeLightOn((current) => !current)}
                >
                  {isEscapeLightOn ? 'ライトOFF' : 'ライトON'}
                </button>
              )}
            </aside>
            <EscapeControls
              disabled={isEscapePanicActive}
              onHoverAction={setHoveredAction}
              onOpenPhone={handleOpenPhone}
              onOpenBackpack={() => {
                setHoveredAction(null)
                setEscapePhonePromptStage(null)
                setBackpackReturnScreen('escape')
                addDialogueLog({
                  speaker: 'ナレーション',
                  text: '脱出に必要なものを確認しよう。',
                })
                setScreen('backpack')
              }}
            />
          </>
        )}

        {areEscapeRouteChoicesVisible && (
          <div className="escape-route-choice-panel" aria-label="進む道を選ぶ">
            <button
              type="button"
              className="escape-route-choice-button is-right"
              onMouseEnter={() => setHoveredEscapeRouteChoice('right')}
              onMouseLeave={() => setHoveredEscapeRouteChoice(null)}
              onFocus={() => setHoveredEscapeRouteChoice('right')}
              onBlur={() => setHoveredEscapeRouteChoice(null)}
              onClick={() => handleChooseEscapeRoute('right')}
            >
              右の道へ進む
            </button>
            <button
              type="button"
              className="escape-route-choice-button is-left"
              onMouseEnter={() => setHoveredEscapeRouteChoice('left')}
              onMouseLeave={() => setHoveredEscapeRouteChoice(null)}
              onFocus={() => setHoveredEscapeRouteChoice('left')}
              onBlur={() => setHoveredEscapeRouteChoice(null)}
              onClick={() => handleChooseEscapeRoute('left')}
            >
              左の道へ進む
            </button>
          </div>
        )}

        {(isPreparation || isEscape) && isPhoneOpen && !isUiHidden && (
          <div
            className={`phone-overlay ${usesPhoneDetailShell ? 'is-detail' : ''}`}
            aria-label="スマホ画面"
            onClick={handleClosePhone}
          >
            <div
              className={`phone-screen-shell ${
                usesPhoneDetailShell ? 'is-detail' : ''
              } ${usesTallPhoneDetailFrame ? 'is-tall-detail-frame' : ''}`}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={phoneFrameImage}
                alt=""
              />
              {isEscapePhoneBlocked ? null : phoneAppView === 'home' ? (
                <div className="phone-app-grid" aria-label="スマホアプリ">
                  <button
                    type="button"
                    onClick={() =>
                      handlePhoneAction(
                        'contactedFamily',
                        '家族に連絡して、地震への備えを共有した。',
                        'contact',
                      )
                    }
                  >
                    連絡{storyFlags.contactedFamily ? '済み' : ''}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handlePhoneAction(
                        'checkedNews',
                        'ニュースで防災情報と最新の注意点を確認した。',
                        'news',
                      )
                    }
                  >
                    ニュース{storyFlags.checkedNews ? '確認済み' : ''}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handlePhoneAction(
                        'checkedShelter',
                        '避難場所と避難経路を確認した。',
                        'shelter',
                      )
                    }
                  >
                    避難場所{storyFlags.checkedShelter ? '確認済み' : ''}
                  </button>
                </div>
              ) : (
                <div className="phone-detail-app">
                  <button
                    type="button"
                    className="phone-detail-back"
                    onClick={() => {
                      if (phoneAppView === 'contact' && selectedContact) {
                        setSelectedContactId(null)
                        setIsContactReplyMenuOpen(false)
                        return
                      }

                      if (phoneAppView === 'news' && selectedNewsArticle) {
                        setSelectedNewsArticleId(null)
                        return
                      }

                      if (phoneAppView === 'shelter' && isShelterDetailOpen) {
                        setIsShelterDetailOpen(false)
                        return
                      }

                      setPhoneAppView('home')
                      setSelectedContactId(null)
                      setSelectedNewsArticleId(null)
                      setIsShelterDetailOpen(false)
                    }}
                  >
                    戻る
                  </button>
                  {phoneAppView === 'contact' ? (
                    <div className="phone-chat-app" aria-label="連絡">
                      {selectedContact ? (
                        <section className="phone-chat-thread">
                          <header className="phone-chat-thread-header">
                            <div className="chat-avatar" aria-hidden="true">
                              {selectedContact.name.slice(0, 1)}
                            </div>
                            <div>
                              <span>{selectedContact.relation}</span>
                              <h2>{selectedContact.name}</h2>
                            </div>
                          </header>
                          <div className="phone-chat-messages">
                            {selectedContactMessages.map((message, index) => (
                              <p
                                key={`${selectedContact.id}-${index}`}
                                className={`chat-bubble ${
                                  message.from === 'me' ? 'is-me' : 'is-them'
                                }`}
                              >
                                {message.text}
                              </p>
                            ))}
                            {pendingContactResponseId === selectedContact.id && (
                              <p className="chat-bubble is-them is-typing">入力中...</p>
                            )}
                          </div>
                          <div className="phone-chat-compose">
                            {isContactReplyMenuOpen && !hasSelectedContactReply && (
                              <div className="chat-reply-options">
                                {selectedContact.quickReplies.map((reply) => (
                                  <button
                                    type="button"
                                    key={reply.text}
                                    onClick={() =>
                                      handleContactQuickReply(selectedContact.id, reply)
                                    }
                                  >
                                    {reply.text}
                                  </button>
                                ))}
                              </div>
                            )}
                            <button
                              type="button"
                              className="chat-compose-input"
                              onClick={() =>
                                setIsContactReplyMenuOpen((current) => !current)
                              }
                              disabled={
                                hasSelectedContactReply ||
                                pendingContactResponseId === selectedContact.id
                              }
                            >
                              {pendingContactResponseId === selectedContact.id
                                  ? '返信を待っています...'
                                  : hasSelectedContactReply
                                    ? '送信済み'
                                  : 'メッセージを選択...'}
                            </button>
                          </div>
                        </section>
                      ) : (
                        <>
                          <header className="phone-chat-list-header">
                            <span>Messages</span>
                            <h2>連絡</h2>
                          </header>
                          <div className="phone-chat-list">
                            {contactThreads.map((contact) => (
                              <button
                                type="button"
                                key={contact.id}
                                onClick={() => {
                                  setSelectedContactId(contact.id)
                                  setIsContactReplyMenuOpen(false)
                                }}
                              >
                                <div className="chat-avatar" aria-hidden="true">
                                  {contact.name.slice(0, 1)}
                                </div>
                                <div className="chat-list-body">
                                  <div>
                                    <h3>{contact.name}</h3>
                                    <time>{contact.time}</time>
                                  </div>
                                  <p>{contact.preview}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ) : phoneAppView === 'news' ? (
                    <div className="phone-news-app" aria-label="ニュース">
                      {selectedNewsArticle ? (
                        <article className="phone-news-article">
                          <span>{selectedNewsArticle.source}</span>
                          <h2>{selectedNewsArticle.title}</h2>
                          {selectedNewsArticle.image ? (
                            <img
                              className="phone-news-article-image"
                              src={selectedNewsArticle.image}
                              alt={selectedNewsArticle.imageAlt ?? ''}
                            />
                          ) : (
                            <div className="phone-news-image-placeholder" aria-hidden="true" />
                          )}
                          {selectedNewsArticle.body.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </article>
                      ) : (
                        <>
                          <header className="phone-news-header">
                            <span>Today</span>
                            <h2>News</h2>
                          </header>
                          <button
                            type="button"
                            className="phone-news-feature"
                            onClick={() => setSelectedNewsArticleId('preparedness')}
                          >
                            <img
                              className="phone-news-thumbnail"
                              src={newsArticles[0].thumbnail}
                              alt=""
                            />
                            <div className="phone-news-card-body">
                              <span className="phone-news-source">
                                {newsArticles[0].source}
                              </span>
                              <h3>{newsArticles[0].title}</h3>
                              <p>{newsArticles[0].summary}</p>
                            </div>
                          </button>
                          <div className="phone-news-list">
                            {newsArticles.slice(1).map((article) => (
                              <button
                                type="button"
                                key={article.id}
                                onClick={() => setSelectedNewsArticleId(article.id)}
                              >
                                <img
                                  className="phone-news-thumbnail"
                                  src={article.thumbnail}
                                  alt=""
                                />
                                <div className="phone-news-card-body">
                                  <span>{article.source}</span>
                                  <h3>{article.title}</h3>
                                  <p>{article.summary}</p>
                                </div>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ) : phoneAppView === 'shelter' ? (
                    <div
                      className={`phone-map-app ${isShelterDetailOpen ? 'has-detail' : ''}`}
                      aria-label="避難場所マップ"
                      onClick={() => {
                        if (isShelterDetailOpen) {
                          setIsShelterDetailOpen(false)
                        }
                      }}
                    >
                      <header className="phone-map-header">
                        <span>避難場所</span>
                        <h2>中央小学校</h2>
                      </header>
                      <div className="phone-map-canvas">
                        <svg
                          className="map-svg"
                          viewBox="0 0 320 420"
                          aria-hidden="true"
                        >
                          <path className="map-park" d="M18 22h118v92H18z" />
                          <path className="map-park" d="M204 66h86v118h-86z" />
                          <path className="map-park" d="M36 286h102v102H36z" />
                          <path className="map-building" d="M172 242h62v72h-62z" />
                          <path className="map-building" d="M92 148h68v48H92z" />
                          <path className="map-local-road" d="M-10 58h350" />
                          <path className="map-local-road" d="M-8 344h348" />
                          <path className="map-local-road" d="M48 -10v440" />
                          <path className="map-local-road" d="M150 -10v440" />
                          <path className="map-local-road" d="M270 -10v440" />
                          <path className="map-local-road" d="M-18 206 338 236" />
                          <path className="map-road-wide" d="M-24 264 344 178" />
                          <path className="map-road-wide" d="M92 -26 246 446" />
                          <path className="map-road-wide" d="M210 -24 72 444" />
                          <path className="map-road-wide" d="M316 -20 208 440" />
                          <path className="map-road-wide" d="M-18 118 156 176 338 112" />
                          <path className="map-road-line" d="M-24 264 344 178" />
                          <path className="map-road-line" d="M92 -26 246 446" />
                          <path className="map-road-line" d="M210 -24 72 444" />
                          <path className="map-road-line" d="M316 -20 208 440" />
                          <path className="map-road-line" d="M-18 118 156 176 338 112" />
                          <polyline
                            className="map-route-outline"
                            points="78,323 124,245 188,232 236,178 254,140"
                          />
                          <polyline
                            className="map-route-line"
                            points="78,323 124,245 188,232 236,178 254,140"
                          />
                          <text className="map-place-label" x="38" y="76">青葉公園</text>
                          <text className="map-place-label" x="213" y="104">市民広場</text>
                          <text className="map-place-label" x="181" y="282">防災倉庫</text>
                        </svg>
                        <div className="map-pin map-pin-home">
                          <span>自宅</span>
                        </div>
                        <button
                          type="button"
                          className="map-pin map-pin-shelter"
                          onClick={() => setIsShelterDetailOpen(true)}
                          aria-label="中央小学校の詳細を表示"
                        >
                          <span>避難場所</span>
                        </button>
                      </div>
                      <button
                        type="button"
                        className="phone-map-card"
                        onClick={() => setIsShelterDetailOpen(true)}
                        aria-expanded={isShelterDetailOpen}
                      >
                        <div>
                          <span>最短ルート</span>
                          <h3>中央小学校</h3>
                          <p>徒歩8分 / 約620m</p>
                        </div>
                        <strong>確認済み</strong>
                      </button>
                      {isShelterDetailOpen && (
                        <section
                          className="phone-shelter-detail"
                          aria-label="中央小学校の詳細"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <img
                            className="shelter-detail-image"
                            src={shelterSchoolImage}
                            alt="中央小学校の外観"
                          />
                          <div className="shelter-detail-header">
                            <div>
                              <span>指定避難所</span>
                              <h3>中央小学校</h3>
                            </div>
                            <button
                              type="button"
                              onClick={() => setIsShelterDetailOpen(false)}
                            >
                              閉じる
                            </button>
                          </div>
                          <dl className="shelter-detail-list">
                            <div>
                              <dt>距離</dt>
                              <dd>徒歩8分 / 約620m</dd>
                            </div>
                            <div>
                              <dt>開設状況</dt>
                              <dd>災害時に開設</dd>
                            </div>
                            <div>
                              <dt>住所</dt>
                              <dd>青葉町3-12-1</dd>
                            </div>
                            <div>
                              <dt>設備</dt>
                              <dd>体育館・校庭・給水所</dd>
                            </div>
                          </dl>
                        </section>
                      )}
                    </div>
                  ) : (
                    <div className="phone-detail-content">
                      <h2>連絡</h2>
                      <p>家族に連絡しました。</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {isPreparation && isMeasuresOpen && !isUiHidden && (
          <div className="measure-modal-overlay" role="dialog" aria-modal="true">
            <section className="measure-modal" aria-label="部屋の対策">
              <div className="measure-modal-header">
                <h2>部屋の対策</h2>
                <button
                  type="button"
                  onClick={() => {
                    setIsMeasuresOpen(false)
                    setSelectedMeasure(null)
                  }}
                >
                  戻る
                </button>
              </div>
              <p>地震が来る前に、危ない場所を確認しよう。</p>
              <div className="measure-action-list">
                {roomMeasureActions.map((action) => {
                  const isDone = roomMeasureFlags[action]

                  return (
                    <button
                      type="button"
                      key={action}
                      className={isDone ? 'is-completed' : ''}
                      onClick={() => setSelectedMeasure(action)}
                    >
                      {action}
                      {isDone ? '（実行済み）' : ''}
                    </button>
                  )
                })}
              </div>
            </section>
          </div>
        )}

        {isBackpack && !isUiHidden && (
          <>
            {backpackReturnScreen !== 'escape' && (
              <header className="game-header">
                <div className="game-header-days">{currentDayLabel}</div>
                <div className="game-header-title">リュック</div>
                <button
                  type="button"
                  className="game-header-action"
                  onClick={() => {
                    setHoveredItem(null)
                    setSelectedItem(null)
                    if (isRoomChangePreviewPending) {
                      const nextRoomChangePreviewDialogue =
                        createRoomChangePreviewDialogue(
                          isFurnitureFastenerUsed,
                          isWindowFilmUsed,
                        )

                      setIsRoomChangePreviewPending(false)
                      setRoomChangePreviewDialogue(nextRoomChangePreviewDialogue)
                      addDialogueLog(nextRoomChangePreviewDialogue)
                      setScreen('room-change-preview')
                      return
                    }

                    addDialogueLog(preparationDialogue)
                    setScreen('preparation')
                  }}
                >
                  対策に戻る
                </button>
              </header>
            )}
            <aside
              className={`inventory-panel ${
                backpackReturnScreen === 'escape' ? 'is-escape-backpack' : ''
              }`}
              aria-label="現在持っているアイテム"
            >
              {backpackReturnScreen === 'escape' && (
                <button
                  type="button"
                  className="inventory-return-button"
                  onClick={() => {
                    setHoveredItem(null)
                    setSelectedItem(null)
                    addDialogueLog(currentEscapeStep.dialogue)
                    setScreen('escape')
                  }}
                >
                  脱出に戻る
                </button>
              )}
              <h2>持っているアイテム</h2>
              <ul>
                {ownedBackpackItems.length === 0 ? (
                  <li>ショップで購入したアイテムがありません。</li>
                ) : (
                  ownedBackpackItems.map((item) => {
                    const isUsed = itemFlags[item.id].packed > 0

                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          className={isUsed ? 'is-used' : ''}
                          aria-disabled={isUsed}
                          onMouseEnter={() => setHoveredItem(item)}
                          onMouseLeave={() => setHoveredItem(null)}
                          onFocus={() => setHoveredItem(item)}
                          onBlur={() => setHoveredItem(null)}
                          onClick={() => {
                            if (isUsed) {
                              addDialogueLog({
                                speaker: 'ナレーション',
                                text: `${item.name}は使用済みです。`,
                              })
                              return
                            }

                            setSelectedItem(item)
                          }}
                        >
                          <span className="item-icon-slot" aria-hidden="true" />
                          <span className="inventory-item-name">{item.name}</span>
                        </button>
                      </li>
                    )
                  })
                )}
              </ul>
            </aside>
          </>
        )}

        {isBackpack && selectedItem && !isUiHidden && (
          <div className="confirm-modal-overlay" role="dialog" aria-modal="true">
            <section className="confirm-modal" aria-label="アイテム使用確認">
              <p>{selectedItem.name}を使用しますか？</p>
              <div className="confirm-actions">
                <button type="button" onClick={handlePackSelectedItem}>
                  はい
                </button>
                <button type="button" onClick={() => setSelectedItem(null)}>
                  いいえ
                </button>
              </div>
            </section>
          </div>
        )}

        {selectedMeasure && (
          <div className="confirm-modal-overlay" role="dialog" aria-modal="true">
            <section className="confirm-modal" aria-label="対策確認">
              <p>{selectedMeasure}を実行しますか？</p>
              <div className="confirm-actions">
                <button type="button" onClick={handleConfirmMeasure}>
                  はい
                </button>
                <button type="button" onClick={() => setSelectedMeasure(null)}>
                  いいえ
                </button>
              </div>
            </section>
          </div>
        )}

        {isLogOpen && !shouldHideGlobalControls && (
          <div className="text-log-overlay" role="dialog" aria-modal="true">
            <section className="text-log-panel" aria-label="テキストログ">
              <div className="text-log-header">
                <h2>テキストログ</h2>
                <button type="button" onClick={() => setIsLogOpen(false)}>
                  閉じる
                </button>
              </div>
              <div className="text-log-body" ref={logBodyRef}>
                {dialogueLog.map((dialogue, index) => (
                  <article
                    className="text-log-entry"
                    key={`${dialogue.speaker}-${dialogue.text}-${index}`}
                  >
                    <strong>{dialogue.speaker}</strong>
                    <p>{dialogue.text}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        )}

        {isResultReview && (
          <section className="result-review-panel" aria-label="今回の振り返り">
            <h2>今回の振り返り</h2>
            <div className="review-summary" aria-label="対策の実施状況">
              <div>
                <span>購入済みアイテム</span>
                <strong>{ownedBackpackItems.length}種類</strong>
              </div>
              <div>
                <span>部屋対策</span>
                <strong>{completedRoomMeasureCount}件</strong>
              </div>
              <div>
                <span>家族連絡</span>
                <strong>{storyFlags.contactedFamily ? '済み' : '未実施'}</strong>
              </div>
              <div>
                <span>避難場所確認</span>
                <strong>{storyFlags.checkedShelter ? '済み' : '未実施'}</strong>
              </div>
            </div>
            <div className="review-columns">
              <section>
                <h3>足りなかった備え</h3>
                <ul>
                  <li>家具が固定されておらず、通路がふさがれた</li>
                  <li>暗い中で足元を確認するライトがなかった</li>
                  <li>ガラスや散乱物の上を歩く準備がなかった</li>
                </ul>
              </section>
              <section>
                <h3>よかった点</h3>
                <ul>
                  <li>地震の可能性を知り、対策を考え始めた</li>
                  <li>部屋や持ち物に目を向けるきっかけができた</li>
                </ul>
              </section>
            </div>
            <div className="panel-actions">
              <button type="button" onClick={handleNextDialogue}>
                次へ
              </button>
            </div>
          </section>
        )}

        {isRealLifeMessage && (
          <section className="real-life-panel" aria-label="現実で確認すること">
            <h2>現実のあなたへ</h2>
            <p>
              予告がなくても、今日できる確認があります。まずは自分の部屋を一度だけ見回してみてください。
            </p>
            <ul>
              <li>寝る場所の近くに、倒れそうな家具はないか</li>
              <li>玄関までの通路が、物や家具でふさがれないか</li>
              <li>暗い中でも使えるライトや靴が手に届く場所にあるか</li>
            </ul>
            <div className="panel-actions">
              <button type="button" onClick={handleNextDialogue}>
                次へ
              </button>
            </div>
          </section>
        )}

        {isEndingActions && (
          <section className="ending-actions-panel" aria-label="終了選択">
            <h2>これからどうする？</h2>
            <p>
              もう一度試すか、ここで終えるかを選んでください。
            </p>
            <div className="ending-action-buttons">
              <button type="button" onClick={resetGame}>
                もう一度プレイ
              </button>
              <button
                type="button"
                onClick={() => setIsQuitMessageVisible(true)}
              >
                ゲームをやめる
              </button>
            </div>
            {isQuitMessageVisible && (
              <p className="ending-quit-message">
                プレイしてくれてありがとうございました。画面を閉じる前に、身の回りを一度見直してみてください。
              </p>
            )}
          </section>
        )}

        {!isStart &&
          !isEndingActions &&
          !isResultReview &&
          !isRealLifeMessage &&
          !areEscapeRouteChoicesVisible && (
          <button
            type="button"
            className={`message-box ${
              isUiHidden && !shouldHideGlobalControls ? 'is-hidden' : ''
            }`}
            onClick={handleMessageBoxClick}
            aria-label={canAdvanceDialogue ? '次のセリフへ進む' : '自由行動を選ぶ'}
          >
            <span className="nameplate">{currentDialogue.speaker}</span>
            <span className="dialogue-text">{currentDialogue.text}</span>
            <span className="next-mark">
              {canAdvanceDialogue ? '▼' : ''}
            </span>
          </button>
        )}
      </section>
    </main>
  )
}

export default App

//　これはコメントアウトされた古いコードです。新しいコードは上記の通りです。菊池駿一
// import { useEffect, useRef, useState } from 'react'
// import backpackBackground from './assets/backgrounds/リュック画面.png'
// import bookWarningBackground from './assets/backgrounds/予告本画面.png'
// import normalRoomBackground from './assets/backgrounds/通常部屋画面.png'
// import backpackIcon from './assets/icons/リュックicon.png'
// import shopIcon from './assets/icons/ショップicon.png'
// import './App.css'
// import ShopScreen from './screens/ShopScreen'

// type Screen = 'book-warning' | 'room-intro' | 'preparation' | 'backpack' | 'shop'

// type Dialogue = {
//   speaker: string
//   text: string
// }

// const bookWarningDialogues: Dialogue[] = [
//   {
//     speaker: '主人公',
//     text: '……なんだ、この本。',
//   },
//   {
//     speaker: '主人公',
//     text: '『ワイが見た未来』……？',
//   },
//   {
//     speaker: '主人公',
//     text: '三日後、この街で大きな地震が起こる……って書いてある。',
//   },
//   {
//     speaker: '主人公',
//     text: 'ただの作り話だよな。でも、なぜか嫌な感じがする。',
//   },
//   {
//     speaker: '主人公',
//     text: '何か、今のうちにできることをしておいた方がいいかもしれない。',
//   },
// ]

// const roomDialogue: Dialogue = {
//   speaker: 'ナレーション',
//   text: '地震が起こるとされる日まで、あと3日。何をするか選ぼう。',
// }

// const roomIntroDialogues: Dialogue[] = [
//   {
//     speaker: '主人公',
//     text: '……いつもの部屋なのに、さっきの本のことが頭から離れない。',
//   },
//   {
//     speaker: '主人公',
//     text: 'もし本当に地震が来るなら、今のうちにできることを考えないと。',
//   },
// ]
// // 追加：購入済みアイテムの管理この管理は0か1で持っているか管理する
// const backpackItems = [
//   {
//     id: 'water',
//     name: '飲料水',
//     description: '地震後に水分を確保するための大切な備え。',
//   },
//   {
//     id: 'emergency-food',
//     name: '非常食セット',
//     description: '避難後や停電時でも食べられる食料。',
//   },
//   {
//     id: 'flashlight',
//     name: '懐中電灯',
//     description: '停電した部屋や夜の避難で足元を照らせる。',
//   },
//   {
//     id: 'power-bank',
//     name: 'モバイルバッテリー',
//     description: 'スマホの充電を保ち、連絡や情報確認を続けられる。',
//   },
//   {
//     id: 'first-aid-kit',
//     name: '救急セット',
//     description: '軽いけがをしたときに応急処置ができる。',
//   },
//   {
//     id: 'furniture-fasteners',
//     name: '家具固定器具',
//     description: '棚や家具を固定して、揺れで倒れる危険を減らせる。',
//   },
//   {
//     id: 'window-film',
//     name: '窓ガラス飛散防止フィルム',
//     description: '割れたガラスが飛び散るのを防ぎ、けがをしにくくする。',
//   },
//   {
//     id: 'radio',
//     name: '携帯ラジオ',
//     description: '停電や通信障害のときでも避難情報を確認できる。',
//   },
//   {
//     id: 'gloves-slippers',
//     name: '軍手・厚底スリッパ',
//     description: '割れたガラスや散乱物の上を歩くときに足元を守れる。',
//   },
//   {
//     id: 'canned-food',
//     name: '缶詰',
//     description: '火や水が使えない状況でも食べられる保存食。',
//   },
//   {
//     id: 'nutrition-supplements',
//     name: '栄養補助食品',
//     description: '短時間で食べられて、避難中の体力を保ちやすい。',
//   },
//   {
//     id: 'retort-pizza',
//     name: '冷凍ピザ',
//     description: '自宅に残る場合や避難生活で役立つ備蓄食。',
//   },
//   {
//     id: 'portable-toilet',
//     name: '白米',
//     description: '断水したときや避難所でトイレに困りにくくなる。',
//   },
//   {
//     id: 'medication',
//     name: '痛み止め',
//     description: '体調不良や持病がある場合に欠かせない備え。',
//   },
//   {
//     id: 'disinfectant',
//     name: '消毒液・ウェットシート',
//     description: '手や傷口を清潔にして、衛生状態を保ちやすくする。'
//   },
//   {
//     id: 'mask',
//     name: 'マスク',
//     description: '粉じんや避難所での衛生対策に使える。',
//   },
//   {
//     id: 'thermometer',
//     name: '体温計',
//     description: '避難中や避難所で体調を確認するときに役立つ。',
//   },
//   {
//     id: 'cooling-blanket',
//     name: '冷却シート・保温シート',
//     description: '暑さや寒さから体を守り、避難生活の負担を減らせる。',
//   },
// ]

// function App() {
//   const [screen, setScreen] = useState<Screen>('book-warning')
//   const [dialogueIndex, setDialogueIndex] = useState(0)
//   const [roomIntroIndex, setRoomIntroIndex] = useState(0)
//   const [isTransitioning, setIsTransitioning] = useState(false)
//   const [transitionText, setTransitionText] = useState<string | null>(null)
//   const [hoveredAction, setHoveredAction] = useState<string | null>(null)
//   const [hoveredItem, setHoveredItem] = useState<(typeof backpackItems)[number] | null>(
//     null,
//   )
//   const [selectedItem, setSelectedItem] = useState<(typeof backpackItems)[number] | null>(
//     null,
//   )
//   const [isUiHidden, setIsUiHidden] = useState(false)
//   const [isLogOpen, setIsLogOpen] = useState(false)
//   const [dialogueLog, setDialogueLog] = useState<Dialogue[]>([
//     bookWarningDialogues[0],
//   ])
//   const logBodyRef = useRef<HTMLDivElement | null>(null)

//   const isBookWarning = screen === 'book-warning'
//   const isRoomIntro = screen === 'room-intro'
//   const isPreparation = screen === 'preparation'
//   const isBackpack = screen === 'backpack'
//   const isShop = screen === 'shop'
//   const currentDialogue = isBookWarning
//     ? bookWarningDialogues[dialogueIndex]
//     : isRoomIntro
//       ? roomIntroDialogues[roomIntroIndex]
//       : hoveredAction === 'shop'
//         ? {
//             speaker: 'ナレーション',
//             text: 'ショップに行きますか？',
//           }
//         : hoveredAction === 'backpack'
//           ? {
//               speaker: 'ナレーション',
//               text: 'リュックを整理しますか？',
//             }
//           : hoveredAction === 'phase'
//             ? {
//                 speaker: 'ナレーション',
//                 text: '何か対策をしよう。',
//               }
//             : hoveredAction === 'days-left'
//               ? {
//                   speaker: '主人公',
//                   text: 'あと三日で地震が起こるはず……何か対策しないと。',
//                 }
//               : isBackpack
//                 ? selectedItem
//                   ? {
//                       speaker: 'ナレーション',
//                       text: `${selectedItem.name}を使いますか？`,
//                     }
//                   : hoveredItem
//                     ? {
//                         speaker: hoveredItem.name,
//                         text: hoveredItem.description,
//                       }
//                     : {
//                         speaker: 'ナレーション',
//                         text: '持っているものを確認して、非常用リュックに入れる準備をしよう。',
//                       }
//                 : roomDialogue
//   const isLastBookDialogue =
//     isBookWarning && dialogueIndex === bookWarningDialogues.length - 1
//   const isLastRoomIntroDialogue =
//     isRoomIntro && roomIntroIndex === roomIntroDialogues.length - 1

//   useEffect(() => {
//     if (isLogOpen && logBodyRef.current) {
//       logBodyRef.current.scrollTop = logBodyRef.current.scrollHeight
//     }
//   }, [isLogOpen, dialogueLog])

//   const addDialogueLog = (dialogue: Dialogue) => {
//   setDialogueLog((current) => {
//     const latest = current.at(-1)

//     if (latest?.speaker === dialogue.speaker && latest.text === dialogue.text) {
//       return current
//     }

//     return [...current, dialogue]
//   })
// }

// // 追加：購入アイテム管理
// const buyItem = (itemId: string) => {
//   setPurchasedItems((current) => {
//     if (current.includes(itemId)) {
//       return current
//     }

//     return [...current, itemId]
//   })
// }

// // 追加：購入済み判定
// const hasPurchasedItem = (itemId: string) => {
//   return purchasedItems.includes(itemId)
// }

//   const handleNextDialogue = () => {
//     if (isTransitioning) {
//       return
//     }

//     if (isBookWarning && isLastBookDialogue) {
//       setIsTransitioning(true)

//       window.setTimeout(() => {
//         setScreen('room-intro')
//         setDialogueIndex(0)
//         addDialogueLog(roomIntroDialogues[0])
//       }, 140)

//       window.setTimeout(() => {
//         setIsTransitioning(false)
//       }, 520)

//       return
//     }

//     if (isBookWarning) {
//       const nextIndex = dialogueIndex + 1

//       setDialogueIndex(nextIndex)
//       addDialogueLog(bookWarningDialogues[nextIndex])
//       return
//     }

//     if (isRoomIntro && isLastRoomIntroDialogue) {
//       setTransitionText('-対策フェーズ開始-')
//       setIsTransitioning(true)

//       window.setTimeout(() => {
//         setScreen('preparation')
//         setRoomIntroIndex(0)
//         addDialogueLog(roomDialogue)
//       }, 140)

//       window.setTimeout(() => {
//         setIsTransitioning(false)
//         setTransitionText(null)
//       }, 620)

//       return
//     }

//     if (isRoomIntro) {
//       const nextIndex = roomIntroIndex + 1

//       setRoomIntroIndex(nextIndex)
//       addDialogueLog(roomIntroDialogues[nextIndex])
//     }
//   }

//   if (isShop) {
//     return (
//       <ShopScreen
//         onBack={() => {
//           addDialogueLog(roomDialogue)
//           setScreen('preparation')
//         }}
//         onBuy={(itemId) => {
//           addDialogueLog({
//             speaker: 'ナレーション',
//             text: `${itemId}を購入した。`,
//           })
//         }}
//       />
//     )
//   }

//   return (
//     <main className="game-screen">
//       <section
//         className="scene"
//         style={{
//           backgroundImage: `url(${
//             isBookWarning
//               ? bookWarningBackground
//               : isBackpack
//                 ? backpackBackground
//                 : normalRoomBackground
//           })`,
//         }}
//         aria-label={
//           isBookWarning
//             ? '予告本を見る場面'
//             : isBackpack
//               ? 'リュックを整理する場面'
//               : '主人公の部屋'
//         }
//       >
//         <div
//           className={`scene-transition ${isTransitioning ? 'is-active' : ''}`}
//           aria-hidden="true"
//         >
//           {transitionText && (
//             <strong className="transition-title">{transitionText}</strong>
//           )}
//         </div>

//         <button
//           type="button"
//           className="ui-toggle"
//           onClick={() => setIsUiHidden((current) => !current)}
//         >
//           {isUiHidden ? 'UI表示' : 'UI非表示'}
//         </button>

//         {!isUiHidden && (
//           <button
//             type="button"
//             className={`log-toggle ${isBackpack ? 'is-backpack' : ''}`}
//             onClick={() => setIsLogOpen(true)}
//           >
//             テキストログ
//           </button>
//         )}

//         {isPreparation && !isUiHidden && (
//           <>
//             <header className="game-header">
//               <div
//                 className="game-header-days"
//                 onMouseEnter={() => setHoveredAction('days-left')}
//                 onMouseLeave={() => setHoveredAction(null)}
//                 onFocus={() => setHoveredAction('days-left')}
//                 onBlur={() => setHoveredAction(null)}
//                 tabIndex={0}
//                 aria-label="地震発生までの残り日数"
//               >
//                 災害まで3日
//               </div>
//               <div
//                 className="game-header-title"
//                 onMouseEnter={() => setHoveredAction('phase')}
//                 onMouseLeave={() => setHoveredAction(null)}
//                 onFocus={() => setHoveredAction('phase')}
//                 onBlur={() => setHoveredAction(null)}
//                 tabIndex={0}
//                 aria-label="現在のフェーズ"
//               >
//                 対策フェーズ中
//               </div>
//               <div className="game-header-action" aria-hidden="true" />
//             </header>
//             <div className="action-icons" aria-label="対策行動">
//               <button
//                 type="button"
//                 className="action-icon-button"
//                 onMouseEnter={() => setHoveredAction('shop')}
//                 onMouseLeave={() => setHoveredAction(null)}
//                 onFocus={() => setHoveredAction('shop')}
//                 onBlur={() => setHoveredAction(null)}
//                 onClick={() => {
//                   setHoveredAction(null)
//                   addDialogueLog({
//                     speaker: 'ナレーション',
//                     text: 'ショップで必要な防災用品を確認しよう。',
//                   })
//                   setScreen('shop')
//                 }}
//               >
//                 <img src={shopIcon} alt="" />
//                 <span>ショップ</span>
//               </button>
//               <button
//                 type="button"
//                 className="action-icon-button"
//                 onMouseEnter={() => setHoveredAction('backpack')}
//                 onMouseLeave={() => setHoveredAction(null)}
//                 onFocus={() => setHoveredAction('backpack')}
//                 onBlur={() => setHoveredAction(null)}
//                 onClick={() => {
//                   setHoveredAction(null)
//                   addDialogueLog({
//                     speaker: 'ナレーション',
//                     text: '持っているものを確認して、非常用リュックに入れる準備をしよう。',
//                   })
//                   setScreen('backpack')
//                 }}
//               >
//                 <img src={backpackIcon} alt="" />
//                 <span>リュック</span>
//               </button>
//             </div>
//           </>
//         )}

//         {isBackpack && !isUiHidden && (
//           <>
//             <header className="game-header">
//               <div className="game-header-days">災害まで3日</div>
//               <div className="game-header-title">リュック</div>
//               <button
//                 type="button"
//                 className="game-header-action"
//                 onClick={() => {
//                   setHoveredItem(null)
//                   setSelectedItem(null)
//                   addDialogueLog(roomDialogue)
//                   setScreen('preparation')
//                 }}
//               >
//                 対策に戻る
//               </button>
//             </header>
//             <aside className="inventory-panel" aria-label="現在持っているアイテム">
//               <h2>持っているアイテム</h2>
//               <ul>
//                 {backpackItems.map((item) => (
//                   <li key={item.name}>
//                     <button
//                       type="button"
//                       onMouseEnter={() => setHoveredItem(item)}
//                       onMouseLeave={() => setHoveredItem(null)}
//                       onFocus={() => setHoveredItem(item)}
//                       onBlur={() => setHoveredItem(null)}
//                       onClick={() => {
//                         setSelectedItem(item)
//                         addDialogueLog({
//                           speaker: 'ナレーション',
//                           text: `${item.name}を使いますか？`,
//                         })
//                       }}
//                     >
//                       <span className="item-icon-slot" aria-hidden="true" />
//                       <span>{item.name}</span>
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </aside>
//           </>
//         )}

//         {isBackpack && selectedItem && !isUiHidden && (
//           <div className="confirm-actions" aria-label="アイテム使用確認">
//             <button type="button" onClick={() => setSelectedItem(null)}>
//               はい
//             </button>
//             <button type="button" onClick={() => setSelectedItem(null)}>
//               いいえ
//             </button>
//           </div>
//         )}

//         {isLogOpen && (
//           <div className="text-log-overlay" role="dialog" aria-modal="true">
//             <section className="text-log-panel" aria-label="テキストログ">
//               <div className="text-log-header">
//                 <h2>テキストログ</h2>
//                 <button type="button" onClick={() => setIsLogOpen(false)}>
//                   閉じる
//                 </button>
//               </div>
//               <div className="text-log-body" ref={logBodyRef}>
//                 {dialogueLog.map((dialogue, index) => (
//                   <article
//                     className="text-log-entry"
//                     key={`${dialogue.speaker}-${dialogue.text}-${index}`}
//                   >
//                     <strong>{dialogue.speaker}</strong>
//                     <p>{dialogue.text}</p>
//                   </article>
//                 ))}
//               </div>
//             </section>
//           </div>
//         )}

//         <button
//           type="button"
//           className={`message-box ${isUiHidden ? 'is-hidden' : ''}`}
//           onClick={handleNextDialogue}
//           aria-label={isBookWarning ? '次のセリフへ進む' : '自由行動を選ぶ'}
//         >
//           <span className="nameplate">{currentDialogue.speaker}</span>
//           <span className="dialogue-text">{currentDialogue.text}</span>
//           <span className="next-mark">
//             {isBookWarning || isRoomIntro ? '▼' : ''}
//           </span>
//         </button>
//       </section>
//     </main>
//   )
// }

// export default App
