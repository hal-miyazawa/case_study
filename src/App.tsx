import { useEffect, useMemo, useRef, useState } from 'react'
import badEndBackground from './assets/backgrounds/BadEnd.png'
import afterDisasterBackground from './assets/backgrounds/災害後画面.png'
import backpackBackground from './assets/backgrounds/リュック画面.png'
import backpackEscapeBackground from './assets/backgrounds/リュック画面脱出.png'
import bookWarningBackground from './assets/backgrounds/予告本画面.png'
import fixedAfterDisasterBackground from './assets/backgrounds/固定器具使用災害後画面.png'
import fixedNormalRoomBackground from './assets/backgrounds/固定器具使用通常部屋画面.png'
import measureBooksBackground from './assets/backgrounds/本だなの中身.png'
import measureBooksTopBackground from './assets/backgrounds/本棚上.jpg'
import measureMedicineBackground from './assets/backgrounds/薬.png'
import measureTvBackground from './assets/backgrounds/テレビ倒す.jpg'
import fixedMeasureBooksBackground from './assets/backgrounds/本棚の中身(固定器具付き).png'
import fixedMeasureBooksTopBackground from './assets/backgrounds/本棚上おろしたやつ(固定器具付き).png'
import fixedMeasureMedicineBackground from './assets/backgrounds/薬おろしたやつ(固定器具付き).png'
import fixedMeasureTvBackground from './assets/backgrounds/テレビ倒す(固定器具付き).png'
import panicRoadBackground from './assets/backgrounds/焦り道.png'
import panicRoadNightBackground from './assets/backgrounds/焦り道_夜.png'
import panicRoadBackground1 from './assets/backgrounds/焦り道1.png'
import panicRoadNightBackground1 from './assets/backgrounds/焦り道1_夜.png'
import panicRoadBackground2 from './assets/backgrounds/焦り道2.png'
import panicRoadNightBackground2 from './assets/backgrounds/焦り道2_夜.png'
import panicRoadBackground3 from './assets/backgrounds/焦り道3.png'
import panicRoadNightBackground3 from './assets/backgrounds/焦り道3_夜.png'
import noWaterPanicRoadNightBackground from './assets/backgrounds/水なし焦り道_夜.png'
import noWaterPanicRoadBackground1 from './assets/backgrounds/水なし焦り道1.png'
import noWaterPanicRoadNightBackground1 from './assets/backgrounds/水なし焦り道1_夜.png'
import noWaterPanicRoadBackground2 from './assets/backgrounds/水なし焦り道2.png'
import noWaterPanicRoadBackground3 from './assets/backgrounds/水なし焦り道3.png'
import noWaterPanicRoadBackground4 from './assets/backgrounds/水なし焦り道4.png'
import normalEndBackground from './assets/backgrounds/normalEnd.png'
import hotBloodNormalEndBackground from './assets/backgrounds/熱血END.png'
import evacuationGuideBackground from './assets/backgrounds/避難案内板.png'
import evacuationGuideLightBackground from './assets/backgrounds/避難案内板_ライト.png'
import evacuationGuideNightBackground from './assets/backgrounds/避難案内板_夜.png'
import radioUseBackground from './assets/backgrounds/ラジオ使用.png'
import radioUseNightBackground from './assets/backgrounds/ラジオ使用_夜.png'
import hotBloodEndBackground from './assets/backgrounds/熱血エンド.png'
import hotBloodEndBackground1 from './assets/backgrounds/熱血エンド1.png'
import noFoodNightBackground from './assets/backgrounds/脱出画面_夜.png'
import noFoodNightBackground2 from './assets/backgrounds/脱出画面2_夜.png'
import noFoodNightBackground3 from './assets/backgrounds/脱出画面3_夜.png'
import noFoodNightSafeRoadBackground from './assets/backgrounds/安全道_夜.png'
import narrowDangerRoadBackground from './assets/backgrounds/細い危険道.png'
import narrowDangerRoadLightBackground from './assets/backgrounds/細い危険道_ライト.png'
import narrowDangerRoadNightBackground from './assets/backgrounds/細い危険道_夜.png'
import escapeScreen25Background from './assets/backgrounds/2.5/脱出画面2.5.png'
import escapeScreen25LightBackground from './assets/backgrounds/2.5/脱出画面2.5_ライト.png'
import escapeScreen25NightBackground from './assets/backgrounds/2.5/脱出画面2.5_夜.png'
import escapeScreen25CrackBackground from './assets/backgrounds/2.5/脱出画面2.5_地割れ.png'
import escapeScreen25CrackLightBackground from './assets/backgrounds/2.5/脱出画面2.5_地割れ_ライト.png'
import escapeScreen25CrackNightBackground from './assets/backgrounds/2.5/脱出画面2.5_地割れ_夜.png'
import escapeScreen25ForkBackground from './assets/backgrounds/2.5/分かれ道.png'
import escapeScreen25ForkLightBackground from './assets/backgrounds/2.5/分かれ道_ライト.png'
import escapeScreen25ForkNightBackground from './assets/backgrounds/2.5/分かれ道_夜.png'
import escapeScreen25ForkRightBackground from './assets/backgrounds/2.5/分かれ道_右.png'
import escapeScreen25ForkRightLightBackground from './assets/backgrounds/2.5/分かれ道_右_ライト.png'
import escapeScreen25ForkRightNightBackground from './assets/backgrounds/2.5/分かれ道_右_夜.png'
import escapeScreen25ForkLeftBackground from './assets/backgrounds/2.5/分かれ道_左.png'
import escapeScreen25FriendJoinBackground from './assets/backgrounds/2.5/友人合流.png'
import escapeScreen25FriendJoinNightBackground from './assets/backgrounds/2.5/友人合流_夜.png'
import escapeScreen25FriendEvacuationBackground from './assets/backgrounds/2.5/友人避難.png'
import escapeScreen25FriendEvacuationNightBackground from './assets/backgrounds/2.5/友人避難_夜.png'
import escapeScreen25FriendSchoolBackground from './assets/backgrounds/2.5/友人学校到着.png'
import escapeScreen25FriendSchoolNightBackground from './assets/backgrounds/2.5/友人学校到着_夜.png'
import escapeScreen25UfoBackground from './assets/backgrounds/2.5/UFO.png'
import escapeScreen25UfoBackground1 from './assets/backgrounds/2.5/UFO1.png'
import escapeScreen25UfoBackground2 from './assets/backgrounds/2.5/UFO2.png'
import escapeScreen25UfoBackground3 from './assets/backgrounds/2.5/UFO3.png'
import ufoEndBackground from './assets/backgrounds/UFOEND.png'
import friendsEndBackground from './assets/backgrounds/FriendsEnd.png'
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
import phoneMapAppIcon from './assets/backgrounds/phone/Map_app_icon.png'
import phoneMessageAppIcon from './assets/backgrounds/phone/Message_app_icon.png'
import phoneNewsAppIcon from './assets/backgrounds/phone/News_app_icon.png'
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
import specialEndBgm from './assets/bgm/特殊エンド曲.wav'
import shelterArrivalSound from './assets/bgm/避難所到着.mp3'
import itemUseSound from './assets/bgm/アイテム使用音.mp3'
import drinkSound from './assets/bgm/飲む.mp3'
import eatSound from './assets/bgm/食べる.mp3'
import radioSound from './assets/bgm/ラジオ音.mp3'
import ufoInsideSound from './assets/bgm/UFO内音.mp3'
import ufoSuctionSound from './assets/bgm/UFO吸い込み音.mp3'
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
import { shopItemIcons } from './data/shopItemIcons'
import './App.css'
import { EscapeControls } from './features/escape/EscapeControls'
import { initialEscapeDialogue } from './features/escape/escapeSteps'
import type { EscapeStepId } from './features/escape/types'
import { useEscapeFlow } from './features/escape/useEscapeFlow'
import ShopScreen, { type ItemId } from './screens/ShopScreen'

type Screen =
  | 'start'
  | 'zoom-calibration'
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
  | 'normal-end'
  | 'ufo-end'
  | 'friends-end'
  | 'result-review'
  | 'real-life-message'
  | 'ending-actions'

type StoryDay = 0 | 1
type EndKind = 'true' | 'normal' | 'hot-blood' | 'bad' | 'ufo' | 'friends'
type ReviewMode = 'chart' | 'text'

type Dialogue = {
  speaker: string
  text: string
}

const MAX_DIALOGUE_TEXT_LENGTH = 28

const splitDialogueText = (text: string) => {
  const characters = Array.from(text)

  if (characters.length <= MAX_DIALOGUE_TEXT_LENGTH) {
    return [text]
  }

  const pages: string[] = []
  let startIndex = 0

  while (startIndex < characters.length) {
    const remainingCharacters = characters.length - startIndex

    if (remainingCharacters <= MAX_DIALOGUE_TEXT_LENGTH) {
      pages.push(characters.slice(startIndex).join('').trim())
      break
    }

    const chunk = characters.slice(
      startIndex,
      startIndex + MAX_DIALOGUE_TEXT_LENGTH,
    )
    const breakCandidates = ['。', '！', '？', '、', '，', ' ']
    let breakLength = MAX_DIALOGUE_TEXT_LENGTH

    for (const delimiter of breakCandidates) {
      const delimiterIndex = chunk.lastIndexOf(delimiter)

      if (delimiterIndex >= 8) {
        breakLength = delimiterIndex + 1
        break
      }
    }

    pages.push(characters.slice(startIndex, startIndex + breakLength).join('').trim())
    startIndex += breakLength

    while (characters[startIndex] === ' ') {
      startIndex += 1
    }
  }

  return pages.filter((page) => page.length > 0)
}

const zoomCalibrationDialogues: Dialogue[] = [
  {
    speaker: 'ガイド',
    text: '画面の拡大率を調整してください。',
  },
  {
    speaker: 'ガイド',
    text: 'Ctrl + - / Ctrl + + でも拡大率を変更できます。',
  },
]

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

type EscapeGuideTarget = 'progress' | 'water' | 'food' | 'light'

type EscapeGuideStep = {
  target: EscapeGuideTarget
  dialogue: Dialogue
}

type EscapeGuideKind = 'initial' | 'light'

type PhoneAppView = 'home' | 'contact' | 'news' | 'shelter'
type ContactId = 'mother' | 'friend' | 'relative'
type NewsArticleId = 'preparedness' | 'station-drill' | 'prediction-day' | 'weather'

type MapPoint = {
  x: number
  y: number
}

type EscapeMapLocation = MapPoint & {
  label: string
  status: string
  reconnectTo?: EscapeStepId | 'shelter'
}

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
type EscapeScreen25Stage =
  | 'intro'
  | 'intro-observe'
  | 'intro-notification'
  | 'choices'
  | 'shelter-start'
  | 'shelter-caution'
  | 'crack'
  | 'crack-blocked'
  | 'fork-intro'
  | 'fork-choices'
  | 'right-road'
  | 'right-road-check'
  | 'right-road-school'
  | 'friend-wait'
  | 'friend-join'
  | 'friend-evacuation'
  | 'friend-arrival'
  | 'ufo-left'
  | 'ufo-left-silence'
  | 'ufo-left-sign'
  | 'ufo-glow'
  | 'ufo-glow-close'
  | 'ufo-overlook'
  | 'ufo-overlook-float'
  | 'ufo-pulled'
  | 'ufo-pulled-resist'
  | 'ufo-aboard'
  | 'ufo-aboard-look'
  | 'ufo-meet'
  | 'ufo-stop'
  | null
type EscapePhonePowerState = 'normal' | 'dead' | 'charging' | 'charged'
type EscapePhonePromptStage =
  | 'dead'
  | 'phone-unavailable'
  | 'backpack'
  | 'charging-wait'
  | 'panic'
  | 'water-backpack'
  | 'after-water'
  | 'radio-choice'
  | 'radio-use'
  | 'sign-found'
  | 'thirst-wandering'
  | 'thirst-aftermath'
  | 'food-backpack'
  | 'after-food'
  | 'after-food-energy'
  | 'after-food-search'
  | 'after-food-sign-search'
  | 'night-sign-found'
  | 'danger-road'
  | 'injury'
  | 'injury-no-treatment'
  | 'injury-backpack'
  | 'last-push-backpack'
  | 'last-push'
  | 'hot-blood-run'
  | 'no-food-panic'
  | null
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
  image: string
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

const roomMeasureResultDialogues: Record<string, Dialogue> = {
  本棚の上のものをおろす: {
    speaker: 'ナレーション',
    text: '本棚の上の重い物を下ろした。揺れても頭上から物が落ちにくくなった。',
  },
  テレビを倒す: {
    speaker: 'ナレーション',
    text: 'テレビをあらかじめ倒しておいた。揺れで飛び出して通路をふさぐ危険が減った。',
  },
  薬をおろす: {
    speaker: 'ナレーション',
    text: '高い場所の薬を手の届く場所へ移した。揺れたあとでも必要な薬を取りやすくなった。',
  },
  本をおろす: {
    speaker: 'ナレーション',
    text: '棚の本を下ろして床にまとめた。落下物が減り、避難する足元を確保しやすくなった。',
  },
}

const roomMeasureBackgrounds: Record<string, string> = {
  本棚の上のものをおろす: measureBooksTopBackground,
  テレビを倒す: measureTvBackground,
  薬をおろす: measureMedicineBackground,
  本をおろす: measureBooksBackground,
}

const fixedRoomMeasureBackgrounds: Record<string, string> = {
  本棚の上のものをおろす: fixedMeasureBooksTopBackground,
  テレビを倒す: fixedMeasureTvBackground,
  薬をおろす: fixedMeasureMedicineBackground,
  本をおろす: fixedMeasureBooksBackground,
}

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
    preview: '地震？ そんな急に来るか？',
    time: '09:48',
    messages: [
      { from: 'them', text: '地震？ そんな急に来るか？' },
      { from: 'me', text: 'わからないけど、少し嫌な感じがする。備えだけはしておきたい。' },
      { from: 'them', text: 'まあ、お前がそこまで言うなら自分も避難場所くらい見ておくわ。' },
    ],
    quickReplies: [
      {
        text: '何かあったら合流しよう',
        response: '本当に来たらな。まあ、その時は連絡する。避難場所も見ておくわ。',
      },
      {
        text: '避難場所だけ確認して',
        response: 'わかった。半信半疑だけど、お前が言うなら確認しとく。',
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
    text: '明日、この街で大きな地震が起こる……',
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
  day === 0 ? '災害当日' : '災害前日'

const getPreparationDialogue = (day: StoryDay): Dialogue => {
  if (day === 0) {
    return {
      speaker: 'ナレーション',
      text: '災害当日になった。もう行動を急ごう。',
    }
  }

  return {
    speaker: 'ナレーション',
    text: '明日、地震が起こるらしい。今できる対策を一つ選ぼう。',
  }
}

const nightDialoguesByDay: Record<1, Dialogue[]> = {
  1: [
    {
      speaker: '主人公',
      text: '明日、本当に地震が来るかもしれない。今日はもう寝よう。',
    },
    {
      speaker: 'ナレーション',
      text: 'できる範囲の備えを終え、不安を残したまま眠りについた。',
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

const normalEndDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'Normal End。最後まであきらめず、避難所へたどり着いた。',
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
  text: 'この物語では、主人公は翌日の地震を知っていました。でも現実では、いつ起こるかは分かりません。',
}

const backpackItems: BackpackItem[] = [
  {
    id: 'water',
    name: '飲料水',
    image: shopItemIcons.water,
    description: '地震後に水分を確保するための大切な備え。',
  },
  {
    id: 'emergency-food',
    name: '非常食セット',
    image: shopItemIcons['emergency-food'],
    description: '避難後や停電時でも食べられる食料。',
  },
  {
    id: 'flashlight',
    name: '懐中電灯',
    image: shopItemIcons.flashlight,
    description: '停電した部屋や夜の避難で足元を照らせる。',
  },
  {
    id: 'power-bank',
    name: 'モバイルバッテリー',
    image: shopItemIcons['power-bank'],
    description: 'スマホの充電を保ち、連絡や情報確認を続けられる。',
  },
  {
    id: 'first-aid-kit',
    name: '救急セット',
    image: shopItemIcons['first-aid-kit'],
    description: '軽いけがをしたときに応急処置ができる。',
  },
  {
    id: 'furniture-fasteners',
    name: '家具固定器具',
    image: shopItemIcons['furniture-fasteners'],
    description: '棚や家具を固定して、揺れで倒れる危険を減らせる。',
  },
  {
    id: 'window-film',
    name: '窓ガラス飛散防止フィルム',
    image: shopItemIcons['window-film'],
    description: '割れたガラスが飛び散るのを防ぎ、けがをしにくくする。',
  },
  {
    id: 'radio',
    name: '携帯ラジオ',
    image: shopItemIcons.radio,
    description: '停電や通信障害のときでも避難情報を確認できる。',
  },
  {
    id: 'gloves-slippers',
    name: '軍手・厚底スリッパ',
    image: shopItemIcons['gloves-slippers'],
    description: '割れたガラスや散乱物の上を歩くときに足元を守れる。',
  },
  {
    id: 'canned-food',
    name: '缶詰',
    image: shopItemIcons['canned-food'],
    description: '火や水が使えない状況でも食べられる保存食。',
  },
  {
    id: 'nutrition-supplements',
    name: '栄養補助食品',
    image: shopItemIcons['nutrition-supplements'],
    description: '短時間で食べられて、避難中の体力を保ちやすい。',
  },
  {
    id: 'retort-rice',
    name: 'レトルトご飯・保存食',
    image: shopItemIcons['retort-rice'],
    description: '自宅に残る場合や避難生活で役立つ備蓄食。',
  },
  {
    id: 'portable-toilet',
    name: '生米',
    image: shopItemIcons['portable-toilet'],
    description: '白米はおいしい！元気が出る！',
  },
  {
    id: 'medication',
    name: '頭痛薬',
    image: shopItemIcons.medication,
    description: '体調不良や持病がある場合に欠かせない備え。',
  },
  {
    id: 'disinfectant',
    name: '消毒液・ウェットシート',
    image: shopItemIcons.disinfectant,
    description: '手や傷口を清潔にして、衛生状態を保ちやすくする。',
  },
  {
    id: 'mask',
    name: 'マスク',
    image: shopItemIcons.mask,
    description: '粉じんや避難所での衛生対策に使える。',
  },
  {
    id: 'thermometer',
    name: '体温計',
    image: shopItemIcons.thermometer,
    description: '避難中や避難所で体調を確認するときに役立つ。',
  },
  {
    id: 'cooling-blanket',
    name: '冷却シート・保温シート',
    image: shopItemIcons['cooling-blanket'],
    description: '暑さや寒さから体を守り、避難生活の負担を減らせる。',
  },
]

const escapeProgressPercentByStep = {
  start: 0,
  'route-check': 25,
  'near-shelter': 50,
  'safe-road': 75,
} as const

const mapViewBoxWidth = 320
const mapViewBoxHeight = 420
const shelterMapPoint: MapPoint = { x: 254, y: 140 }
const escapeMapRoutePoints: Record<EscapeStepId | 'shelter', MapPoint> = {
  start: { x: 78, y: 323 },
  'route-check': { x: 124, y: 245 },
  'near-shelter': { x: 188, y: 232 },
  'safe-road': { x: 236, y: 178 },
  shelter: shelterMapPoint,
}
const escapeMapRouteOrder: Array<EscapeStepId | 'shelter'> = [
  'start',
  'route-check',
  'near-shelter',
  'safe-road',
  'shelter',
]
const mapPointsToPolyline = (points: MapPoint[]) =>
  points.map((point) => `${point.x},${point.y}`).join(' ')
const mapPointToPercent = (point: MapPoint) => ({
  left: `${(point.x / mapViewBoxWidth) * 100}%`,
  top: `${(point.y / mapViewBoxHeight) * 100}%`,
})

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
      text: '今日は災害当日です。対策アイコンから、部屋でできる対策を選びましょう。',
    },
  },
  {
    target: 'furniture',
    dialogue: {
      speaker: 'ガイド',
      text: '時間は限られています。部屋の対策は一つだけ実行できます。',
    },
  },
]

const escapeGuideSteps: EscapeGuideStep[] = [
  {
    target: 'progress',
    dialogue: {
      speaker: 'ガイド',
      text: '脱出パートでは、上の経過時間が進みます。',
    },
  },
  {
    target: 'progress',
    dialogue: {
      speaker: 'ガイド',
      text: '時間が進むほど暗くなり、避難が難しくなります。',
    },
  },
  {
    target: 'water',
    dialogue: {
      speaker: 'ガイド',
      text: '水分ゲージは、歩き続ける体力に関わります。',
    },
  },
  {
    target: 'water',
    dialogue: {
      speaker: 'ガイド',
      text: '水分が切れると焦りやすくなり、判断が乱れます。',
    },
  },
  {
    target: 'food',
    dialogue: {
      speaker: 'ガイド',
      text: '空腹ゲージは、避難を続けるための余力です。',
    },
  },
  {
    target: 'food',
    dialogue: {
      speaker: 'ガイド',
      text: '空腹が限界になると、動き続けるのが難しくなります。',
    },
  },
]

const escapeLightGuideStep: EscapeGuideStep = {
  target: 'light',
  dialogue: {
    speaker: 'ガイド',
    text: '夜や暗い場所ではライトONが使えます。',
  },
}

const escapeLightGuideDetailStep: EscapeGuideStep = {
  target: 'light',
  dialogue: {
    speaker: 'ガイド',
    text: 'ライトがあれば、道や案内板を確認しやすくなります。',
  },
}

const escapeRouteWarningDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: '案内板に従うと右の道が近い。でも危なそうだな。',
}

const escapeRoutePromptDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'どっちに進もうか。',
}

const escapeRouteRetryPromptDialogue: Dialogue = {
  speaker: '主人公',
  text: '右の道は危険だった。左の道から進もう。',
}

const escapeScreen25IntroDialogue: Dialogue = {
  speaker: '主人公',
  text: '少し開けた道に出た。このまま避難所へ進むか、誰かを待つか迷う。',
}

const escapeScreen25IntroObserveDialogue: Dialogue = {
  speaker: '主人公',
  text: '避難所はこの先のはずだ。けれど、周りは静かで、人の気配も少ない。',
}

const escapeScreen25IntroNotificationDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'スマホに通知が届いている。',
}

const escapeScreen25ShelterStartDialogue: Dialogue = {
  speaker: '主人公',
  text: 'ここで止まっているより、避難所へ向かった方がいい。足元を確認しながら進もう。',
}

const escapeScreen25ShelterCautionDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: '崩れた塀やひび割れを避けながら、慎重に道を選んで進んだ。',
}

const escapeScreen25CrackDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: '待っている間に大きな地割れが起き、正規の道がふさがってしまった。',
}

const escapeScreen25CrackBlockedDialogue: Dialogue = {
  speaker: '主人公',
  text: 'この道はもう通れない。戻るより、今から通れる別の道を探すしかない。',
}

const escapeScreen25ForkIntroDialogue: Dialogue = {
  speaker: '主人公',
  text: '別の道を探すしかない。二つの道に分かれている。',
}

const escapeScreen25ForkPromptDialogue: Dialogue = {
  speaker: '主人公',
  text: '右の道の方がよさそうだ。左の道は、どこか不穏な気配がする。',
}

const escapeScreen25RightRoadDialogue: Dialogue = {
  speaker: '主人公',
  text: '右の道は通れそうだ。このまま学校へ向かおう。',
}

const escapeScreen25RightRoadCheckDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: '道幅は狭いが、大きな崩落はない。落ち着いて進めば抜けられそうだ。',
}

const escapeScreen25RightRoadSchoolDialogue: Dialogue = {
  speaker: '主人公',
  text: '少し先に学校の明かりが見える。もう少しで避難所だ。',
}

const escapeScreen25FriendWaitDialogue: Dialogue = {
  speaker: '主人公',
  text: '友人と合流することにした。危ない場所から少し離れて、連絡を待つ。',
}

const escapeScreen25FriendJoinDialogue: Dialogue = {
  speaker: '友人',
  text: 'いた！ 無事でよかった。こっちからなら学校まで行けるはずだ。',
}

const escapeScreen25FriendEvacuationDialogue: Dialogue = {
  speaker: '主人公',
  text: '一人じゃないだけで、少し落ち着ける。声をかけ合いながら避難所へ向かった。',
}

const escapeScreen25FriendArrivalDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: '友人と一緒に、学校の避難所へたどり着いた。',
}

const escapeScreen25UfoLeftDialogue: Dialogue = {
  speaker: '主人公',
  text: '左の道へ進むと、上の方が妙に明るい。',
}

const escapeScreen25UfoLeftSilenceDialogue: Dialogue = {
  speaker: '主人公',
  text: '風の音が消えた。さっきまで聞こえていた遠くのざわめきも、急に聞こえなくなる。',
}

const escapeScreen25UfoLeftSignDialogue: Dialogue = {
  speaker: '主人公',
  text: '足元の小石が、音もなく震えている。普通の余震とは違う気がする。',
}

const escapeScreen25UfoGlowDialogue: Dialogue = {
  speaker: '主人公',
  text: '街灯にしては明るすぎる。光はゆっくり動きながら、こちらへ近づいてくる。',
}

const escapeScreen25UfoGlowCloseDialogue: Dialogue = {
  speaker: '主人公',
  text: '青白い光が道の奥に落ちている。照らされている場所だけ、昼みたいに明るい。',
}

const escapeScreen25UfoOverlookDialogue: Dialogue = {
  speaker: '主人公',
  text: '気づくと体が浮いていた。地割れした町を、ありえない高さから見下ろしている。',
}

const escapeScreen25UfoOverlookFloatDialogue: Dialogue = {
  speaker: '主人公',
  text: '足を動かしても地面に触れない。息を吸うたびに、体がさらに上へ引き上げられる。',
}

const escapeScreen25UfoPulledDialogue: Dialogue = {
  speaker: '主人公',
  text: '真上に巨大な影がある。逃げようとしても、体が光の中へ吸い上げられていく。',
}

const escapeScreen25UfoPulledResistDialogue: Dialogue = {
  speaker: '主人公',
  text: '手を伸ばしても、つかめるものがない。声を出そうとしても、光の音にかき消される。',
}

const escapeScreen25UfoAboardDialogue: Dialogue = {
  speaker: '主人公',
  text: 'ここは……空の上なのか？ 見たことのない光に囲まれている。',
}

const escapeScreen25UfoAboardLookDialogue: Dialogue = {
  speaker: '主人公',
  text: '床も壁も金属のようで、でも冷たさがない。目の前に、何かが立っている。',
}

const escapeScreen25UfoMeetDialogue: Dialogue = {
  speaker: '？？？',
  text: 'あなたは、なぜこの道を選んだのですか。',
}

const escapeScreen25UfoStopDialogue: Dialogue = {
  speaker: '主人公',
  text: '避難所へ向かっていたはずなのに、どうしてこんなことに……。',
}

const ufoEndDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'UFO End。避難とは別の場所へ、連れていかれてしまった。',
}

const friendsEndDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'Friends End。事前の連絡が、災害時の合流につながった。',
}

const escapeFriendInitialMessages: ContactMessage[] = [
  { from: 'them', text: '地震やばい。本当に起こったやん。生きてるか？' },
  { from: 'them', text: '自分も避難してる。合流できそうなら一緒に学校行かないか？' },
]

const escapeFriendReplySteps: Array<{
  text: string
  response: string
}> = [
  {
    text: '生きてる。今、開けた道にいる',
    response: 'よかった。たぶん近い。今いる場所の目印ある？',
  },
  {
    text: '地割れの近く。合流したい',
    response: '了解。そっちに向かう。危ない場所から少し離れて待ってて。',
  },
]

const escapeDangerRoadDialogue: Dialogue = {
  speaker: '主人公',
  text: '細い道に入った。足元が悪くて、慎重に進まないと危ない。',
}

const escapeInjuryDialogue: Dialogue = {
  speaker: '主人公',
  text: '足元のがれきでけがをしてしまった。',
}

const escapeInjuryBackpackPromptDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'リュックに手当てできるものがあるかもしれない。',
}

const escapeInjuryNoTreatmentDialogue: Dialogue = {
  speaker: '主人公',
  text: '手当てできるものがない。いったん戻って、別の道を考えよう。',
}

const escapeInjuryTreatedDialogue: Dialogue = {
  speaker: '主人公',
  text: 'けがの手当てができた。時間を失わず、このまま進めそうだ。',
}

const escapePhoneDeadDialogue: Dialogue = {
  speaker: '主人公',
  text: '電源が切れてしまっている。どうしよう。',
}

const escapePhoneUnavailableDialogue: Dialogue = {
  speaker: '主人公',
  text: 'スマホの充電がない。今は使えない。',
}

const escapeLightUnavailableDialogue: Dialogue = {
  speaker: '主人公',
  text: 'ライトをつけることができない。',
}

const escapeBackpackPromptDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'リュックに使えるアイテムがあるかもしれない。',
}

const escapeWaterBackpackPromptDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'リュックに何かあるかもしれない。',
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

const escapePanicRoadNightBackgrounds = [
  panicRoadNightBackground,
  panicRoadNightBackground1,
  panicRoadNightBackground2,
  panicRoadNightBackground3,
]

const escapeNoWaterThirstDialogue: Dialogue = {
  speaker: '主人公',
  text: 'のどが渇いた。頭がぼうっとしてきた。',
}

const escapeNoWaterWanderingDialogues: Dialogue[] = [
  {
    speaker: '主人公',
    text: '水がない。足取りが重くなってきた。',
  },
  {
    speaker: '主人公',
    text: '早く進まないと。周りを見る余裕がない。',
  },
  {
    speaker: '主人公',
    text: '空が暗くなってきた。道を間違えたかもしれない。',
  },
  {
    speaker: '主人公',
    text: 'もう夜だ。戻らないと危ない。',
  },
]

const escapeNoWaterRoadBackgrounds = [
  noWaterPanicRoadBackground3,
  noWaterPanicRoadBackground4,
  noWaterPanicRoadBackground1,
  noWaterPanicRoadBackground2,
]

const escapeNoWaterNightStartRoadBackgrounds = [
  noWaterPanicRoadBackground1,
  noWaterPanicRoadBackground2,
  noWaterPanicRoadNightBackground,
  noWaterPanicRoadNightBackground1,
]

const escapeNoWaterAftermathDialogue: Dialogue = {
  speaker: '主人公',
  text: '水がないまま歩き回って、時間を使ってしまった。',
}

const escapeFoodBackpackPromptDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: 'リュックに何か食べられるものがあるかもしれない。',
}

const escapeFoodRecoveredDialogue: Dialogue = {
  speaker: '主人公',
  text: '少し落ち着いてきた。のどは渇いたままだが、看板を探す余裕が戻ってきた。',
}

const escapeFoodEnergyDialogue: Dialogue = {
  speaker: '主人公',
  text: '胃に入るだけで、足に力が戻ってくる。',
}

const escapeFoodSearchDialogue: Dialogue = {
  speaker: '主人公',
  text: 'のどは乾いたままだ。このまま長く歩き続けるのは危ない。',
}

const escapeFoodSignSearchDialogue: Dialogue = {
  speaker: '主人公',
  text: 'でも、焦って歩き回るより周りを見る余裕は戻った。案内板を探してみよう。',
}

const escapeWaterRecoveredDialogue: Dialogue = {
  speaker: '主人公',
  text: '冷静になってきた。避難案内板があるかもしれない。',
}

const escapeMedicationRecoveredDialogue: Dialogue = {
  speaker: '主人公',
  text: '頭痛が少し引いてきた。落ち着いて、避難案内板を探そう。',
}

const escapeRadioChoiceDialogue: Dialogue = {
  speaker: '主人公',
  text: '携帯ラジオがある。使ってみようか。',
}

const escapeRadioUseDialogue: Dialogue = {
  speaker: '主人公',
  text: 'まず情報を集めよう。ラジオから避難情報が聞こえてくる。',
}

const escapeRadioSkipDialogue: Dialogue = {
  speaker: '主人公',
  text: 'ラジオは使わず、周りを見ながら案内板を探そう。',
}

const escapeSignFoundDialogue: Dialogue = {
  speaker: '主人公',
  text: 'あった。これの通りに進んでみよう。',
}

const escapeNightSignFoundDialogue: Dialogue = {
  speaker: '主人公',
  text: '看板を見つけた。夜でも、これをたどれば避難所へ向かえそうだ。',
}

const escapeNoFoodStartDialogue: Dialogue = {
  speaker: '主人公',
  text: '食料もない。足が重い。どうすればいいんだ。',
}

const escapeNoFoodWanderingDialogues: Dialogue[] = [
  {
    speaker: '主人公',
    text: '暗くなってきた。道が分からなくなってきた。',
  },
  {
    speaker: '主人公',
    text: '体に力が入らない。早く着かないと。',
  },
  {
    speaker: '主人公',
    text: 'どこを歩いているのか分からない。',
  },
  {
    speaker: '主人公',
    text: 'もう、考えがまとまらない。',
  },
]

const escapeNoFoodNightBackgrounds = [
  noFoodNightBackground,
  noFoodNightBackground2,
  noFoodNightBackground3,
  noFoodNightSafeRoadBackground,
]

const escapeLastPushBackpackPromptDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: '食料はない。でも、まだリュックに使えるものがあるかもしれない。',
}

const escapeLastPushDialogue: Dialogue = {
  speaker: '主人公',
  text: '残っていたものを使って、なんとか足を動かす。避難所まで進もう。',
}

const escapeHotBloodDialogues: Dialogue[] = [
  {
    speaker: '主人公',
    text: '体は重い。でも、ここで止まってたまるか。',
  },
  {
    speaker: '主人公',
    text: '残っていた備えが、もう一度立ち上がる力をくれた。',
  },
  {
    speaker: '主人公',
    text: '炎みたいに気持ちが戻ってくる。前だけ見て進もう。',
  },
  {
    speaker: '主人公',
    text: '全力で走り抜ける。避難所まで、あと少しだ！',
  },
]

const escapeWaterItemPromptDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: '何か飲むものか、体調を整えられるものがあるかもしれない。',
}

const escapeFoodItemPromptDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: '何か食べるものがあるかもしれない。',
}

const escapeCalmRecoveryItemIds: ItemId[] = ['water', 'medication']
const escapeFoodRecoveryItemIds: ItemId[] = ['emergency-food', 'canned-food']
const escapeLastPushItemIds: ItemId[] = ['cooling-blanket', 'nutrition-supplements']
const escapeInjuryTreatmentItemIds: ItemId[] = ['first-aid-kit', 'disinfectant']
const preparationUsableItemIds: ItemId[] = ['furniture-fasteners', 'window-film']
const foodSoundItemIds: ItemId[] = [
  'emergency-food',
  'canned-food',
  'nutrition-supplements',
  'retort-rice',
  'portable-toilet',
]
const dailyShopPurchaseLimit = 3
const createInitialDailyShopPurchaseCounts = (): Record<StoryDay, number> => ({
  0: 0,
  1: 0,
})


function App() {
  const [screen, setScreen] = useState<Screen>('start')
  const [currentDay, setCurrentDay] = useState<StoryDay>(1)
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [dialoguePageIndex, setDialoguePageIndex] = useState(0)
  const [roomIntroIndex, setRoomIntroIndex] = useState(0)
  const [nightDialogueIndex, setNightDialogueIndex] = useState(0)
  const [dayStartDialogueIndex, setDayStartDialogueIndex] = useState(0)
  const [postDisasterDialogueIndex, setPostDisasterDialogueIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionText, setTransitionText] = useState<string | null>(null)
  const [hoveredAction, setHoveredAction] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<BackpackItem | null>(null)
  const [selectedItem, setSelectedItem] = useState<BackpackItem | null>(null)
  const [backpackNoticeDialogue, setBackpackNoticeDialogue] =
    useState<Dialogue | null>(null)
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
  const [escapeFriendMessages, setEscapeFriendMessages] = useState<ContactMessage[]>([])
  const [escapeFriendReplyStep, setEscapeFriendReplyStep] = useState(0)
  const [isEscapeFriendResponsePending, setIsEscapeFriendResponsePending] =
    useState(false)
  const [isEscapeFriendMessageRead, setIsEscapeFriendMessageRead] = useState(false)
  const [isEscapeFriendRouteComplete, setIsEscapeFriendRouteComplete] =
    useState(false)
  const [selectedNewsArticleId, setSelectedNewsArticleId] =
    useState<NewsArticleId | null>(null)
  const [isShelterDetailOpen, setIsShelterDetailOpen] = useState(false)
  const [backpackReturnScreen, setBackpackReturnScreen] =
    useState<'preparation' | 'escape'>('preparation')
  const [isMeasuresOpen, setIsMeasuresOpen] = useState(false)
  const [selectedMeasure, setSelectedMeasure] = useState<string | null>(null)
  const [measureResultDialogue, setMeasureResultDialogue] =
    useState<Dialogue | null>(null)
  const [isQuitMessageVisible, setIsQuitMessageVisible] = useState(false)
  const [isDeveloperMode, setIsDeveloperMode] = useState(false)
  const [isItemUseFlashActive, setIsItemUseFlashActive] = useState(false)
  const [isScreenShaking, setIsScreenShaking] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(false)
  const [hasCheckedEscapeShelter, setHasCheckedEscapeShelter] = useState(false)
  const [escapeOutcome, setEscapeOutcome] = useState<EscapeOutcome>('true')
  const [isEscapeLightOn, setIsEscapeLightOn] = useState(false)
  const [reviewMode, setReviewMode] = useState<ReviewMode>('chart')
  const [escapeWaterLevel, setEscapeWaterLevel] = useState(1)
  const [escapeFoodLevel, setEscapeFoodLevel] = useState(1)
  const [escapeProgressOverride, setEscapeProgressOverride] = useState<number | null>(null)
  const [escapeRouteChoiceStage, setEscapeRouteChoiceStage] =
    useState<EscapeRouteChoiceStage>(null)
  const [escapeScreen25Stage, setEscapeScreen25Stage] =
    useState<EscapeScreen25Stage>(null)
  const [shouldOpenRouteChoiceAfterScreen25, setShouldOpenRouteChoiceAfterScreen25] =
    useState(false)
  const [escapePhonePowerState, setEscapePhonePowerState] =
    useState<EscapePhonePowerState>('normal')
  const [escapePhonePromptStage, setEscapePhonePromptStage] =
    useState<EscapePhonePromptStage>(null)
  const [escapeCalmRecoveryItemId, setEscapeCalmRecoveryItemId] = useState<ItemId | null>(null)
  const [escapePanicDialogueIndex, setEscapePanicDialogueIndex] = useState(0)
  const [escapePanicRoadIndex, setEscapePanicRoadIndex] = useState<number | null>(null)
  const [escapeNoWaterRoadIndex, setEscapeNoWaterRoadIndex] = useState<number | null>(null)
  const [escapeNoFoodRoadIndex, setEscapeNoFoodRoadIndex] = useState<number | null>(null)
  const [escapeNoFoodPanicLevel, setEscapeNoFoodPanicLevel] = useState(0)
  const [escapeHotBloodIndex, setEscapeHotBloodIndex] = useState(0)
  const [isHotBloodRescueComplete, setIsHotBloodRescueComplete] = useState(false)
  const [isEscapePanicFading, setIsEscapePanicFading] = useState(false)
  const [isFollowingEvacuationGuide, setIsFollowingEvacuationGuide] = useState(false)
  const [escapeNoticeDialogue, setEscapeNoticeDialogue] = useState<Dialogue | null>(null)
  const [isEscapeRightRouteBlocked, setIsEscapeRightRouteBlocked] = useState(false)
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
  const [escapeGuideKind, setEscapeGuideKind] = useState<EscapeGuideKind | null>(null)
  const [escapeGuideIndex, setEscapeGuideIndex] = useState(0)
  const [hasSeenEscapeGuide, setHasSeenEscapeGuide] = useState(false)
  const [hasSeenEscapeLightGuide, setHasSeenEscapeLightGuide] = useState(false)
  const [, setIsRoomChangePreviewPending] = useState(false)
  const [roomChangePreviewDialogue, setRoomChangePreviewDialogue] =
    useState<Dialogue>(() => createRoomChangePreviewDialogue(false, false))
  const [dialogueLog, setDialogueLog] = useState<Dialogue[]>([
    bookWarningDialogues[0],
  ])
  const [resultReviewEndKind, setResultReviewEndKind] = useState<EndKind | null>(null)

  // 商品IDごとの購入数とリュック収納数。
  // ショップ画面・リュック画面・災害後判定で共通利用する。
  const [itemFlags, setItemFlags] = useState<Record<ItemId, ItemFlags>>(
    createInitialItemFlags,
  )
  const [purchasedItemOrder, setPurchasedItemOrder] = useState<ItemId[]>([])
  const [dailyShopPurchaseCounts, setDailyShopPurchaseCounts] = useState<
    Record<StoryDay, number>
  >(createInitialDailyShopPurchaseCounts)

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
  const radioAudioRef = useRef<HTMLAudioElement | null>(null)
  const ufoSuctionAudioRef = useRef<HTMLAudioElement | null>(null)
  const {
    currentEscapeStep,
    resetEscapeFlow,
    advanceEscapeStep: advanceEscapeFlowStep,
  } = useEscapeFlow()

  const isStart = screen === 'start'
  const isZoomCalibration = screen === 'zoom-calibration'
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
  const isNormalEnd = screen === 'normal-end'
  const isUfoEnd = screen === 'ufo-end'
  const isFriendsEnd = screen === 'friends-end'
  const isResultReview = screen === 'result-review'
  const isRealLifeMessage = screen === 'real-life-message'
  const isEndingActions = screen === 'ending-actions'
  const isAfterBadEnd = isResultReview || isRealLifeMessage || isEndingActions
  const shouldHideGlobalControls =
    isZoomCalibration ||
    isBadEnd ||
    isTrueEnd ||
    isNormalEnd ||
    isUfoEnd ||
    isFriendsEnd ||
    isAfterBadEnd
  const resultReviewBackground =
    resultReviewEndKind === 'bad'
      ? badEndBackground
      : resultReviewEndKind === 'hot-blood'
        ? hotBloodNormalEndBackground
      : resultReviewEndKind === 'normal'
        ? normalEndBackground
        : resultReviewEndKind === 'ufo'
          ? ufoEndBackground
          : resultReviewEndKind === 'friends'
            ? friendsEndBackground
          : trueEndBackground
  const currentDayLabel = getDayLabel(currentDay)
  const preparationDialogue = getPreparationDialogue(currentDay)
  const isFurnitureFastenerUsed = itemFlags['furniture-fasteners'].packed > 0
  const isWindowFilmUsed = itemFlags['window-film'].packed > 0
  const completedRoomMeasureAction =
    roomMeasureActions.find((action) => roomMeasureFlags[action]) ?? null
  const currentRoomMeasureBackground = completedRoomMeasureAction
    ? isFurnitureFastenerUsed
      ? fixedRoomMeasureBackgrounds[completedRoomMeasureAction]
      : roomMeasureBackgrounds[completedRoomMeasureAction]
    : null
  const currentPreparationRoomBackground =
    currentRoomMeasureBackground ??
    (isFurnitureFastenerUsed ? fixedNormalRoomBackground : normalRoomBackground)
  const isMobileBatteryUsable =
    itemFlags['power-bank'].purchased > 0 && itemFlags['power-bank'].packed === 0
  const isCalmRecoveryUsable = escapeCalmRecoveryItemIds.some(
    (itemId) => itemFlags[itemId].purchased > 0 && itemFlags[itemId].packed === 0,
  )
  const isFoodRecoveryUsable = escapeFoodRecoveryItemIds.some(
    (itemId) => itemFlags[itemId].purchased > 0 && itemFlags[itemId].packed === 0,
  )
  const isLastPushItemUsable = escapeLastPushItemIds.some(
    (itemId) => itemFlags[itemId].purchased > 0 && itemFlags[itemId].packed === 0,
  )
  const isInjuryTreatmentUsable = escapeInjuryTreatmentItemIds.some(
    (itemId) => itemFlags[itemId].purchased > 0 && itemFlags[itemId].packed === 0,
  )
  const isRadioUsable = itemFlags.radio.purchased > 0
  const cannotUseBackpackItemDialogue: Dialogue = {
    speaker: 'ナレーション',
    text: '今は使うべきではない。必要な場面で使おう。',
  }
  const canUseBackpackItemNow = (itemId: ItemId) => {
    if (itemFlags[itemId].packed > 0) {
      return true
    }

    if (backpackReturnScreen !== 'escape') {
      return preparationUsableItemIds.includes(itemId)
    }

    if (itemId === 'power-bank' && currentEscapeStep.id === 'route-check') {
      return true
    }

    if (
      escapePhonePromptStage === 'water-backpack' &&
      escapeCalmRecoveryItemIds.includes(itemId)
    ) {
      return true
    }

    if (
      escapePhonePromptStage === 'food-backpack' &&
      escapeFoodRecoveryItemIds.includes(itemId)
    ) {
      return true
    }

    if (
      escapePhonePromptStage === 'last-push-backpack' &&
      escapeLastPushItemIds.includes(itemId)
    ) {
      return true
    }

    if (
      escapePhonePromptStage === 'injury-backpack' &&
      escapeInjuryTreatmentItemIds.includes(itemId)
    ) {
      return true
    }

    return false
  }
  const escapeCalmRecoveredDialogue =
    escapeCalmRecoveryItemId === 'medication'
      ? escapeMedicationRecoveredDialogue
      : escapeWaterRecoveredDialogue
  const activePreparationGuideSteps =
    preparationGuideKind === 'final'
      ? finalPreparationGuideSteps
      : preparationGuideSteps
  const currentPreparationGuideStep =
    activePreparationGuideSteps[preparationGuideIndex] ??
    activePreparationGuideSteps[0]
  const isPreparationGuideTarget = (target: PreparationGuideTarget) =>
    isPreparationGuideActive && currentPreparationGuideStep.target === target
  const isEscapeGuideActive = escapeGuideKind !== null
  const currentPostDisasterDialogues = isFurnitureFastenerUsed
    ? truePostDisasterDialogues
    : postDisasterDialogues
  const selectedNewsArticle = newsArticles.find(
    (article) => article.id === selectedNewsArticleId,
  )
  const selectedContact = contactThreads.find(
    (contact) => contact.id === selectedContactId,
  )
  const hasPreparedFriendChat = contactReplyLog.friend.length > 0
  const isEscapeFriendChatActive =
    isEscape && escapeScreen25Stage !== null && selectedContactId === 'friend'
  const isEscapeFriendNotificationAvailable =
    isEscape &&
    escapeScreen25Stage !== null &&
    hasPreparedFriendChat &&
    escapePhonePowerState !== 'dead' &&
    !isEscapeFriendRouteComplete &&
    escapeScreen25Stage !== 'friend-wait' &&
    escapeScreen25Stage !== 'friend-join' &&
    escapeScreen25Stage !== 'friend-evacuation' &&
    escapeScreen25Stage !== 'friend-arrival'
  const selectedContactReplyLog = selectedContact
    ? contactReplyLog[selectedContact.id]
    : []
  const selectedContactMessages = selectedContact
    ? isEscapeFriendChatActive
      ? escapeFriendMessages
      : [...selectedContact.messages, ...selectedContactReplyLog]
    : []
  const hasSelectedContactReply = isEscapeFriendChatActive
    ? escapeFriendReplyStep >= escapeFriendReplySteps.length
    : selectedContactReplyLog.length > 0
  const currentEscapeFriendReply =
    isEscapeFriendChatActive && escapeFriendReplyStep < escapeFriendReplySteps.length
      ? escapeFriendReplySteps[escapeFriendReplyStep]
      : null
  const hasUnreadEscapeFriendMessage =
    isEscapeFriendNotificationAvailable && !isEscapeFriendMessageRead
  const hasUnreadContactMessage = (contact: ContactThread) =>
    contact.quickReplies.length > 0 &&
    contactReplyLog[contact.id].length === 0 &&
    pendingContactResponseId !== contact.id
  const isUfoInsideAudioActive =
    isUfoEnd ||
    escapeScreen25Stage === 'ufo-aboard' ||
    escapeScreen25Stage === 'ufo-aboard-look' ||
    escapeScreen25Stage === 'ufo-meet' ||
    escapeScreen25Stage === 'ufo-stop'
  const isUfoSuctionAudioActive =
    escapeScreen25Stage === 'ufo-overlook' ||
    escapeScreen25Stage === 'ufo-overlook-float' ||
    escapeScreen25Stage === 'ufo-pulled' ||
    escapeScreen25Stage === 'ufo-pulled-resist'
  const isEscapePanicBgmActive =
    escapePhonePromptStage === 'panic' ||
    escapePhonePromptStage === 'water-backpack' ||
    escapePhonePromptStage === 'thirst-wandering' ||
    escapePhonePromptStage === 'thirst-aftermath' ||
    escapePhonePromptStage === 'food-backpack' ||
    escapePhonePromptStage === 'no-food-panic' ||
    escapePhonePromptStage === 'last-push-backpack' ||
    escapePanicRoadIndex !== null ||
    escapeNoWaterRoadIndex !== null ||
    escapeNoFoodRoadIndex !== null ||
    escapeNoFoodPanicLevel > 0
  const resultReviewBgmSrc =
    resultReviewEndKind === 'true'
      ? trueEndBgm
      : resultReviewEndKind === 'ufo'
        ? ufoInsideSound
        : resultReviewEndKind === 'normal' ||
            resultReviewEndKind === 'hot-blood' ||
            resultReviewEndKind === 'friends'
          ? specialEndBgm
          : resultReviewEndKind === 'bad'
            ? badEndBgm
            : isFurnitureFastenerUsed
              ? trueEndBgm
              : badEndBgm
  const activeBgmSrc = isUfoInsideAudioActive
    ? ufoInsideSound
    : isShop
    ? shopBgm
    : isPreparation || isBackpack || isRoomChangePreview
      ? preparationBgm
    : isEscape
      ? isEscapePanicBgmActive
        ? escapeBgm2
        : escapeBgm
      : isShelterArrival
        ? shelterArrivalSound
      : isNight
        ? nightRoomBgm
        : isQuakeArrival
          ? beforeQuakeBgm
          : isPostDisaster
            ? quakeBgm
            : isTrueEnd
              ? trueEndBgm
              : isNormalEnd
                ? specialEndBgm
              : isFriendsEnd
                ? specialEndBgm
              : isBadEnd
                ? badEndBgm
                : isAfterBadEnd
                  ? resultReviewBgmSrc
                  : normalRoomBgm
  const shouldLoopActiveBgm = activeBgmSrc !== shelterArrivalSound

  // ShopScreenに渡す購入数データ。
  // itemFlagsから購入数だけを取り出して作る。
  const purchasedItemCounts = useMemo(
    () => createPurchasedItemCounts(itemFlags),
    [itemFlags],
  )
  const currentDayShopPurchaseCount = dailyShopPurchaseCounts[currentDay] ?? 0
  const remainingShopPurchases = Math.max(
    dailyShopPurchaseLimit - currentDayShopPurchaseCount,
    0,
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
  const hasCompletedRoomMeasure = completedRoomMeasureCount > 0
  const clampReviewScore = (score: number) => Math.max(0, Math.min(100, score))
  const hasPurchasedItem = (itemId: ItemId) => itemFlags[itemId].purchased > 0
  const hasUsedItem = (itemId: ItemId) => itemFlags[itemId].packed > 0
  const reviewScores = [
    {
      id: 'room-safety',
      label: '室内安全',
      score: clampReviewScore(
        (hasUsedItem('furniture-fasteners')
          ? 35
          : hasPurchasedItem('furniture-fasteners')
            ? 18
            : 0) +
          (hasUsedItem('window-film')
            ? 25
            : hasPurchasedItem('window-film')
              ? 13
              : 0) +
          completedRoomMeasureCount * 25 +
          (escapeOutcome === 'true' ? 15 : 0),
      ),
      lowText: '家具固定や窓ガラス対策が弱く、地震直後の被害を減らしきれなかった。',
      highText: '家具や窓まわりに対策できており、地震直後の危険を減らせた。',
    },
    {
      id: 'info',
      label: '情報・連絡',
      score: clampReviewScore(
        (storyFlags.contactedFamily ? 15 : 0) +
          (storyFlags.checkedNews ? 12 : 0) +
          (storyFlags.checkedShelter ? 16 : 0) +
          (hasCheckedEscapeShelter ? 12 : 0) +
          (hasPurchasedItem('power-bank') ? 18 : 0) +
          (hasPurchasedItem('radio') ? 15 : 0) +
          (isEscapeFriendRouteComplete ? 20 : hasPreparedFriendChat ? 10 : 0),
      ),
      lowText: '連絡手段や情報収集の備えが少なく、災害時の判断材料が不足しやすい。',
      highText: 'スマホ・ラジオ・連絡を活用でき、情報面の不安を減らせた。',
    },
    {
      id: 'judgment',
      label: '避難判断',
      score: clampReviewScore(
        (resultReviewEndKind === 'true' || resultReviewEndKind === 'friends'
          ? 32
          : resultReviewEndKind === 'normal' || resultReviewEndKind === 'hot-blood'
            ? 22
            : resultReviewEndKind === 'ufo'
              ? 6
              : 0) +
          (isFollowingEvacuationGuide ? 22 : 0) +
          (isEscapeRightRouteBlocked ? 6 : 16) +
          (escapeScreen25Stage === 'friend-arrival' ? 14 : 0) +
          (resultReviewEndKind !== 'ufo' ? 14 : 0) +
          (escapeOutcome === 'true' ? 10 : 0),
      ),
      lowText: '危険な道や不確かな行動を選ぶ場面があり、避難判断にリスクが残った。',
      highText: '案内板や安全な道を意識でき、避難判断は比較的安定していた。',
    },
    {
      id: 'health',
      label: '体調管理',
      score: clampReviewScore(
        (hasUsedItem('water') ? 35 : hasPurchasedItem('water') ? 22 : 0) +
          (hasUsedItem('medication') ? 18 : hasPurchasedItem('medication') ? 10 : 0) +
          (hasUsedItem('emergency-food') || hasUsedItem('canned-food')
            ? 25
            : hasPurchasedItem('emergency-food') || hasPurchasedItem('canned-food')
              ? 16
              : 0) +
          (hasPurchasedItem('nutrition-supplements') ? 12 : 0) +
          (hasPurchasedItem('cooling-blanket') ? 10 : 0),
      ),
      lowText: '水分・食料・体調不良への備えが薄く、避難中に動き続ける力が落ちやすい。',
      highText: '水分や食料、体調不良への備えがあり、避難中の消耗に対応できた。',
    },
    {
      id: 'first-aid',
      label: '応急対応',
      score: clampReviewScore(
        (hasUsedItem('first-aid-kit')
          ? 40
          : hasPurchasedItem('first-aid-kit')
            ? 25
            : 0) +
          (hasUsedItem('disinfectant')
            ? 35
            : hasPurchasedItem('disinfectant')
              ? 22
              : 0) +
          (hasPurchasedItem('gloves-slippers') ? 12 : 0) +
          (hasPurchasedItem('mask') ? 7 : 0) +
          (hasPurchasedItem('thermometer') ? 6 : 0),
      ),
      lowText: 'けがや衛生面への備えが少なく、負傷時に時間や体力を失いやすい。',
      highText: 'けがや衛生面に対応できる備えがあり、負傷時のリスクを抑えられた。',
    },
    {
      id: 'calm',
      label: '冷静さ',
      score: clampReviewScore(
        (escapeCalmRecoveryItemId ? 22 : 0) +
          (hasPurchasedItem('radio') ? 16 : 0) +
          (isFollowingEvacuationGuide ? 18 : 0) +
          (storyFlags.checkedShelter || hasCheckedEscapeShelter ? 14 : 0) +
          (isEscapeFriendRouteComplete ? 12 : 0) +
          (resultReviewEndKind === 'bad'
            ? 0
            : resultReviewEndKind === 'ufo'
              ? 6
              : resultReviewEndKind === 'hot-blood'
                ? 14
                : 18),
      ),
      lowText: '焦りから立て直す材料が少なく、判断が乱れやすい場面があった。',
      highText: '情報や備えを使って落ち着きを取り戻し、行動を継続できた。',
    },
  ]
  const radarSize = 420
  const radarCenter = radarSize / 2
  const radarRadius = 132
  const getRadarPoint = (index: number, radius: number) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / reviewScores.length

    return {
      x: radarCenter + Math.cos(angle) * radius,
      y: radarCenter + Math.sin(angle) * radius,
    }
  }
  const createRadarPoints = (radius: number) =>
    reviewScores
      .map((_, index) => {
        const point = getRadarPoint(index, radius)
        return `${point.x},${point.y}`
      })
      .join(' ')
  const reviewRadarPoints = reviewScores
    .map((axis, index) => {
      const point = getRadarPoint(index, (axis.score / 100) * radarRadius)
      return `${point.x},${point.y}`
    })
    .join(' ')
  const lowReviewItems = reviewScores
    .filter((axis) => axis.score < 65)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
  const highReviewItems = reviewScores
    .filter((axis) => axis.score >= 65)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
  const realLifeAdviceSource =
    lowReviewItems.length > 0
      ? lowReviewItems
      : reviewScores
          .slice()
          .sort((a, b) => a.score - b.score)
          .slice(0, 3)
  const realLifeAdviceItems = realLifeAdviceSource.map((axis) => {
    switch (axis.id) {
      case 'room-safety':
        return {
          title: '寝る場所と出口までの通路を確認する',
          action:
            'ベッド周りと玄関までを見て、倒れそうな家具や落ちそうな物を一つだけ動かそう。',
        }
      case 'info':
        return {
          title: '連絡と充電の準備を一つ決める',
          action:
            '家族や友人に一言連絡し、スマホ充電器やモバイルバッテリーを同じ場所に置こう。',
        }
      case 'judgment':
        return {
          title: '避難先と道順を一度だけ見る',
          action:
            '地図で近い避難所を確認し、危なそうな細い道や塀沿いを避ける道を一つ決めよう。',
        }
      case 'health':
        return {
          title: '水とすぐ食べられる物を手元に置く',
          action:
            '飲料水一本と、開けてすぐ食べられる物をリュックか玄関近くに置こう。',
        }
      case 'first-aid':
        return {
          title: 'けが対策を小さくまとめる',
          action:
            '絆創膏、消毒シート、普段使う薬を小袋に入れて、すぐ取れる場所に置こう。',
        }
      case 'calm':
      default:
        return {
          title: '焦った時の確認手順を決める',
          action:
            '「水を飲む、スマホを見る、避難案内を見る」のように、最初にする行動を一つ決めよう。',
        }
    }
  })
  const realLifeLeadText =
    lowReviewItems.length > 0
      ? `今回低かった「${lowReviewItems[0].label}」から、現実で今できることを確認しましょう。`
      : '大きく不足した項目は少なめです。現実でも続けやすい備えを一つだけ増やしましょう。'
  const baseEscapeProgressPercent =
    escapeOutcome === 'bad'
      ? 60 + ((escapeProgressPercentByStep[currentEscapeStep.id] ?? 0) / 100) * 30
      : escapeProgressPercentByStep[currentEscapeStep.id] ?? 0
  const escapeProgressPercent = escapeProgressOverride ?? baseEscapeProgressPercent
  const isEscapeNightBackground = escapeProgressPercent >= 60
  const isShelterArrivalNightBackground =
    isEscapeNightBackground || escapeOutcome === 'bad' || isHotBloodRescueComplete
  const isEscapeNightStart = escapeOutcome === 'bad'
  const currentEscapePanicRoadBackgrounds = isEscapeNightStart
    ? escapePanicRoadNightBackgrounds
    : escapePanicRoadBackgrounds
  const currentEscapeNoWaterRoadBackgrounds = isEscapeNightStart
    ? escapeNoWaterNightStartRoadBackgrounds
    : escapeNoWaterRoadBackgrounds
  const isEscapeNightRoadVisible =
    isEscapeNightStart &&
    (escapePanicRoadIndex !== null || escapeNoWaterRoadIndex !== null)
  const escapeMapLocation: EscapeMapLocation = (() => {
    if (!isEscape && !isShelterArrival) {
      return {
        ...escapeMapRoutePoints.start,
        label: '自宅',
        status: '避難開始前です。',
      }
    }

    if (isShelterArrival) {
      return {
        ...shelterMapPoint,
        label: '中央小学校',
        status: '避難場所に到着しました。',
      }
    }

    if (
      escapePhonePromptStage === 'danger-road' ||
      escapePhonePromptStage === 'injury' ||
      escapePhonePromptStage === 'injury-no-treatment' ||
      escapePhonePromptStage === 'injury-backpack'
    ) {
      return {
        x: 276,
        y: 176,
        label: '細い危険道',
        status: '推奨ルートから外れています。安全道へ戻る必要があります。',
        reconnectTo: 'safe-road',
      }
    }

    if (escapePhonePromptStage === 'hot-blood-run') {
      return {
        x: 246,
        y: 158,
        label: '避難所手前',
        status: '体力を振りしぼって避難場所へ向かっています。',
        reconnectTo: 'shelter',
      }
    }

    switch (escapeScreen25Stage) {
      case 'intro':
      case 'intro-observe':
      case 'intro-notification':
      case 'choices':
      case 'shelter-start':
      case 'shelter-caution':
        return {
          x: 156,
          y: 236,
          label: '途中の通り',
          status: '避難場所へ進む途中です。',
          reconnectTo: 'near-shelter',
        }
      case 'crack':
      case 'crack-blocked':
        return {
          x: 164,
          y: 214,
          label: '地割れ地点',
          status: '正規ルートがふさがれています。別の道を探す必要があります。',
          reconnectTo: 'near-shelter',
        }
      case 'fork-intro':
      case 'fork-choices':
        return {
          x: 142,
          y: 210,
          label: '分かれ道',
          status: '右は学校方面、左は推奨ルートから外れています。',
          reconnectTo: 'near-shelter',
        }
      case 'right-road':
      case 'right-road-check':
      case 'right-road-school':
      case 'friend-join':
      case 'friend-evacuation':
      case 'friend-arrival':
        return {
          x: 224,
          y: 174,
          label: '学校方面の道',
          status: '人の気配がある道から避難場所へ向かっています。',
          reconnectTo: 'shelter',
        }
      case 'friend-wait':
        return {
          x: 168,
          y: 224,
          label: '合流待ち地点',
          status: '友人と連絡を取り、合流地点で待っています。',
          reconnectTo: 'near-shelter',
        }
      case 'ufo-left':
      case 'ufo-left-silence':
      case 'ufo-left-sign':
        return {
          x: 96,
          y: 192,
          label: '左の道',
          status: '推奨ルートから大きく外れています。',
          reconnectTo: 'near-shelter',
        }
      case 'ufo-glow':
      case 'ufo-glow-close':
      case 'ufo-overlook':
      case 'ufo-overlook-float':
      case 'ufo-pulled':
      case 'ufo-pulled-resist':
      case 'ufo-aboard':
      case 'ufo-aboard-look':
      case 'ufo-meet':
      case 'ufo-stop':
        return {
          x: 94,
          y: 128,
          label: '不明な地点',
          status: '現在地の精度が大きく乱れています。',
          reconnectTo: 'near-shelter',
        }
      default:
        return {
          ...escapeMapRoutePoints[currentEscapeStep.id],
          label:
            currentEscapeStep.id === 'start'
              ? '自宅付近'
              : currentEscapeStep.id === 'route-check'
                ? '脱出画面2付近'
                : currentEscapeStep.id === 'near-shelter'
                  ? '脱出画面3付近'
                  : '安全道',
          status:
            currentEscapeStep.id === 'safe-road'
              ? '最短ルートの安全道を進んでいます。'
              : '中央小学校への最短ルートを確認中です。',
        }
    }
  })()
  const escapeMapCurrentPoint: MapPoint = {
    x: escapeMapLocation.x,
    y: escapeMapLocation.y,
  }
  const escapeMapReconnectPoint = escapeMapLocation.reconnectTo
    ? escapeMapRoutePoints[escapeMapLocation.reconnectTo]
    : null
  const escapeMapRouteStartKey = escapeMapLocation.reconnectTo ?? currentEscapeStep.id
  const escapeMapRouteStartIndex = escapeMapRouteOrder.indexOf(escapeMapRouteStartKey)
  const escapeMapRemainingRoutePoints = [
    escapeMapCurrentPoint,
    ...escapeMapRouteOrder
      .slice(Math.max(escapeMapRouteStartIndex, 0) + (escapeMapLocation.reconnectTo ? 0 : 1))
      .map((key) => escapeMapRoutePoints[key]),
  ]
  const escapeMapRemainingRoute = mapPointsToPolyline(escapeMapRemainingRoutePoints)
  const escapeMapCompletedRoute =
    escapeMapLocation.reconnectTo || !isEscape
      ? ''
      : mapPointsToPolyline([
          ...escapeMapRouteOrder
            .slice(0, Math.max(escapeMapRouteStartIndex, 0) + 1)
            .map((key) => escapeMapRoutePoints[key]),
          escapeMapCurrentPoint,
        ])
  const escapeMapReconnectRoute =
    escapeMapReconnectPoint === null
      ? ''
      : mapPointsToPolyline([escapeMapCurrentPoint, escapeMapReconnectPoint])
  const escapeMapRemainingMinutes = Math.max(
    1,
    8 - Math.max(0, escapeMapRouteStartIndex) * 2,
  )
  const hasEscapeFlashlight = itemFlags.flashlight.purchased > 0
  const hasEscapeLightSource =
    hasEscapeFlashlight || escapePhonePowerState !== 'dead'
  const currentEvacuationGuideBackground = isEscapeNightBackground
    ? isEscapeLightOn
      ? evacuationGuideLightBackground
      : evacuationGuideNightBackground
    : evacuationGuideBackground
  const currentDangerRoadBackground = isEscapeNightBackground
    ? isEscapeLightOn
      ? narrowDangerRoadLightBackground
      : narrowDangerRoadNightBackground
    : narrowDangerRoadBackground
  const getEscapeTimeVariantBackground = (
    normalBackground: string,
    nightBackground?: string,
    lightBackground?: string,
  ) => {
    if (!isEscapeNightBackground) {
      return normalBackground
    }

    if (isEscapeLightOn && lightBackground) {
      return lightBackground
    }

    return nightBackground ?? normalBackground
  }
  const currentEscapeScreen25Background =
    escapeScreen25Stage === 'crack'
      || escapeScreen25Stage === 'crack-blocked'
      ? getEscapeTimeVariantBackground(
          escapeScreen25CrackBackground,
          escapeScreen25CrackNightBackground,
          escapeScreen25CrackLightBackground,
        )
      : escapeScreen25Stage === 'fork-intro' ||
          escapeScreen25Stage === 'fork-choices'
        ? getEscapeTimeVariantBackground(
            escapeScreen25ForkBackground,
            escapeScreen25ForkNightBackground,
            escapeScreen25ForkLightBackground,
          )
      : escapeScreen25Stage === 'right-road' ||
          escapeScreen25Stage === 'right-road-check' ||
          escapeScreen25Stage === 'right-road-school'
        ? getEscapeTimeVariantBackground(
            escapeScreen25ForkRightBackground,
            escapeScreen25ForkRightNightBackground,
            escapeScreen25ForkRightLightBackground,
          )
      : escapeScreen25Stage === 'friend-wait'
        ? getEscapeTimeVariantBackground(
            escapeScreen25Background,
            escapeScreen25NightBackground,
            escapeScreen25LightBackground,
          )
      : escapeScreen25Stage === 'friend-join'
        ? getEscapeTimeVariantBackground(
            escapeScreen25FriendJoinBackground,
            escapeScreen25FriendJoinNightBackground,
          )
      : escapeScreen25Stage === 'friend-evacuation'
        ? getEscapeTimeVariantBackground(
            escapeScreen25FriendEvacuationBackground,
            escapeScreen25FriendEvacuationNightBackground,
          )
      : escapeScreen25Stage === 'friend-arrival'
        ? getEscapeTimeVariantBackground(
            escapeScreen25FriendSchoolBackground,
            escapeScreen25FriendSchoolNightBackground,
          )
      : escapeScreen25Stage === 'ufo-left' ||
          escapeScreen25Stage === 'ufo-left-silence' ||
          escapeScreen25Stage === 'ufo-left-sign'
        ? escapeScreen25ForkLeftBackground
      : escapeScreen25Stage === 'ufo-glow' ||
          escapeScreen25Stage === 'ufo-glow-close'
        ? escapeScreen25UfoBackground
      : escapeScreen25Stage === 'ufo-overlook' ||
          escapeScreen25Stage === 'ufo-overlook-float'
        ? escapeScreen25UfoBackground1
      : escapeScreen25Stage === 'ufo-pulled' ||
          escapeScreen25Stage === 'ufo-pulled-resist'
        ? escapeScreen25UfoBackground2
      : escapeScreen25Stage === 'ufo-aboard' ||
          escapeScreen25Stage === 'ufo-aboard-look' ||
          escapeScreen25Stage === 'ufo-meet' ||
          escapeScreen25Stage === 'ufo-stop'
        ? escapeScreen25UfoBackground3
      : getEscapeTimeVariantBackground(
          escapeScreen25Background,
          escapeScreen25NightBackground,
          escapeScreen25LightBackground,
        )
  const currentRadioUseBackground = isEscapeNightBackground
    ? radioUseNightBackground
    : radioUseBackground
  const currentHotBloodBackground =
    escapeHotBloodIndex < 2 ? hotBloodEndBackground : hotBloodEndBackground1
  const currentEscapeBackground =
    escapeScreen25Stage !== null
      ? currentEscapeScreen25Background
      : escapePhonePromptStage === 'hot-blood-run'
      ? currentHotBloodBackground
      : escapePhonePromptStage === 'radio-use'
      ? currentRadioUseBackground
      : escapePhonePromptStage === 'danger-road' ||
    escapePhonePromptStage === 'injury' ||
    escapePhonePromptStage === 'injury-no-treatment' ||
    escapePhonePromptStage === 'injury-backpack'
      ? currentDangerRoadBackground
      : escapePhonePromptStage === 'night-sign-found'
      ? currentEvacuationGuideBackground
      : escapePhonePromptStage === 'sign-found'
      ? currentEvacuationGuideBackground
      : escapeNoFoodRoadIndex !== null
        ? escapeNoFoodNightBackgrounds[escapeNoFoodRoadIndex]
      : escapeNoWaterRoadIndex !== null
        ? currentEscapeNoWaterRoadBackgrounds[escapeNoWaterRoadIndex]
        : escapePanicRoadIndex !== null
          ? currentEscapePanicRoadBackgrounds[escapePanicRoadIndex]
          : isEscapeNightBackground
            ? isEscapeLightOn
              ? currentEscapeStep.lightBackground
              : currentEscapeStep.nightBackground
            : currentEscapeStep.background
  const isEscapeScreen25CrackActive =
    escapeScreen25Stage === 'crack' || escapeScreen25Stage === 'crack-blocked'
  const isEscapePanicActive = escapePhonePromptStage === 'panic'
  const isEscapePanicVisualActive =
    isEscapePanicActive ||
    escapePhonePromptStage === 'water-backpack' ||
    escapePhonePromptStage === 'food-backpack' ||
    escapePhonePromptStage === 'last-push-backpack' ||
    escapePhonePromptStage === 'thirst-wandering' ||
    escapePhonePromptStage === 'thirst-aftermath' ||
    escapePhonePromptStage === 'no-food-panic'
  const isEscapePanicWandering =
    (isEscapePanicActive && escapePanicDialogueIndex === 2) ||
    escapePhonePromptStage === 'thirst-wandering' ||
    escapePhonePromptStage === 'no-food-panic'
  const isHotBloodEscapeActive = escapePhonePromptStage === 'hot-blood-run'
  const areEscapeScreen25ChoicesVisible =
    escapeScreen25Stage === 'choices' || escapeScreen25Stage === 'fork-choices'
  const isEscapeScreen25ForkChoicesVisible = escapeScreen25Stage === 'fork-choices'
  const canAdvanceEscapeScreen25Text =
    escapeScreen25Stage !== null &&
    escapeScreen25Stage !== 'choices' &&
    escapeScreen25Stage !== 'fork-choices'
  const isEscapeRouteChoiceOpen = escapeRouteChoiceStage !== null
  const isEscapeChoiceOpen = isEscapeRouteChoiceOpen || areEscapeScreen25ChoicesVisible
  const canAdvanceEscapeRouteText =
    escapeRouteChoiceStage === 'warning' || escapeRouteChoiceStage === 'prompt'
  const areEscapeRouteChoicesVisible = escapeRouteChoiceStage === 'choices'
  const isRoadChoiceShadeVisible =
    areEscapeRouteChoicesVisible || isEscapeScreen25ForkChoicesVisible
  const areRadioChoicesVisible = escapePhonePromptStage === 'radio-choice'
  const isEscapeLightButtonVisible =
    isEscape &&
    isEscapeNightBackground &&
    !isUiHidden &&
    !isEscapeChoiceOpen &&
    !areRadioChoicesVisible &&
    !isHotBloodEscapeActive &&
    !isEscapePanicWandering &&
    !isEscapePanicActive
  const activeEscapeGuideSteps =
    escapeGuideKind === 'initial'
      ? isEscapeNightBackground
        ? [...escapeGuideSteps, escapeLightGuideStep, escapeLightGuideDetailStep]
        : escapeGuideSteps
      : [escapeLightGuideStep, escapeLightGuideDetailStep]
  const currentEscapeGuideStep =
    activeEscapeGuideSteps[escapeGuideIndex] ?? activeEscapeGuideSteps[0]
  const isEscapeGuideTarget = (target: EscapeGuideTarget) =>
    isEscapeGuideActive && currentEscapeGuideStep.target === target
  const canAdvanceGuideRoute =
    isEscape &&
    isFollowingEvacuationGuide &&
    currentEscapeStep.id === 'safe-road' &&
    escapePhonePromptStage === null &&
    escapeRouteChoiceStage === null
  const canAdvanceEscapePhonePrompt =
    escapePhonePromptStage === 'dead' ||
    escapePhonePromptStage === 'phone-unavailable' ||
    escapePhonePromptStage === 'charging-wait' ||
    escapePhonePromptStage === 'panic' ||
    escapePhonePromptStage === 'after-water' ||
    escapePhonePromptStage === 'radio-use' ||
    escapePhonePromptStage === 'sign-found' ||
    escapePhonePromptStage === 'thirst-aftermath' ||
    escapePhonePromptStage === 'after-food' ||
    escapePhonePromptStage === 'after-food-energy' ||
    escapePhonePromptStage === 'after-food-search' ||
    escapePhonePromptStage === 'after-food-sign-search' ||
    escapePhonePromptStage === 'night-sign-found' ||
    escapePhonePromptStage === 'danger-road' ||
    escapePhonePromptStage === 'injury' ||
    escapePhonePromptStage === 'injury-no-treatment' ||
    escapePhonePromptStage === 'last-push' ||
    escapePhonePromptStage === 'hot-blood-run'
  const isEscapeBackpackPromptActive =
    escapePhonePromptStage === 'backpack' ||
    escapePhonePromptStage === 'water-backpack' ||
    escapePhonePromptStage === 'food-backpack' ||
    escapePhonePromptStage === 'injury-backpack' ||
    escapePhonePromptStage === 'last-push-backpack'
  const isEscapeBackpackGuideActive = isEscape && isEscapeBackpackPromptActive
  const escapeBackpackDialogue =
    escapePhonePromptStage === 'water-backpack'
      ? escapeWaterItemPromptDialogue
      : escapePhonePromptStage === 'food-backpack'
        ? escapeFoodItemPromptDialogue
        : escapePhonePromptStage === 'injury-backpack'
          ? escapeInjuryBackpackPromptDialogue
        : escapePhonePromptStage === 'last-push-backpack'
          ? escapeLastPushBackpackPromptDialogue
          : escapeBackpackPromptDialogue
  const isEscapePhoneBlocked =
    isEscape &&
    (escapePhonePowerState === 'dead' || escapePhonePowerState === 'charging')
  const isEscapePhoneUnavailable =
    isEscape && escapePhonePowerState === 'dead' && !isPhoneOpen
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
    isEscapeGuideActive ||
    escapeNoticeDialogue !== null ||
    canAdvanceEscapeScreen25Text ||
    canAdvanceEscapeRouteText ||
    canAdvanceGuideRoute ||
    canAdvanceEscapePhonePrompt ||
    isZoomCalibration ||
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
    isNormalEnd ||
    isUfoEnd ||
    isFriendsEnd ||
    isResultReview ||
    isRealLifeMessage
  const currentDialogue = isPreparationGuideActive
    ? currentPreparationGuideStep.dialogue
    : isEscapeGuideActive
      ? currentEscapeGuideStep.dialogue
    : escapeNoticeDialogue
      ? escapeNoticeDialogue
    : isZoomCalibration
      ? zoomCalibrationDialogues[dialogueIndex]
    : isBookWarning
      ? bookWarningDialogues[dialogueIndex]
    : escapeScreen25Stage === 'intro' || escapeScreen25Stage === 'choices'
      ? escapeScreen25IntroDialogue
    : escapeScreen25Stage === 'intro-observe'
      ? escapeScreen25IntroObserveDialogue
    : escapeScreen25Stage === 'intro-notification'
      ? escapeScreen25IntroNotificationDialogue
    : escapeScreen25Stage === 'shelter-start'
      ? escapeScreen25ShelterStartDialogue
    : escapeScreen25Stage === 'shelter-caution'
      ? escapeScreen25ShelterCautionDialogue
    : escapeScreen25Stage === 'crack'
      ? escapeScreen25CrackDialogue
    : escapeScreen25Stage === 'crack-blocked'
      ? escapeScreen25CrackBlockedDialogue
    : escapeScreen25Stage === 'fork-intro'
      ? escapeScreen25ForkIntroDialogue
    : escapeScreen25Stage === 'fork-choices'
      ? escapeScreen25ForkPromptDialogue
    : escapeScreen25Stage === 'right-road'
      ? escapeScreen25RightRoadDialogue
    : escapeScreen25Stage === 'right-road-check'
      ? escapeScreen25RightRoadCheckDialogue
    : escapeScreen25Stage === 'right-road-school'
      ? escapeScreen25RightRoadSchoolDialogue
    : escapeScreen25Stage === 'friend-wait'
      ? escapeScreen25FriendWaitDialogue
    : escapeScreen25Stage === 'friend-join'
      ? escapeScreen25FriendJoinDialogue
    : escapeScreen25Stage === 'friend-evacuation'
      ? escapeScreen25FriendEvacuationDialogue
    : escapeScreen25Stage === 'friend-arrival'
      ? escapeScreen25FriendArrivalDialogue
    : escapeScreen25Stage === 'ufo-left'
      ? escapeScreen25UfoLeftDialogue
    : escapeScreen25Stage === 'ufo-left-silence'
      ? escapeScreen25UfoLeftSilenceDialogue
    : escapeScreen25Stage === 'ufo-left-sign'
      ? escapeScreen25UfoLeftSignDialogue
    : escapeScreen25Stage === 'ufo-glow'
      ? escapeScreen25UfoGlowDialogue
    : escapeScreen25Stage === 'ufo-glow-close'
      ? escapeScreen25UfoGlowCloseDialogue
    : escapeScreen25Stage === 'ufo-overlook'
      ? escapeScreen25UfoOverlookDialogue
    : escapeScreen25Stage === 'ufo-overlook-float'
      ? escapeScreen25UfoOverlookFloatDialogue
    : escapeScreen25Stage === 'ufo-pulled'
      ? escapeScreen25UfoPulledDialogue
    : escapeScreen25Stage === 'ufo-pulled-resist'
      ? escapeScreen25UfoPulledResistDialogue
    : escapeScreen25Stage === 'ufo-aboard'
      ? escapeScreen25UfoAboardDialogue
    : escapeScreen25Stage === 'ufo-aboard-look'
      ? escapeScreen25UfoAboardLookDialogue
    : escapeScreen25Stage === 'ufo-meet'
      ? escapeScreen25UfoMeetDialogue
    : escapeScreen25Stage === 'ufo-stop'
      ? escapeScreen25UfoStopDialogue
    : isFutureBookCut
      ? bookWarningDialogues[0]
    : isRoomIntro
      ? roomIntroDialogues[roomIntroIndex]
      : isNight
        ? nightDialoguesByDay[currentDay as 1][nightDialogueIndex]
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
                  : isNormalEnd
                    ? normalEndDialogue
                    : isUfoEnd
                      ? ufoEndDialogue
                    : isFriendsEnd
                      ? friendsEndDialogue
                      : isResultReview
                        ? resultReviewDialogue
                        : isRealLifeMessage
                          ? realLifeDialogue
      : isPreparation && measureResultDialogue
        ? measureResultDialogue
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
                speaker: isEscapePhoneUnavailable ? '主人公' : 'ナレーション',
                text: isEscapePhoneUnavailable
                  ? 'スマホの充電がない。今は使えない。'
                  : 'スマホを確認しますか？',
              }
            : hoveredAction === 'furniture'
              ? {
                  speaker: 'ナレーション',
                  text: hasCompletedRoomMeasure
                    ? '部屋の対策はもう終えた。今日はこれ以上はできない。'
                    : '部屋の対策を確認しますか？',
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
                      : '明日、地震が起こるらしい……何か対策しないと。',
                }
              : hoveredAction === 'finish-day'
                ? {
                    speaker: 'ナレーション',
                    text:
                      currentDay === 0
                        ? '地震発生へ進みますか？'
                        : '今日の対策を終えて休みますか？明日は災害当日です。',
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
                  : backpackNoticeDialogue
                    ? backpackNoticeDialogue
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
                      : backpackReturnScreen === 'escape'
                        ? escapeBackpackDialogue
                        : {
                            speaker: 'ナレーション',
                            text: '非常用リュックに入れる準備をしよう。',
                          }
                : escapePhonePromptStage === 'dead'
                  ? escapePhoneDeadDialogue
                  : escapePhonePromptStage === 'phone-unavailable'
                    ? escapePhoneUnavailableDialogue
                  : escapePhonePromptStage === 'backpack'
                    ? escapeBackpackPromptDialogue
                    : escapePhonePromptStage === 'water-backpack'
                      ? escapeWaterBackpackPromptDialogue
                      : escapePhonePromptStage === 'food-backpack'
                        ? escapeFoodBackpackPromptDialogue
                      : escapePhonePromptStage === 'injury-backpack'
                        ? escapeInjuryBackpackPromptDialogue
                      : escapePhonePromptStage === 'last-push-backpack'
                        ? escapeLastPushBackpackPromptDialogue
                      : escapePhonePromptStage === 'charging-wait'
                        ? escapePhoneChargingWaitDialogue
                        : escapePhonePromptStage === 'panic'
                          ? escapePanicRoadIndex !== null
                            ? escapePanicWanderingDialogues[escapePanicRoadIndex]
                            : escapePhonePanicDialogues[escapePanicDialogueIndex]
                          : escapePhonePromptStage === 'after-water'
                            ? escapeCalmRecoveredDialogue
                            : escapePhonePromptStage === 'radio-choice'
                              ? escapeRadioChoiceDialogue
                              : escapePhonePromptStage === 'radio-use'
                                ? escapeRadioUseDialogue
                            : escapePhonePromptStage === 'sign-found'
                              ? escapeSignFoundDialogue
                              : escapePhonePromptStage === 'after-food'
                                ? escapeFoodRecoveredDialogue
                                : escapePhonePromptStage === 'after-food-energy'
                                  ? escapeFoodEnergyDialogue
                                : escapePhonePromptStage === 'after-food-search'
                                  ? escapeFoodSearchDialogue
                                : escapePhonePromptStage === 'after-food-sign-search'
                                  ? escapeFoodSignSearchDialogue
                                : escapePhonePromptStage === 'night-sign-found'
                                  ? escapeNightSignFoundDialogue
                                  : escapePhonePromptStage === 'danger-road'
                                    ? escapeDangerRoadDialogue
                                  : escapePhonePromptStage === 'injury'
                                    ? escapeInjuryDialogue
                                  : escapePhonePromptStage === 'injury-no-treatment'
                                    ? escapeInjuryNoTreatmentDialogue
                                  : escapePhonePromptStage === 'last-push'
                                    ? escapeLastPushDialogue
                                  : escapePhonePromptStage === 'hot-blood-run'
                                    ? escapeHotBloodDialogues[escapeHotBloodIndex]
                              : escapePhonePromptStage === 'thirst-wandering'
                                ? escapeNoWaterRoadIndex !== null
                                  ? escapeNoWaterWanderingDialogues[escapeNoWaterRoadIndex]
                                  : escapeNoWaterThirstDialogue
                                : escapePhonePromptStage === 'thirst-aftermath'
                                  ? escapeNoWaterAftermathDialogue
                                  : escapePhonePromptStage === 'no-food-panic'
                                    ? escapeNoFoodRoadIndex !== null
                                      ? escapeNoFoodWanderingDialogues[escapeNoFoodRoadIndex]
                                      : escapeNoFoodStartDialogue
                                  : escapeRouteChoiceStage === 'warning'
                                    ? escapeRouteWarningDialogue
                                    : escapeRouteChoiceStage === 'prompt'
                                      ? isEscapeRightRouteBlocked
                                        ? escapeRouteRetryPromptDialogue
                                        : escapeRoutePromptDialogue
                                      : isEscape
                                        ? currentEscapeStep.dialogue
                                        : preparationDialogue
  const currentDialoguePages = useMemo(
    () => splitDialogueText(currentDialogue.text),
    [currentDialogue.text],
  )
  const currentDialoguePageIndex = Math.min(
    dialoguePageIndex,
    currentDialoguePages.length - 1,
  )
  const currentDialogueText =
    currentDialoguePages[currentDialoguePageIndex] ?? currentDialogue.text
  const canAdvanceDialoguePage =
    currentDialoguePageIndex < currentDialoguePages.length - 1

  useEffect(() => {
    setDialoguePageIndex(0)
  }, [currentDialogue.speaker, currentDialogue.text])

  const isLastBookDialogue =
    isBookWarning && dialogueIndex === bookWarningDialogues.length - 1
  const isLastRoomIntroDialogue =
    isRoomIntro && roomIntroIndex === roomIntroDialogues.length - 1
  const isLastNightDialogue =
    isNight &&
    nightDialogueIndex ===
      nightDialoguesByDay[currentDay as 1].length - 1
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
    stopRadioSound()
    stopUfoSuctionSound()
    setScreen('start')
    setCurrentDay(1)
    setDialogueIndex(0)
    setDialoguePageIndex(0)
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
    setPendingContactResponseId(null)
    setContactReplyLog(createInitialContactReplyLog())
    setEscapeFriendMessages([])
    setEscapeFriendReplyStep(0)
    setIsEscapeFriendResponsePending(false)
    setIsEscapeFriendMessageRead(false)
    setIsEscapeFriendRouteComplete(false)
    setSelectedNewsArticleId(null)
    setIsShelterDetailOpen(false)
    setBackpackReturnScreen('preparation')
    setIsMeasuresOpen(false)
    setSelectedMeasure(null)
    setMeasureResultDialogue(null)
    setIsQuitMessageVisible(false)
    setIsDeveloperMode(false)
    setIsItemUseFlashActive(false)
    setIsScreenShaking(false)
    setHasCheckedEscapeShelter(false)
    setEscapeRouteChoiceStage(null)
    setEscapeScreen25Stage(null)
    setShouldOpenRouteChoiceAfterScreen25(false)
    setEscapePhonePowerState('normal')
    setEscapePhonePromptStage(null)
    setEscapeCalmRecoveryItemId(null)
    setEscapePanicDialogueIndex(0)
    setEscapePanicRoadIndex(null)
    setEscapeNoWaterRoadIndex(null)
    setEscapeNoFoodRoadIndex(null)
    setEscapeNoFoodPanicLevel(0)
    setEscapeHotBloodIndex(0)
    setIsHotBloodRescueComplete(false)
    setIsFollowingEvacuationGuide(false)
    setEscapeGuideKind(null)
    setEscapeGuideIndex(0)
    setEscapeNoticeDialogue(null)
    setIsEscapeRightRouteBlocked(false)
    setHoveredEscapeRouteChoice(null)
    setIsPreparationGuideActive(false)
    setHasSeenPreparationGuide(false)
    setHasSeenFinalPreparationGuide(false)
    setPreparationGuideKind('initial')
    setPreparationGuideIndex(0)
    setEscapeGuideKind(null)
    setEscapeGuideIndex(0)
    setHasSeenEscapeGuide(false)
    setHasSeenEscapeLightGuide(false)
    setIsRoomChangePreviewPending(false)
    setRoomChangePreviewDialogue(createRoomChangePreviewDialogue(false, false))
    setItemFlags(createInitialItemFlags())
    setPurchasedItemOrder([])
    setDailyShopPurchaseCounts(createInitialDailyShopPurchaseCounts())
    setResultReviewEndKind(null)
    setReviewMode('chart')
    setStoryFlags(createInitialStoryFlags())
    setRoomMeasureFlags(createInitialRoomMeasureFlags())
    setDialogueLog([bookWarningDialogues[0]])
  }

  const handleStartGame = (developerMode = false) => {
    setIsAudioEnabled(true)
    setIsDeveloperMode(developerMode)
    setDialogueIndex(0)
    setScreen('zoom-calibration')
    addDialogueLog(zoomCalibrationDialogues[0])
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

    audio.loop = shouldLoopActiveBgm

    void audio.play().catch(() => {
      // Browser autoplay policy can still block playback until a trusted gesture.
    })
  }, [activeBgmSrc, isAudioEnabled, shouldLoopActiveBgm])

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

  useEffect(() => {
    if (
      !isEscape ||
      hasSeenEscapeGuide ||
      isEscapeGuideActive ||
      isTransitioning ||
      isUiHidden ||
      isPhoneOpen ||
      escapeNoticeDialogue !== null ||
      escapePhonePromptStage !== null ||
      escapeScreen25Stage !== null ||
      escapeRouteChoiceStage !== null
    ) {
      return
    }

    setHoveredAction(null)
    setEscapeGuideKind('initial')
    setEscapeGuideIndex(0)
  }, [
    escapeNoticeDialogue,
    escapePhonePromptStage,
    escapeRouteChoiceStage,
    escapeScreen25Stage,
    hasSeenEscapeGuide,
    isEscape,
    isEscapeGuideActive,
    isPhoneOpen,
    isTransitioning,
    isUiHidden,
  ])

  useEffect(() => {
    if (
      !isEscapeLightButtonVisible ||
      !hasSeenEscapeGuide ||
      hasSeenEscapeLightGuide ||
      isEscapeGuideActive ||
      isTransitioning ||
      isPhoneOpen ||
      escapeNoticeDialogue !== null ||
      escapePhonePromptStage !== null ||
      escapeScreen25Stage !== null ||
      escapeRouteChoiceStage !== null
    ) {
      return
    }

    setHoveredAction(null)
    setEscapeGuideKind('light')
    setEscapeGuideIndex(0)
  }, [
    escapeNoticeDialogue,
    escapePhonePromptStage,
    escapeRouteChoiceStage,
    escapeScreen25Stage,
    hasSeenEscapeGuide,
    hasSeenEscapeLightGuide,
    isEscapeGuideActive,
    isEscapeLightButtonVisible,
    isPhoneOpen,
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

    setEscapeProgressOverride(isEscapeNightStart ? 80 : 40)
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
  }, [escapePhonePromptStage, escapePanicDialogueIndex, isEscapeNightStart])

  useEffect(() => {
    if (escapePhonePromptStage !== 'thirst-wandering') {
      return
    }

    setEscapeWaterLevel(0.35)
    setEscapeNoWaterRoadIndex(null)
    setEscapeNoFoodPanicLevel(isEscapeNightStart ? 0.2 : 0)
    if (isEscapeNightStart) {
      setEscapeProgressOverride(80)
    }

    const timers: number[] = []
    const addThirstLog = (dialogue: Dialogue) => {
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

    escapeNoWaterWanderingDialogues.forEach((dialogue, index) => {
      timers.push(
        window.setTimeout(
          () => {
            showPanicFade()
            setEscapeNoWaterRoadIndex(index)
            if (isEscapeNightStart) {
              setEscapeNoFoodPanicLevel(0.28 + index * 0.16)
            }
            addThirstLog(dialogue)
          },
          2000 + index * 2000,
        ),
      )
    })

    timers.push(
      window.setTimeout(() => {
        showPanicFade()

        if (isEscapeNightStart) {
          setEscapeNoFoodPanicLevel(1)
          return
        }

        setEscapeNoWaterRoadIndex(null)
        setEscapeProgressOverride(60)
        setEscapeFoodLevel(0.35)
        setIsEscapeLightOn(false)
        setEscapePhonePromptStage('thirst-aftermath')
        addThirstLog(escapeNoWaterAftermathDialogue)
      }, 10000),
    )

    if (isEscapeNightStart) {
      timers.push(
        window.setTimeout(() => {
          setEscapeOutcome('bad')
          setEscapePhonePromptStage(null)
          setEscapeNoWaterRoadIndex(null)
          setEscapeNoFoodPanicLevel(0)
          setIsLogOpen(false)
          setIsUiHidden(false)
          setScreen('bad-end')
          addThirstLog(badEndDialogue)
        }, 10800),
      )
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      setIsEscapePanicFading(false)
    }
  }, [escapePhonePromptStage, isEscapeNightStart])

  useEffect(() => {
    if (escapePhonePromptStage !== 'no-food-panic') {
      return
    }

    setEscapeWaterLevel(0.35)
    setEscapeFoodLevel(0.35)
    setEscapeProgressOverride(75)
    setEscapeNoFoodRoadIndex(null)
    setEscapeNoFoodPanicLevel(0.22)

    const timers: number[] = []
    const addNoFoodLog = (dialogue: Dialogue) => {
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

    escapeNoFoodWanderingDialogues.forEach((dialogue, index) => {
      timers.push(
        window.setTimeout(
          () => {
            showPanicFade()
            setEscapeNoFoodRoadIndex(index)
            setEscapeNoFoodPanicLevel(0.3 + index * 0.16)
            addNoFoodLog(dialogue)
          },
          1800 + index * 2000,
        ),
      )
    })

    timers.push(
      window.setTimeout(() => {
        setEscapeNoFoodPanicLevel(1)
      }, 9800),
    )

    timers.push(
      window.setTimeout(() => {
        setEscapeOutcome('bad')
        setEscapePhonePromptStage(null)
        setEscapeNoFoodRoadIndex(null)
        setEscapeNoFoodPanicLevel(0)
        setIsLogOpen(false)
        setIsUiHidden(false)
        setScreen('bad-end')
        addNoFoodLog(badEndDialogue)
      }, 10800),
    )

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      setIsEscapePanicFading(false)
    }
  }, [escapePhonePromptStage])

  const playSound = (src: string, volume: number) => {
    const audio = new Audio(src)

    if (volume > 1 && window.AudioContext) {
      audio.volume = 1

      const audioContext = new AudioContext()
      const source = audioContext.createMediaElementSource(audio)
      const gain = audioContext.createGain()

      gain.gain.value = volume
      source.connect(gain)
      gain.connect(audioContext.destination)
      audio.addEventListener('ended', () => {
        void audioContext.close().catch(() => {
          // Closing the context is best-effort after short one-shot sounds.
        })
      })

      void audioContext.resume().catch(() => {
        // Audio resume is best-effort if the browser has not unlocked audio yet.
      })
    } else {
      audio.volume = Math.min(volume, 1)
    }

    void audio.play().catch(() => {
      // Sound effects are best-effort if the browser has not unlocked audio yet.
    })

    return audio
  }

  const playItemUseSound = () => {
    playSound(itemUseSound, 0.8)
  }

  const playDrinkSound = () => {
    playSound(drinkSound, 2)
  }

  const playEatSound = () => {
    playSound(eatSound, 2)
  }

  const stopRadioSound = () => {
    if (!radioAudioRef.current) {
      return
    }

    radioAudioRef.current.pause()
    radioAudioRef.current.currentTime = 0
    radioAudioRef.current = null
  }

  const playRadioSound = () => {
    stopRadioSound()
    radioAudioRef.current = playSound(radioSound, 0.74)
  }

  const stopUfoSuctionSound = () => {
    if (!ufoSuctionAudioRef.current) {
      return
    }

    ufoSuctionAudioRef.current.pause()
    ufoSuctionAudioRef.current.currentTime = 0
    ufoSuctionAudioRef.current = null
  }

  const playUfoSuctionSound = () => {
    if (ufoSuctionAudioRef.current) {
      return
    }

    stopUfoSuctionSound()
    const audio = playSound(ufoSuctionSound, 0.9)
    if (audio) {
      audio.loop = true
      ufoSuctionAudioRef.current = audio
    }
  }

  const playBackpackItemUseSound = (itemId: ItemId) => {
    if (itemId === 'water') {
      playDrinkSound()
      return
    }

    if (foodSoundItemIds.includes(itemId)) {
      playEatSound()
      return
    }

    playItemUseSound()
  }

  const triggerItemUseFlash = () => {
    setIsItemUseFlashActive(true)
    window.setTimeout(() => {
      setIsItemUseFlashActive(false)
    }, 560)
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

  const startScreenShakeWithGroundRumble = () => {
    setIsScreenShaking(true)

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
  }

  useEffect(() => {
    if (isUfoSuctionAudioActive) {
      playUfoSuctionSound()
      return stopUfoSuctionSound
    }

    stopUfoSuctionSound()
    return undefined
  }, [isUfoSuctionAudioActive])

  // ショップで商品を購入したときの処理。
  // purchasedを+1して購入数として管理する。
  const handleBuyItem = (itemId: ItemId, itemName: string) => {
    if (remainingShopPurchases <= 0) {
      addDialogueLog({
        speaker: 'ナレーション',
        text: '時間もお金も限られている。今日は三つだけ買おう。',
      })
      return
    }

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

    setDailyShopPurchaseCounts((current) => ({
      ...current,
      [currentDay]: (current[currentDay] ?? 0) + 1,
    }))

    addDialogueLog({
      speaker: 'ナレーション',
      text: `${itemName}を購入した。`,
    })
  }

  const handleBackpackItemClick = (item: BackpackItem) => {
    if (itemFlags[item.id].packed > 0) {
      setBackpackNoticeDialogue(null)
      addDialogueLog({
        speaker: 'ナレーション',
        text: `${item.name}は使用済みです。`,
      })
      return
    }

    if (!canUseBackpackItemNow(item.id)) {
      setSelectedItem(null)
      setBackpackNoticeDialogue(cannotUseBackpackItemDialogue)
      addDialogueLog(cannotUseBackpackItemDialogue)
      return
    }

    setBackpackNoticeDialogue(null)
    setSelectedItem(item)
  }

  const createNextRoomChangePreviewDialogue = (usedItemId?: ItemId) =>
    createRoomChangePreviewDialogue(
      usedItemId === 'furniture-fasteners' || isFurnitureFastenerUsed,
      usedItemId === 'window-film' || isWindowFilmUsed,
    )

  const returnFromPreparationBackpack = () => {
    setHoveredItem(null)
    setSelectedItem(null)
    setBackpackNoticeDialogue(null)
    setIsRoomChangePreviewPending(false)

    addDialogueLog(preparationDialogue)
    setScreen('preparation')
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

    if (!canUseBackpackItemNow(selectedItem.id)) {
      setBackpackNoticeDialogue(cannotUseBackpackItemDialogue)
      addDialogueLog(cannotUseBackpackItemDialogue)
      setSelectedItem(null)
      return
    }

    playBackpackItemUseSound(selectedItem.id)

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

    triggerItemUseFlash()

    if (
      selectedItem.id === 'furniture-fasteners' ||
      selectedItem.id === 'window-film'
    ) {
      const nextRoomChangePreviewDialogue = createNextRoomChangePreviewDialogue(
        selectedItem.id,
      )

      setRoomChangePreviewDialogue(nextRoomChangePreviewDialogue)

      if (backpackReturnScreen !== 'escape') {
        setIsRoomChangePreviewPending(false)
        setHoveredItem(null)
        setSelectedItem(null)
        setBackpackNoticeDialogue(null)
        setMeasureResultDialogue(nextRoomChangePreviewDialogue)
        addDialogueLog(nextRoomChangePreviewDialogue)
        setScreen('preparation')
        return
      }

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
      setEscapeNoWaterRoadIndex(null)
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

    if (
      escapeCalmRecoveryItemIds.includes(selectedItem.id) &&
      backpackReturnScreen === 'escape' &&
      escapePhonePromptStage === 'water-backpack'
    ) {
      const recoveryDialogue =
        selectedItem.id === 'medication'
          ? escapeMedicationRecoveredDialogue
          : escapeWaterRecoveredDialogue

      setEscapeWaterLevel(selectedItem.id === 'water' ? 1 : 0.35)
      setEscapePhonePromptStage('after-water')
      setEscapeCalmRecoveryItemId(selectedItem.id)
      setEscapePanicDialogueIndex(0)
      setEscapePanicRoadIndex(null)
      setEscapeNoWaterRoadIndex(null)
      setHoveredItem(null)
      setSelectedItem(null)
      setScreen('escape')
      addDialogueLog(recoveryDialogue)
      return
    }

    if (
      escapeFoodRecoveryItemIds.includes(selectedItem.id) &&
      backpackReturnScreen === 'escape' &&
      escapePhonePromptStage === 'food-backpack'
    ) {
      setEscapeFoodLevel(1)
      setEscapePhonePromptStage('after-food')
      setEscapePanicDialogueIndex(0)
      setEscapePanicRoadIndex(null)
      setEscapeNoWaterRoadIndex(null)
      setEscapeNoFoodRoadIndex(null)
      setHoveredItem(null)
      setSelectedItem(null)
      setScreen('escape')
      addDialogueLog(escapeFoodRecoveredDialogue)
      return
    }

    if (
      escapeLastPushItemIds.includes(selectedItem.id) &&
      backpackReturnScreen === 'escape' &&
      escapePhonePromptStage === 'last-push-backpack'
    ) {
      setEscapeFoodLevel(0.35)
      setEscapePhonePromptStage('last-push')
      setEscapeHotBloodIndex(0)
      setEscapeNoFoodRoadIndex(null)
      setEscapeNoFoodPanicLevel(0)
      setHoveredItem(null)
      setSelectedItem(null)
      setScreen('escape')
      addDialogueLog(escapeLastPushDialogue)
      return
    }

    if (
      escapeInjuryTreatmentItemIds.includes(selectedItem.id) &&
      backpackReturnScreen === 'escape' &&
      escapePhonePromptStage === 'injury-backpack'
    ) {
      setEscapePhonePromptStage(null)
      setHoveredItem(null)
      setSelectedItem(null)
      setScreen('escape')
      addDialogueLog(escapeInjuryTreatedDialogue)
      advanceEscapeStep()
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
    if (nextView === 'contact' && isEscapeFriendNotificationAvailable) {
      setPhoneAppView('contact')
      setSelectedContactId('friend')
      setIsEscapeFriendMessageRead(true)
      setIsContactReplyMenuOpen(false)
      setSelectedNewsArticleId(null)
      setIsShelterDetailOpen(false)
      if (escapeFriendMessages.length === 0) {
        setEscapeFriendMessages(escapeFriendInitialMessages)
      }
      addDialogueLog({
        speaker: 'ナレーション',
        text: '友人からメッセージが届いている。',
      })
      return
    }

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

  const handleOpenEscapeFriendMessages = () => {
    if (!isEscapeFriendNotificationAvailable) {
      return
    }

    setPhoneAppView('contact')
    setSelectedContactId('friend')
    setIsEscapeFriendMessageRead(true)
    setIsContactReplyMenuOpen(false)
    setSelectedNewsArticleId(null)
    setIsShelterDetailOpen(false)
    if (escapeFriendMessages.length === 0) {
      setEscapeFriendMessages(escapeFriendInitialMessages)
    }
  }

  const handleOpenPhone = () => {
    if (
      escapePhonePromptStage === 'water-backpack' ||
      escapePhonePromptStage === 'food-backpack' ||
      escapePhonePromptStage === 'injury-backpack' ||
      escapePhonePromptStage === 'last-push-backpack'
    ) {
      setHoveredAction(null)
      return
    }

    setHoveredAction(null)
    setPhoneAppView('home')
    setSelectedContactId(null)
    setIsContactReplyMenuOpen(false)
    setSelectedNewsArticleId(null)
    setIsShelterDetailOpen(false)
    setHasCheckedEscapeShelter(false)

    if (isEscapeFriendNotificationAvailable) {
      setIsPhoneOpen(true)
      return
    }

    if (
      isEscape &&
      escapePhonePowerState === 'dead' &&
      escapePhonePromptStage === null
    ) {
      setEscapePhonePromptStage('phone-unavailable')
      addDialogueLog(escapePhoneUnavailableDialogue)
      return
    }

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

  const handleToggleEscapeLight = () => {
    setHoveredAction(null)

    if (isEscapeLightOn) {
      setIsEscapeLightOn(false)
      setEscapeNoticeDialogue(null)
      return
    }

    if (!hasEscapeLightSource) {
      setEscapeNoticeDialogue(escapeLightUnavailableDialogue)
      addDialogueLog(escapeLightUnavailableDialogue)
      return
    }

    setEscapeNoticeDialogue(null)
    setIsEscapeLightOn(true)
  }

  const advanceEscapeStep = (options?: {
    openRouteChoiceFromGuide?: boolean
    skipScreen25?: boolean
  }) => {
    if (isTransitioning) {
      return
    }

    if (
      isEscape &&
      currentEscapeStep.id === 'route-check' &&
      !options?.skipScreen25
    ) {
      setEscapeScreen25Stage('intro')
      setShouldOpenRouteChoiceAfterScreen25(Boolean(options?.openRouteChoiceFromGuide))
      setEscapePhonePromptStage(null)
      setEscapeRouteChoiceStage(null)
      setHoveredEscapeRouteChoice(null)
      if (
        hasPreparedFriendChat &&
        escapePhonePowerState !== 'dead' &&
        !isEscapeFriendRouteComplete &&
        escapeFriendMessages.length === 0
      ) {
        setEscapeFriendMessages(escapeFriendInitialMessages)
        setIsEscapeFriendMessageRead(false)
        setEscapeFriendReplyStep(0)
      }
      addDialogueLog(escapeScreen25IntroDialogue)
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

      if (options?.openRouteChoiceFromGuide && result.step.id === 'near-shelter') {
        setEscapeRouteChoiceStage('warning')
        setHoveredEscapeRouteChoice(null)
        addDialogueLog(escapeRouteWarningDialogue)
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

  const continueFromEscapeScreen25ToMainRoute = () => {
    setEscapeScreen25Stage(null)
    setHoveredEscapeRouteChoice(null)
    advanceEscapeStep({
      openRouteChoiceFromGuide: shouldOpenRouteChoiceAfterScreen25,
      skipScreen25: true,
    })
    setShouldOpenRouteChoiceAfterScreen25(false)
  }

  const handleChooseEscapeScreen25Action = (action: 'shelter' | 'wait') => {
    if (action === 'shelter') {
      setEscapeScreen25Stage('shelter-start')
      addDialogueLog({
        speaker: 'ナレーション',
        text: '避難所へ向かって進むことにした。',
      })
      addDialogueLog(escapeScreen25ShelterStartDialogue)
      return
    }

    setEscapeScreen25Stage('crack')
    setHoveredEscapeRouteChoice(null)
    startScreenShakeWithGroundRumble()
    addDialogueLog({
      speaker: 'ナレーション',
      text: '少しここで人を待つことにした。',
    })
    addDialogueLog(escapeScreen25CrackDialogue)
  }

  const handleChooseEscapeScreen25Fork = (route: 'right' | 'left') => {
    setHoveredEscapeRouteChoice(null)

    if (route === 'right') {
      if (isEscapeNightBackground) {
        setEscapeProgressOverride(Math.max(escapeProgressPercent, 60))
      }

      setEscapeScreen25Stage('right-road')
      setIsFollowingEvacuationGuide(false)
      setEscapeOutcome('true')
      addDialogueLog({
        speaker: 'ナレーション',
        text: '右の道へ進むことにした。',
      })
      addDialogueLog(escapeScreen25RightRoadDialogue)
      return
    }

    setEscapeScreen25Stage('ufo-left')
    addDialogueLog({
      speaker: 'ナレーション',
      text: '左の道へ進むことにした。',
    })
    addDialogueLog(escapeScreen25UfoLeftDialogue)
  }

  const handleChooseEscapeRoute = (route: 'right' | 'left') => {
    setHoveredEscapeRouteChoice(null)
    setEscapeRouteChoiceStage(null)

    if (route === 'right') {
      if (isEscapeRightRouteBlocked) {
        addDialogueLog({
          speaker: '主人公',
          text: '右の道は危険だ。もう一度入るのはやめよう。',
        })
        setEscapeRouteChoiceStage('choices')
        return
      }

      setEscapePhonePromptStage('danger-road')
      addDialogueLog({
        speaker: 'ナレーション',
        text: '右の道へ進むことにした。',
      })
      addDialogueLog(escapeDangerRoadDialogue)
      return
    }

    addDialogueLog({
      speaker: 'ナレーション',
      text: '左の道へ進むことにした。',
    })
    if (!isEscapeNightBackground) {
      setEscapeProgressOverride(Math.min(escapeProgressPercent, 55))
    }
    advanceEscapeStep()
  }

  const handleChooseRadioUse = (shouldUseRadio: boolean) => {
    if (shouldUseRadio) {
      setEscapePhonePromptStage('radio-use')
      playRadioSound()
      addDialogueLog(escapeRadioUseDialogue)
      return
    }

    stopRadioSound()
    setEscapePhonePromptStage('sign-found')
    addDialogueLog(escapeRadioSkipDialogue)
    addDialogueLog(escapeSignFoundDialogue)
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

  const handleEscapeFriendReply = () => {
    if (!currentEscapeFriendReply || isEscapeFriendResponsePending) {
      return
    }

    const nextStep = escapeFriendReplyStep + 1

    setIsContactReplyMenuOpen(false)
    setIsEscapeFriendResponsePending(true)
    setEscapeFriendMessages((current) => [
      ...current,
      { from: 'me', text: currentEscapeFriendReply.text },
    ])

    window.setTimeout(() => {
      setEscapeFriendMessages((current) => [
        ...current,
        { from: 'them', text: currentEscapeFriendReply.response },
      ])
      setEscapeFriendReplyStep(nextStep)
      setIsEscapeFriendResponsePending(false)

      if (nextStep >= escapeFriendReplySteps.length) {
        window.setTimeout(() => {
          setTransitionText('-友人を待って-')
          setIsTransitioning(true)
          setIsPhoneOpen(false)
          setPhoneAppView('home')
          setSelectedContactId(null)
          setIsContactReplyMenuOpen(false)
          window.setTimeout(() => {
            setIsEscapeFriendRouteComplete(true)
            setEscapeScreen25Stage('friend-wait')
            addDialogueLog(escapeScreen25FriendWaitDialogue)
            finishTransition()
          }, 140)
        }, 720)
      }
    }, 620)
  }

  // 部屋対策の「はい」を押したときの処理。
  // 選んだ対策を実行済みとして保存する。
  const handleConfirmMeasure = () => {
    if (!selectedMeasure || hasCompletedRoomMeasure) {
      return
    }

    const resultDialogue = roomMeasureResultDialogues[selectedMeasure] ?? {
      speaker: 'ナレーション',
      text: `${selectedMeasure}を実行した。部屋の危険を少し減らせた。`,
    }

    setRoomMeasureFlags((current) => ({
      ...current,
      [selectedMeasure]: true,
    }))

    playItemUseSound()
    triggerItemUseFlash()
    setMeasureResultDialogue(resultDialogue)
    setIsRoomChangePreviewPending(false)
    addDialogueLog(resultDialogue)

    setSelectedMeasure(null)
    setIsMeasuresOpen(false)
    setScreen('preparation')
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
    setMeasureResultDialogue(null)

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
      addDialogueLog(nightDialoguesByDay[currentDay as 1][0])
    }, 140)

    finishTransition()
  }

  const jumpToFinalPreparation = () => {
    setCurrentDay(0)
    setScreen('day-start')
    setHoveredAction(null)
    setHoveredItem(null)
    setSelectedItem(null)
    setIsUiHidden(false)
    setIsLogOpen(false)
    setIsPhoneOpen(false)
    setIsMeasuresOpen(false)
    setSelectedMeasure(null)
    setMeasureResultDialogue(null)
    setIsPreparationGuideActive(false)
    setHasSeenFinalPreparationGuide(false)
    setPreparationGuideKind('final')
    setPreparationGuideIndex(0)
    setDayStartDialogueIndex(0)
    addDialogueLog(dayStartDialoguesByDay[0][0])
  }

  const jumpToEscapePart = () => {
    stopRadioSound()
    setScreen('escape')
    setEscapeOutcome('true')
    setIsEscapeLightOn(false)
    setEscapeWaterLevel(1)
    setEscapeFoodLevel(1)
    setEscapeProgressOverride(null)
    setEscapeCalmRecoveryItemId(null)
    setEscapePanicDialogueIndex(0)
    setEscapePanicRoadIndex(null)
    setEscapeNoWaterRoadIndex(null)
    setEscapeHotBloodIndex(0)
    setIsHotBloodRescueComplete(false)
    setIsFollowingEvacuationGuide(false)
    setEscapeNoticeDialogue(null)
    setIsEscapeRightRouteBlocked(false)
    setEscapeScreen25Stage(null)
    setShouldOpenRouteChoiceAfterScreen25(false)
    setEscapeFriendMessages([])
    setEscapeFriendReplyStep(0)
    setIsEscapeFriendResponsePending(false)
    setIsEscapeFriendMessageRead(false)
    setIsEscapeFriendRouteComplete(false)
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
    setPendingContactResponseId(null)
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

    if (escapeNoticeDialogue) {
      setEscapeNoticeDialogue(null)
      setHoveredAction(null)
      return
    }

    if (isEscapeGuideActive) {
      const nextGuideIndex = escapeGuideIndex + 1

      if (nextGuideIndex >= activeEscapeGuideSteps.length) {
        if (escapeGuideKind === 'initial') {
          setHasSeenEscapeGuide(true)
          if (activeEscapeGuideSteps.some((step) => step.target === 'light')) {
            setHasSeenEscapeLightGuide(true)
          }
        }

        if (escapeGuideKind === 'light') {
          setHasSeenEscapeLightGuide(true)
        }

        setEscapeGuideKind(null)
        setEscapeGuideIndex(0)
        setHoveredAction(null)
        return
      }

      setEscapeGuideIndex(nextGuideIndex)
      setHoveredAction(null)
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

    if (escapeScreen25Stage === 'intro') {
      setEscapeScreen25Stage('intro-observe')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25IntroObserveDialogue)
      return
    }

    if (escapeScreen25Stage === 'intro-observe') {
      if (hasUnreadEscapeFriendMessage) {
        setEscapeScreen25Stage('intro-notification')
        setHoveredAction(null)
        addDialogueLog(escapeScreen25IntroNotificationDialogue)
        return
      }

      setEscapeScreen25Stage('choices')
      setHoveredAction(null)
      return
    }

    if (escapeScreen25Stage === 'intro-notification') {
      setEscapeScreen25Stage('choices')
      setHoveredAction(null)
      return
    }

    if (escapeScreen25Stage === 'choices') {
      return
    }

    if (escapeScreen25Stage === 'shelter-start') {
      setEscapeScreen25Stage('shelter-caution')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25ShelterCautionDialogue)
      return
    }

    if (escapeScreen25Stage === 'shelter-caution') {
      continueFromEscapeScreen25ToMainRoute()
      return
    }

    if (escapeScreen25Stage === 'crack') {
      setEscapeScreen25Stage('crack-blocked')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25CrackBlockedDialogue)
      return
    }

    if (escapeScreen25Stage === 'crack-blocked') {
      setEscapeScreen25Stage('fork-intro')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25ForkIntroDialogue)
      return
    }

    if (escapeScreen25Stage === 'fork-intro') {
      setEscapeScreen25Stage('fork-choices')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25ForkPromptDialogue)
      return
    }

    if (escapeScreen25Stage === 'fork-choices') {
      return
    }

    if (escapeScreen25Stage === 'right-road') {
      setEscapeScreen25Stage('right-road-check')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25RightRoadCheckDialogue)
      return
    }

    if (escapeScreen25Stage === 'right-road-check') {
      setEscapeScreen25Stage('right-road-school')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25RightRoadSchoolDialogue)
      return
    }

    if (escapeScreen25Stage === 'right-road-school') {
      setEscapeScreen25Stage(null)
      setShouldOpenRouteChoiceAfterScreen25(false)
      setHoveredAction(null)
      setScreen('shelter-arrival')
      addDialogueLog(shelterArrivalDialogue)
      return
    }

    if (escapeScreen25Stage === 'friend-wait') {
      setEscapeScreen25Stage('friend-join')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25FriendJoinDialogue)
      return
    }

    if (escapeScreen25Stage === 'friend-join') {
      setEscapeScreen25Stage('friend-evacuation')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25FriendEvacuationDialogue)
      return
    }

    if (escapeScreen25Stage === 'friend-evacuation') {
      setEscapeScreen25Stage('friend-arrival')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25FriendArrivalDialogue)
      return
    }

    if (escapeScreen25Stage === 'friend-arrival') {
      setTransitionText('-Friends End-')
      setIsTransitioning(true)
      setHoveredAction(null)

      window.setTimeout(() => {
        setEscapeScreen25Stage(null)
        setShouldOpenRouteChoiceAfterScreen25(false)
        setIsLogOpen(false)
        setScreen('friends-end')
        addDialogueLog(friendsEndDialogue)
      }, 140)

      finishTransition()
      return
    }

    if (escapeScreen25Stage === 'ufo-left') {
      setEscapeScreen25Stage('ufo-left-silence')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25UfoLeftSilenceDialogue)
      return
    }

    if (escapeScreen25Stage === 'ufo-left-silence') {
      setEscapeScreen25Stage('ufo-left-sign')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25UfoLeftSignDialogue)
      return
    }

    if (escapeScreen25Stage === 'ufo-left-sign') {
      setEscapeScreen25Stage('ufo-glow')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25UfoGlowDialogue)
      return
    }

    if (escapeScreen25Stage === 'ufo-glow') {
      setEscapeScreen25Stage('ufo-glow-close')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25UfoGlowCloseDialogue)
      return
    }

    if (escapeScreen25Stage === 'ufo-glow-close') {
      setEscapeScreen25Stage('ufo-overlook')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25UfoOverlookDialogue)
      return
    }

    if (escapeScreen25Stage === 'ufo-overlook') {
      setEscapeScreen25Stage('ufo-overlook-float')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25UfoOverlookFloatDialogue)
      return
    }

    if (escapeScreen25Stage === 'ufo-overlook-float') {
      setEscapeScreen25Stage('ufo-pulled')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25UfoPulledDialogue)
      return
    }

    if (escapeScreen25Stage === 'ufo-pulled') {
      setEscapeScreen25Stage('ufo-pulled-resist')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25UfoPulledResistDialogue)
      return
    }

    if (escapeScreen25Stage === 'ufo-pulled-resist') {
      setEscapeScreen25Stage('ufo-aboard')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25UfoAboardDialogue)
      return
    }

    if (escapeScreen25Stage === 'ufo-aboard') {
      setEscapeScreen25Stage('ufo-aboard-look')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25UfoAboardLookDialogue)
      return
    }

    if (escapeScreen25Stage === 'ufo-aboard-look') {
      setEscapeScreen25Stage('ufo-meet')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25UfoMeetDialogue)
      return
    }

    if (escapeScreen25Stage === 'ufo-meet') {
      setEscapeScreen25Stage('ufo-stop')
      setHoveredAction(null)
      addDialogueLog(escapeScreen25UfoStopDialogue)
      return
    }

    if (escapeScreen25Stage === 'ufo-stop') {
      setTransitionText('-UFO End-')
      setIsTransitioning(true)
      setHoveredAction(null)

      window.setTimeout(() => {
        setEscapeScreen25Stage(null)
        setIsLogOpen(false)
        setScreen('ufo-end')
        addDialogueLog(ufoEndDialogue)
      }, 140)

      finishTransition()
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

    if (escapePhonePromptStage === 'phone-unavailable') {
      setEscapePhonePromptStage(null)
      setHoveredAction(null)
      addDialogueLog(currentEscapeStep.dialogue)
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

    if (escapePhonePromptStage === 'after-water') {
      setTransitionText(null)
      setIsTransitioning(true)
      setHoveredAction(null)

      window.setTimeout(() => {
        if (isRadioUsable) {
          setEscapePhonePromptStage('radio-choice')
          addDialogueLog(escapeRadioChoiceDialogue)
          return
        }

        setEscapePhonePromptStage('sign-found')
        addDialogueLog(escapeSignFoundDialogue)
      }, 140)

      finishTransition()
      return
    }

    if (escapePhonePromptStage === 'radio-use') {
      setTransitionText(null)
      setIsTransitioning(true)
      setHoveredAction(null)

      window.setTimeout(() => {
        stopRadioSound()
        setEscapePhonePromptStage('sign-found')
        addDialogueLog(escapeSignFoundDialogue)
      }, 140)

      finishTransition()
      return
    }

    if (escapePhonePromptStage === 'sign-found') {
      setEscapePhonePromptStage(null)
      setEscapeProgressOverride(null)
      setIsFollowingEvacuationGuide(true)
      setHoveredAction(null)
      advanceEscapeStep({ openRouteChoiceFromGuide: true })
      return
    }

    if (escapePhonePromptStage === 'thirst-aftermath') {
      setEscapeWaterLevel(0.35)
      setEscapeFoodLevel(0.35)
      setEscapeProgressOverride(60)
      setIsEscapeLightOn(false)
      setHoveredAction(null)

      if (isFoodRecoveryUsable) {
        setEscapePhonePromptStage('food-backpack')
        addDialogueLog(escapeFoodBackpackPromptDialogue)
        return
      }

      if (isLastPushItemUsable) {
        setEscapePhonePromptStage('last-push-backpack')
        addDialogueLog(escapeLastPushBackpackPromptDialogue)
        return
      }

      setEscapePhonePromptStage('no-food-panic')
      setEscapeNoFoodRoadIndex(null)
      setEscapeNoFoodPanicLevel(0.16)
      addDialogueLog(escapeNoFoodStartDialogue)
      return
    }

    if (escapePhonePromptStage === 'after-food') {
      setEscapePhonePromptStage('after-food-energy')
      setHoveredAction(null)
      addDialogueLog(escapeFoodEnergyDialogue)
      return
    }

    if (escapePhonePromptStage === 'after-food-energy') {
      setEscapePhonePromptStage('after-food-search')
      setHoveredAction(null)
      addDialogueLog(escapeFoodSearchDialogue)
      return
    }

    if (escapePhonePromptStage === 'after-food-search') {
      setEscapePhonePromptStage('after-food-sign-search')
      setHoveredAction(null)
      addDialogueLog(escapeFoodSignSearchDialogue)
      return
    }

    if (escapePhonePromptStage === 'after-food-sign-search') {
      setTransitionText(null)
      setIsTransitioning(true)
      setHoveredAction(null)

      window.setTimeout(() => {
        setEscapePhonePromptStage('night-sign-found')
        addDialogueLog(escapeNightSignFoundDialogue)
      }, 140)

      finishTransition()
      return
    }

    if (escapePhonePromptStage === 'night-sign-found') {
      setEscapePhonePromptStage(null)
      setEscapeProgressOverride(60)
      setIsEscapeLightOn(false)
      setIsFollowingEvacuationGuide(true)
      setHoveredAction(null)
      advanceEscapeStep({ openRouteChoiceFromGuide: true })
      return
    }

    if (escapePhonePromptStage === 'danger-road') {
      setEscapePhonePromptStage('injury')
      setHoveredAction(null)
      addDialogueLog(escapeInjuryDialogue)
      return
    }

    if (escapePhonePromptStage === 'injury') {
      setHoveredAction(null)

      if (isInjuryTreatmentUsable) {
        setEscapePhonePromptStage('injury-backpack')
        addDialogueLog(escapeInjuryBackpackPromptDialogue)
        return
      }

      setEscapePhonePromptStage('injury-no-treatment')
      addDialogueLog(escapeInjuryNoTreatmentDialogue)
      return
    }

    if (escapePhonePromptStage === 'injury-no-treatment') {
      const nextProgressPercent = Math.min(90, escapeProgressPercent + 10)

      setTransitionText(null)
      setIsTransitioning(true)
      setHoveredAction(null)

      window.setTimeout(() => {
        setEscapePhonePromptStage(null)
        setEscapeProgressOverride(nextProgressPercent)
        setIsEscapeRightRouteBlocked(true)
        setEscapeRouteChoiceStage('prompt')
        setHoveredEscapeRouteChoice(null)
        addDialogueLog(escapeRouteRetryPromptDialogue)
      }, 140)

      finishTransition()
      return
    }

    if (escapePhonePromptStage === 'last-push') {
      setEscapePhonePromptStage('hot-blood-run')
      setEscapeHotBloodIndex(0)
      setHoveredAction(null)
      addDialogueLog(escapeHotBloodDialogues[0])
      return
    }

    if (escapePhonePromptStage === 'hot-blood-run') {
      const nextHotBloodIndex = escapeHotBloodIndex + 1

      if (nextHotBloodIndex < escapeHotBloodDialogues.length) {
        setEscapeHotBloodIndex(nextHotBloodIndex)
        setHoveredAction(null)
        addDialogueLog(escapeHotBloodDialogues[nextHotBloodIndex])
        return
      }

      setTransitionText('-避難所へ-')
      setIsTransitioning(true)
      setHoveredAction(null)

      window.setTimeout(() => {
        setIsLogOpen(false)
        setEscapeProgressOverride(90)
        setIsHotBloodRescueComplete(true)
        setEscapePhonePromptStage(null)
        setScreen('shelter-arrival')
        addDialogueLog(shelterArrivalDialogue)
      }, 140)

      finishTransition()
      return
    }

    if (escapePhonePromptStage === 'panic') {
      if (escapePanicDialogueIndex === 2) {
        setHoveredAction(null)
        return
      }

      if (escapePanicDialogueIndex === escapePhonePanicDialogues.length - 1) {
        if (isCalmRecoveryUsable) {
          setEscapePhonePromptStage('water-backpack')
          addDialogueLog(escapeWaterBackpackPromptDialogue)
        } else {
          setEscapeWaterLevel(0.35)
          setEscapePhonePromptStage('thirst-wandering')
          setEscapeNoWaterRoadIndex(null)
          addDialogueLog(escapeNoWaterThirstDialogue)
        }

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

    if (canAdvanceGuideRoute) {
      setHoveredAction(null)
      advanceEscapeStep()
      return
    }

    if (isZoomCalibration) {
      const nextIndex = dialogueIndex + 1

      if (nextIndex < zoomCalibrationDialogues.length) {
        setDialogueIndex(nextIndex)
        addDialogueLog(zoomCalibrationDialogues[nextIndex])
        return
      }

      setIsTransitioning(true)

      window.setTimeout(() => {
        setScreen('book-warning')
        setDialogueIndex(0)
        addDialogueLog(bookWarningDialogues[0])
      }, 360)

      window.setTimeout(() => {
        setIsTransitioning(false)
      }, 760)

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
      setTransitionText('-災害当日-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setCurrentDay(0)
        setScreen('day-start')
        setNightDialogueIndex(0)
        setDayStartDialogueIndex(0)
        addDialogueLog(dayStartDialoguesByDay[0][0])
      }, 140)

      finishTransition()
      return
    }

    if (isNight) {
      const nextIndex = nightDialogueIndex + 1

      setNightDialogueIndex(nextIndex)
      addDialogueLog(nightDialoguesByDay[currentDay as 1][nextIndex])
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
        setEscapeCalmRecoveryItemId(null)
        setEscapePanicDialogueIndex(0)
        setEscapePanicRoadIndex(null)
        setEscapeNoWaterRoadIndex(null)
        setEscapeNoFoodRoadIndex(null)
        setEscapeNoFoodPanicLevel(0)
        setEscapeHotBloodIndex(0)
        setIsHotBloodRescueComplete(false)
        setIsFollowingEvacuationGuide(false)
        setEscapeNoticeDialogue(null)
        setIsEscapeRightRouteBlocked(false)
        setEscapeScreen25Stage(null)
        setShouldOpenRouteChoiceAfterScreen25(false)
        setEscapeFriendMessages([])
        setEscapeFriendReplyStep(0)
        setIsEscapeFriendResponsePending(false)
        setIsEscapeFriendMessageRead(false)
        setIsEscapeFriendRouteComplete(false)
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
      const shouldGoNormalEnd = isHotBloodRescueComplete || isFollowingEvacuationGuide
      const shouldGoBadEnd = escapeOutcome === 'bad' && !shouldGoNormalEnd

      setTransitionText(
        shouldGoBadEnd
          ? '-Bad End-'
          : isHotBloodRescueComplete
            ? '-BURNING END-'
          : shouldGoNormalEnd
            ? '-Normal End-'
            : '-True End-',
      )
      setIsTransitioning(true)

      window.setTimeout(() => {
        setIsLogOpen(false)
        if (shouldGoBadEnd) {
          setScreen('bad-end')
          addDialogueLog(badEndDialogue)
          return
        }

        if (shouldGoNormalEnd) {
          setScreen('normal-end')
          addDialogueLog(normalEndDialogue)
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
        setResultReviewEndKind('true')
        setReviewMode('chart')
        setScreen('result-review')
        addDialogueLog(resultReviewDialogue)
        playModalSound()
      }, 140)

      finishTransition()
      return
    }

    if (isNormalEnd) {
      setTransitionText('-今回の振り返り-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setIsUiHidden(false)
        setIsLogOpen(false)
        setResultReviewEndKind(isHotBloodRescueComplete ? 'hot-blood' : 'normal')
        setReviewMode('chart')
        setScreen('result-review')
        addDialogueLog(resultReviewDialogue)
        playModalSound()
      }, 140)

      finishTransition()
      return
    }

    if (isUfoEnd) {
      setTransitionText('-今回の振り返り-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setIsUiHidden(false)
        setIsLogOpen(false)
        setResultReviewEndKind('ufo')
        setReviewMode('chart')
        setScreen('result-review')
        addDialogueLog(resultReviewDialogue)
        playModalSound()
      }, 140)

      finishTransition()
      return
    }

    if (isFriendsEnd) {
      setTransitionText('-今回の振り返り-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setIsUiHidden(false)
        setIsLogOpen(false)
        setResultReviewEndKind('friends')
        setReviewMode('chart')
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
        setResultReviewEndKind('bad')
        setReviewMode('chart')
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

    if (canAdvanceDialoguePage) {
      setDialoguePageIndex((current) => current + 1)
      return
    }

    handleNextDialogue()
  }

  if (isShop) {
    return (
      <ShopScreen
        dayLabel={currentDayLabel}
        purchasedItemCounts={purchasedItemCounts}
        dailyPurchaseLimit={dailyShopPurchaseLimit}
        remainingPurchases={remainingShopPurchases}
        purchaseLimitMessage="時間もお金も限られている。今日は三つだけ買おう。"
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
          isZoomCalibration ? 'is-zoom-calibration' : ''
        } ${
          isNight ? 'is-night' : ''
        } ${
          isAfterBadEnd ? 'is-ending-panel' : ''
        } ${
          isScreenShaking && (isPostDisaster || isEscapeScreen25CrackActive)
            ? 'is-shaking'
            : ''
        } ${
          isPreparationGuideActive ? 'is-preparation-guide' : ''
        } ${
          isEscapeGuideActive ? 'is-escape-guide' : ''
        } ${
          isEscapeBackpackGuideActive ? 'is-escape-backpack-guide' : ''
        } ${
          isEscapeChoiceOpen ? 'is-escape-choice' : ''
        } ${
          isEscapePanicVisualActive ? 'is-escape-panic' : ''
        } ${
          isEscapeNightRoadVisible ? 'is-escape-night-road' : ''
        }`}
        style={{
          backgroundImage: `url("${
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
                  ? currentPreparationRoomBackground
                : isPostDisaster
                  ? isFurnitureFastenerUsed
                    ? fixedAfterDisasterBackground
                    : afterDisasterBackground
                : isEscape
                    ? currentEscapeBackground
                  : isShelterArrival
                    ? isShelterArrivalNightBackground
                      ? shelterArrivalNightBackground
                      : shelterArrivalBackground
                  : isBadEnd
                    ? badEndBackground
                    : isTrueEnd
                      ? trueEndBackground
                      : isNormalEnd
                        ? isHotBloodRescueComplete
                          ? hotBloodNormalEndBackground
                          : normalEndBackground
                        : isUfoEnd
                          ? ufoEndBackground
                          : isFriendsEnd
                            ? friendsEndBackground
                          : isResultReview
                            ? resultReviewBackground
                      : isNight
                        ? nightRoomBackground
                        : currentPreparationRoomBackground
          }")`,
        }}
        aria-label={
          isBookWarning
            ? '予告本を見る場面'
            : isStart
              ? 'スタート画面'
            : isZoomCalibration
              ? '表示調整画面'
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
                    : isNormalEnd
                      ? 'ノーマルエンド'
                      : isUfoEnd
                        ? 'UFOエンド'
                        : isFriendsEnd
                          ? 'フレンズエンド'
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
          <>
            <button
              type="button"
              className="start-hotspot"
              onClick={() => handleStartGame(false)}
              aria-label="はじめる"
            />
            <button
              type="button"
              className="developer-start-button"
              onClick={() => handleStartGame(true)}
            >
              開発者モード
            </button>
            <p className="start-display-note">
              推奨表示: ブラウザズーム80%
              <br />
              画面が大きく表示される場合は、ズームを80%にしてください。
            </p>
          </>
        )}

        {isZoomCalibration && (
          <button
            type="button"
            className="zoom-calibration-notice"
            onClick={handleNextDialogue}
          >
            {dialogueIndex === 0 ? (
              <>
                <span className="zoom-calibration-notice-label">注意</span>
                <span>
                  画面が大きく表示される場合は、ブラウザの拡大率を調整してください。
                </span>
                <span className="zoom-calibration-notice-next">クリックで詳細へ</span>
              </>
            ) : (
              <>
                <span className="zoom-calibration-notice-label">調整方法</span>
                <span>フルHD環境では80%を目安にしてください。</span>
                <span>キーボードでもブラウザの拡大率を変更できます。</span>
                <span className="zoom-calibration-shortcuts">
                  <kbd>Ctrl</kbd>
                  <span>+</span>
                  <kbd>-</kbd>
                  <span>で小さく</span>
                </span>
                <span className="zoom-calibration-shortcuts">
                  <kbd>Ctrl</kbd>
                  <span>+</span>
                  <kbd>+</kbd>
                  <span>で大きく</span>
                </span>
                <span className="zoom-calibration-notice-next">クリックで本編へ</span>
              </>
            )}
          </button>
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

        {(isPreparationGuideActive || isEscapeGuideActive || isEscapeBackpackGuideActive) && (
          <div className="preparation-guide-dim" aria-hidden="true" />
        )}

        {isRoadChoiceShadeVisible && (
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
        {escapeNoFoodPanicLevel > 0 && (
          <div
            className="escape-panic-overwhelm"
            style={{ opacity: escapeNoFoodPanicLevel }}
            aria-hidden="true"
          />
        )}

        {!isStart &&
          !shouldHideGlobalControls &&
          !isEscapeChoiceOpen &&
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
          !isEscapeChoiceOpen &&
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
                {isDeveloperMode && (
                  <>
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
                      当日へ
                    </button>
                  </>
                )}
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
                    isPreparationGuideTarget('furniture') ? 'is-guide-target' : ''
                  } ${hasCompletedRoomMeasure ? 'is-sealed' : ''}`}
                  onMouseEnter={() => setHoveredAction('furniture')}
                  onMouseLeave={() => setHoveredAction(null)}
                  onFocus={() => setHoveredAction('furniture')}
                  onBlur={() => setHoveredAction(null)}
                  onClick={() => {
                    if (hasCompletedRoomMeasure) {
                      return
                    }

                    setHoveredAction(null)
                    setIsPhoneOpen(false)
                    setMeasureResultDialogue(null)
                    setIsMeasuresOpen(true)
                  }}
                  disabled={hasCompletedRoomMeasure}
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

        {isEscape &&
          !isUiHidden &&
          !isEscapeChoiceOpen &&
          !areRadioChoicesVisible &&
          !isHotBloodEscapeActive &&
          !isEscapePanicWandering && (
          <>
            <div
              className={`escape-progress-panel ${
                isEscapeGuideTarget('progress') ? 'is-guide-target' : ''
              }`}
              aria-label="時間経過"
            >
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
                } ${escapeWaterLevel > 0 && escapeWaterLevel < 1 ? 'is-low' : ''} ${
                  isEscapeGuideTarget('water') ? 'is-guide-target' : ''
                }`}
              >
                <span>水分</span>
                <strong className="escape-vertical-gauge" aria-hidden="true">
                  <span style={{ height: `${escapeWaterLevel * 100}%` }} />
                </strong>
              </div>
              <div
                className={`${
                  escapeFoodLevel > 0 ? 'is-available' : 'is-empty'
                } ${escapeFoodLevel > 0 && escapeFoodLevel < 1 ? 'is-low' : ''} ${
                  isEscapeGuideTarget('food') ? 'is-guide-target' : ''
                }`}
              >
                <span>空腹</span>
                <strong className="escape-vertical-gauge" aria-hidden="true">
                  <span style={{ height: `${escapeFoodLevel * 100}%` }} />
                </strong>
              </div>
              {isEscapeLightButtonVisible && (
                <button
                  type="button"
                  className={`escape-light-toggle ${isEscapeLightOn ? 'is-on' : ''} ${
                    isEscapeGuideTarget('light') ? 'is-guide-target' : ''
                  }`}
                  onClick={handleToggleEscapeLight}
                >
                  {isEscapeLightOn ? 'ライトOFF' : 'ライトON'}
                </button>
              )}
            </aside>
            <EscapeControls
              isPhoneUnavailable={isEscapePhoneUnavailable}
              phoneNotificationCount={hasUnreadEscapeFriendMessage ? 1 : 0}
              disabled={
                isEscapePanicActive ||
                isEscapeGuideActive ||
                escapePhonePromptStage === 'danger-road' ||
                escapePhonePromptStage === 'injury' ||
                escapePhonePromptStage === 'injury-no-treatment' ||
                escapePhonePromptStage === 'thirst-aftermath' ||
                escapePhonePromptStage === 'last-push' ||
                isHotBloodEscapeActive
              }
              onHoverAction={setHoveredAction}
              onOpenPhone={handleOpenPhone}
              onOpenBackpack={() => {
                setHoveredAction(null)
                if (
                  escapePhonePromptStage !== 'water-backpack' &&
                  escapePhonePromptStage !== 'food-backpack' &&
                  escapePhonePromptStage !== 'injury-backpack' &&
                  escapePhonePromptStage !== 'last-push-backpack'
                ) {
                  setEscapePhonePromptStage(null)
                }
                setBackpackReturnScreen('escape')
                addDialogueLog(escapeBackpackDialogue)
                setScreen('backpack')
              }}
            />
          </>
        )}

        {escapeScreen25Stage === 'choices' && (
          <div className="escape-route-choice-panel is-screen25" aria-label="次の行動を選ぶ">
            <button
              type="button"
              className="escape-route-choice-button"
              onClick={() => handleChooseEscapeScreen25Action('shelter')}
            >
              避難所へ進む
            </button>
            <button
              type="button"
              className="escape-route-choice-button"
              onClick={() => handleChooseEscapeScreen25Action('wait')}
            >
              人をまつ
            </button>
          </div>
        )}

        {escapeScreen25Stage === 'fork-choices' && (
          <div className="escape-route-choice-panel is-screen25" aria-label="別れ道を選ぶ">
            <button
              type="button"
              className="escape-route-choice-button is-right"
              onMouseEnter={() => setHoveredEscapeRouteChoice('right')}
              onMouseLeave={() => setHoveredEscapeRouteChoice(null)}
              onFocus={() => setHoveredEscapeRouteChoice('right')}
              onBlur={() => setHoveredEscapeRouteChoice(null)}
              onClick={() => handleChooseEscapeScreen25Fork('right')}
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
              onClick={() => handleChooseEscapeScreen25Fork('left')}
            >
              左の道へ進む
            </button>
          </div>
        )}

        {areEscapeRouteChoicesVisible && (
          <div className="escape-route-choice-panel" aria-label="進む道を選ぶ">
            <button
              type="button"
              className={`escape-route-choice-button is-right ${
                isEscapeRightRouteBlocked ? 'is-blocked' : ''
              }`}
              disabled={isEscapeRightRouteBlocked}
              onMouseEnter={() =>
                setHoveredEscapeRouteChoice(isEscapeRightRouteBlocked ? null : 'right')
              }
              onMouseLeave={() => setHoveredEscapeRouteChoice(null)}
              onFocus={() =>
                setHoveredEscapeRouteChoice(isEscapeRightRouteBlocked ? null : 'right')
              }
              onBlur={() => setHoveredEscapeRouteChoice(null)}
              onClick={() => handleChooseEscapeRoute('right')}
            >
              {isEscapeRightRouteBlocked ? '右の道は危険' : '右の道へ進む'}
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

        {areRadioChoicesVisible && (
          <div className="escape-route-choice-panel" aria-label="ラジオを使うか選ぶ">
            <button
              type="button"
              className="escape-route-choice-button"
              onClick={() => handleChooseRadioUse(true)}
            >
              ラジオを使う
            </button>
            <button
              type="button"
              className="escape-route-choice-button"
              onClick={() => handleChooseRadioUse(false)}
            >
              使わない
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
                    aria-label={`連絡${storyFlags.contactedFamily ? '済み' : ''}`}
                    onClick={() =>
                      handlePhoneAction(
                        'contactedFamily',
                        '家族に連絡して、地震への備えを共有した。',
                        'contact',
                      )
                    }
                  >
                    <img src={phoneMessageAppIcon} alt="" />
                    {hasUnreadEscapeFriendMessage && (
                      <span className="phone-notification-badge">1</span>
                    )}
                    <span>連絡{storyFlags.contactedFamily ? '済み' : ''}</span>
                  </button>
                  <button
                    type="button"
                    aria-label={`ニュース${storyFlags.checkedNews ? '確認済み' : ''}`}
                    onClick={() =>
                      handlePhoneAction(
                        'checkedNews',
                        'ニュースで防災情報と最新の注意点を確認した。',
                        'news',
                      )
                    }
                  >
                    <img src={phoneNewsAppIcon} alt="" />
                    <span>ニュース{storyFlags.checkedNews ? '確認済み' : ''}</span>
                  </button>
                  <button
                    type="button"
                    aria-label={`避難場所${storyFlags.checkedShelter ? '確認済み' : ''}`}
                    onClick={() =>
                      handlePhoneAction(
                        'checkedShelter',
                        '避難場所と避難経路を確認した。',
                        'shelter',
                      )
                    }
                  >
                    <img src={phoneMapAppIcon} alt="" />
                    <span>避難場所{storyFlags.checkedShelter ? '確認済み' : ''}</span>
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
                                {isEscapeFriendChatActive ? (
                                  currentEscapeFriendReply && (
                                    <button
                                      type="button"
                                      onClick={handleEscapeFriendReply}
                                    >
                                      {currentEscapeFriendReply.text}
                                    </button>
                                  )
                                ) : (
                                  selectedContact.quickReplies.map((reply) => (
                                    <button
                                      type="button"
                                      key={reply.text}
                                      onClick={() =>
                                        handleContactQuickReply(selectedContact.id, reply)
                                      }
                                    >
                                      {reply.text}
                                    </button>
                                  ))
                                )}
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
                                pendingContactResponseId === selectedContact.id ||
                                isEscapeFriendResponsePending
                              }
                            >
                              {isEscapeFriendResponsePending
                                ? '返信を待っています...'
                                : pendingContactResponseId === selectedContact.id
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
                            {contactThreads.map((contact) => {
                              const hasUnreadMessage =
                                (contact.id === 'friend' &&
                                  hasUnreadEscapeFriendMessage) ||
                                hasUnreadContactMessage(contact)

                              return (
                                <button
                                  type="button"
                                  key={contact.id}
                                  className={hasUnreadMessage ? 'has-unread-message' : ''}
                                  onClick={() => {
                                    if (
                                      contact.id === 'friend' &&
                                      isEscapeFriendNotificationAvailable
                                    ) {
                                      handleOpenEscapeFriendMessages()
                                      return
                                    }

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
                                  {hasUnreadMessage && (
                                    <span className="phone-notification-badge is-list">
                                      1
                                    </span>
                                  )}
                                </button>
                              )
                            })}
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
                            className="map-route-base"
                            points={mapPointsToPolyline(
                              escapeMapRouteOrder.map((key) => escapeMapRoutePoints[key]),
                            )}
                          />
                          {escapeMapCompletedRoute && (
                            <polyline
                              className="map-route-completed"
                              points={escapeMapCompletedRoute}
                            />
                          )}
                          {escapeMapReconnectRoute && (
                            <polyline
                              className="map-route-reconnect"
                              points={escapeMapReconnectRoute}
                            />
                          )}
                          <polyline
                            className="map-route-outline"
                            points={escapeMapRemainingRoute}
                          />
                          <polyline
                            className="map-route-line"
                            points={escapeMapRemainingRoute}
                          />
                          <text className="map-place-label" x="38" y="76">青葉公園</text>
                          <text className="map-place-label" x="213" y="104">市民広場</text>
                          <text className="map-place-label" x="181" y="282">防災倉庫</text>
                        </svg>
                        <div
                          className="map-pin map-pin-origin"
                          style={mapPointToPercent(escapeMapRoutePoints.start)}
                        >
                          <span>自宅</span>
                        </div>
                        <div
                          className="map-pin map-pin-current"
                          style={mapPointToPercent(escapeMapCurrentPoint)}
                        >
                          <span>現在地</span>
                        </div>
                        <button
                          type="button"
                          className="map-pin map-pin-shelter"
                          style={mapPointToPercent(shelterMapPoint)}
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
                          <span>{escapeMapLocation.label}</span>
                          <h3>中央小学校</h3>
                          <p>
                            {escapeMapLocation.status} 徒歩約{escapeMapRemainingMinutes}分
                          </p>
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
                  const resultText = roomMeasureResultDialogues[action]?.text

                  return (
                    <button
                      type="button"
                      key={action}
                      className={isDone ? 'is-completed' : ''}
                      onClick={() => {
                        if (hasCompletedRoomMeasure) {
                          return
                        }

                        setSelectedMeasure(action)
                      }}
                      disabled={hasCompletedRoomMeasure}
                    >
                      <span>{action}</span>
                      {isDone && resultText && <small>{resultText}</small>}
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
                  onClick={returnFromPreparationBackpack}
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
                          onMouseEnter={() => {
                            setHoveredItem(item)
                            setBackpackNoticeDialogue(null)
                          }}
                          onMouseLeave={() => setHoveredItem(null)}
                          onFocus={() => {
                            setHoveredItem(item)
                            setBackpackNoticeDialogue(null)
                          }}
                          onBlur={() => setHoveredItem(null)}
                          onClick={() => handleBackpackItemClick(item)}
                        >
                          <span className="item-icon-slot" aria-hidden="true">
                            <img src={item.image} alt="" />
                          </span>
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
            <div className="review-header">
              <h2>今回の振り返り</h2>
              <div className="review-header-actions">
                <div className="review-mode-tabs" aria-label="振り返り表示切替">
                  <button
                    type="button"
                    className={reviewMode === 'chart' ? 'is-active' : ''}
                    aria-pressed={reviewMode === 'chart'}
                    onClick={() => setReviewMode('chart')}
                  >
                    チャート
                  </button>
                  <button
                    type="button"
                    className={reviewMode === 'text' ? 'is-active' : ''}
                    aria-pressed={reviewMode === 'text'}
                    onClick={() => setReviewMode('text')}
                  >
                    解説
                  </button>
                </div>
                <button
                  type="button"
                  className="review-next-button"
                  onClick={handleNextDialogue}
                >
                  次へ
                </button>
              </div>
            </div>

            {reviewMode === 'chart' ? (
              <>
                <div className="review-chart-layout">
                  <div className="review-radar-card">
                    <svg
                      className="review-radar-chart"
                      viewBox={`0 0 ${radarSize} ${radarSize}`}
                      role="img"
                      aria-label="今回の防災行動バランス"
                    >
                      {[0.25, 0.5, 0.75, 1].map((rate) => (
                        <polygon
                          key={rate}
                          points={createRadarPoints(radarRadius * rate)}
                          className="radar-grid"
                        />
                      ))}
                      {reviewScores.map((_, index) => {
                        const end = getRadarPoint(index, radarRadius)

                        return (
                          <line
                            key={reviewScores[index].id}
                            x1={radarCenter}
                            y1={radarCenter}
                            x2={end.x}
                            y2={end.y}
                            className="radar-axis"
                          />
                        )
                      })}
                      <polygon
                        points={reviewRadarPoints}
                        className="radar-result-area"
                      />
                      {reviewScores.map((axis, index) => {
                        const point = getRadarPoint(index, radarRadius + 34)
                        const textAnchor =
                          Math.abs(point.x - radarCenter) < 10
                            ? 'middle'
                            : point.x > radarCenter
                              ? 'start'
                              : 'end'

                        return (
                          <g key={axis.id}>
                            <text
                              x={point.x}
                              y={point.y}
                              textAnchor={textAnchor}
                              className="radar-label"
                            >
                              {axis.label}
                            </text>
                            <text
                              x={point.x}
                              y={point.y + 20}
                              textAnchor={textAnchor}
                              className="radar-score"
                            >
                              {axis.score}
                            </text>
                          </g>
                        )
                      })}
                    </svg>
                  </div>

                  <div className="review-score-list" aria-label="評価項目">
                    {reviewScores.map((axis) => (
                      <div key={axis.id} className="review-score-item">
                        <span>{axis.label}</span>
                        <strong>{axis.score}</strong>
                        <meter min="0" max="100" value={axis.score}>
                          {axis.score}
                        </meter>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
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
                      {(lowReviewItems.length > 0
                        ? lowReviewItems.map((axis) => axis.lowText)
                        : ['大きく不足した項目は少ない。現実では、備えを定期的に確認しよう。']
                      ).map((text) => (
                        <li key={text}>{text}</li>
                      ))}
                    </ul>
                  </section>
                  <section>
                    <h3>よかった点</h3>
                    <ul>
                      {(highReviewItems.length > 0
                        ? highReviewItems.map((axis) => axis.highText)
                        : ['地震の可能性を知り、対策を考え始めた。']
                      ).map((text) => (
                        <li key={text}>{text}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </>
            )}
          </section>
        )}

        {isRealLifeMessage && (
          <section className="real-life-panel" aria-label="現実で確認すること">
            <div className="review-header">
              <h2>現実のあなたへ</h2>
              <button
                type="button"
                className="review-next-button"
                onClick={handleNextDialogue}
              >
                次へ
              </button>
            </div>
            <p>
              {realLifeLeadText}
            </p>
            <ul className="real-life-advice-list">
              {realLifeAdviceItems.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.action}</span>
                </li>
              ))}
            </ul>
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
          !isZoomCalibration &&
          !isEndingActions &&
          !isResultReview &&
          !isRealLifeMessage &&
          !areRadioChoicesVisible &&
          !areEscapeRouteChoicesVisible &&
          !areEscapeScreen25ChoicesVisible && (
          <button
            type="button"
            className={`message-box ${
              isUiHidden && !shouldHideGlobalControls ? 'is-hidden' : ''
            }`}
            onClick={handleMessageBoxClick}
            aria-label={
              canAdvanceDialoguePage || canAdvanceDialogue
                ? '次のセリフへ進む'
                : '自由行動を選ぶ'
            }
          >
            <span className="nameplate">{currentDialogue.speaker}</span>
            <span className="dialogue-text">{currentDialogueText}</span>
            <span className="next-mark">
              {canAdvanceDialoguePage || canAdvanceDialogue ? '▼' : ''}
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
