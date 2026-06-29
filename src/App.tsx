import { useEffect, useMemo, useRef, useState } from 'react'
import badEndBackground from './assets/backgrounds/BadEnd.png'
import afterDisasterBackground from './assets/backgrounds/災害後画面.png'
import backpackBackground from './assets/backgrounds/リュック画面.png'
import bookWarningBackground from './assets/backgrounds/予告本画面.png'
import fixedAfterDisasterBackground from './assets/backgrounds/固定器具使用災害後画面.png'
import fixedNormalRoomBackground from './assets/backgrounds/固定器具使用通常部屋画面.png'
import normalRoomBackground from './assets/backgrounds/通常部屋画面.png'
import nightRoomBackground from './assets/backgrounds/通常部屋画面夜.png'
import phoneScreenBackground from './assets/backgrounds/スマホ画面.png'
import trueEndBackground from './assets/backgrounds/TrueEnd.png'
import measureIcon from './assets/icons/対策icon.png'
import backpackIcon from './assets/icons/リュックicon.png'
import phoneIcon from './assets/icons/スマホicon.png'
import shopIcon from './assets/icons/ショップicon.png'
import './App.css'
import ShopScreen, { type ItemId } from './screens/ShopScreen'

type Screen =
  | 'book-warning'
  | 'room-intro'
  | 'preparation'
  | 'backpack'
  | 'shop'
  | 'night'
  | 'day-start'
  | 'quake-arrival'
  | 'post-disaster'
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
    name: '簡易トイレ',
    description: '断水したときや避難所でトイレに困りにくくなる。',
  },
  {
    id: 'medication',
    name: '常備薬',
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


function App() {
  const [screen, setScreen] = useState<Screen>('book-warning')
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
  const [isMeasuresOpen, setIsMeasuresOpen] = useState(false)
  const [selectedMeasure, setSelectedMeasure] = useState<string | null>(null)
  const [isQuitMessageVisible, setIsQuitMessageVisible] = useState(false)
  const [isItemUseFlashActive, setIsItemUseFlashActive] = useState(false)
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

  const isBookWarning = screen === 'book-warning'
  const isRoomIntro = screen === 'room-intro'
  const isPreparation = screen === 'preparation'
  const isBackpack = screen === 'backpack'
  const isShop = screen === 'shop'
  const isNight = screen === 'night'
  const isDayStart = screen === 'day-start'
  const isQuakeArrival = screen === 'quake-arrival'
  const isPostDisaster = screen === 'post-disaster'
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
  const currentPostDisasterDialogues = isFurnitureFastenerUsed
    ? truePostDisasterDialogues
    : postDisasterDialogues

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
  const canAdvanceDialogue =
    isBookWarning ||
    isRoomIntro ||
    isNight ||
    isDayStart ||
    isQuakeArrival ||
    isPostDisaster ||
    isBadEnd ||
    isTrueEnd ||
    isResultReview ||
    isRealLifeMessage
  const currentDialogue = isBookWarning
    ? bookWarningDialogues[dialogueIndex]
    : isRoomIntro
      ? roomIntroDialogues[roomIntroIndex]
      : isNight
        ? nightDialoguesByDay[currentDay as 1 | 2][nightDialogueIndex]
        : isDayStart
          ? dayStartDialoguesByDay[currentDay as 0 | 1][dayStartDialogueIndex]
          : isQuakeArrival
            ? quakeArrivalDialogue
            : isPostDisaster
              ? currentPostDisasterDialogues[postDisasterDialogueIndex]
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
    setScreen('book-warning')
    setCurrentDay(2)
    setDialogueIndex(0)
    setRoomIntroIndex(0)
    setNightDialogueIndex(0)
    setDayStartDialogueIndex(0)
    setPostDisasterDialogueIndex(0)
    setIsTransitioning(false)
    setTransitionText(null)
    setHoveredAction(null)
    setHoveredItem(null)
    setSelectedItem(null)
    setIsUiHidden(false)
    setIsLogOpen(false)
    setIsPhoneOpen(false)
    setIsMeasuresOpen(false)
    setSelectedMeasure(null)
    setIsQuitMessageVisible(false)
    setIsItemUseFlashActive(false)
    setItemFlags(createInitialItemFlags())
    setPurchasedItemOrder([])
    setStoryFlags(createInitialStoryFlags())
    setRoomMeasureFlags(createInitialRoomMeasureFlags())
    setDialogueLog([bookWarningDialogues[0]])
  }

  useEffect(() => {
    if (isLogOpen && logBodyRef.current) {
      logBodyRef.current.scrollTop = logBodyRef.current.scrollHeight
    }
  }, [isLogOpen, dialogueLog])

  const addDialogueLog = (dialogue: Dialogue) => {
    setDialogueLog((current) => {
      const latest = current.at(-1)

      if (latest?.speaker === dialogue.speaker && latest.text === dialogue.text) {
        return current
      }

      return [...current, dialogue]
    })
  }

  // ショップで商品を購入したときの処理。
  // purchasedを+1して購入数として管理する。
  const handleBuyItem = (itemId: ItemId, itemName: string) => {
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

    setSelectedItem(null)
  }

  // スマホ画面の各行動を実行済みflagとして保存する。
  const handlePhoneAction = (flagName: keyof StoryFlags, logText: string) => {
    setStoryFlags((current) => ({
      ...current,
      [flagName]: true,
    }))

    addDialogueLog({
      speaker: 'ナレーション',
      text: logText,
    })
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
    addDialogueLog(getPreparationDialogue(0))
  }

  const handleNextDialogue = () => {
    if (isTransitioning) {
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

    if (isQuakeArrival) {
      setTransitionText('-地震発生-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setScreen('post-disaster')
        setPostDisasterDialogueIndex(0)
        addDialogueLog(currentPostDisasterDialogues[0])
      }, 140)

      finishTransition()
      return
    }

    if (isPostDisaster && isLastPostDisasterDialogue) {
      setTransitionText(isFurnitureFastenerUsed ? '-True End-' : '-Bad End-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setIsLogOpen(false)
        setScreen(isFurnitureFastenerUsed ? 'true-end' : 'bad-end')
        setPostDisasterDialogueIndex(0)
        addDialogueLog(isFurnitureFastenerUsed ? trueEndDialogue : badEndDialogue)
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

    if (isTrueEnd) {
      setTransitionText('-今回の振り返り-')
      setIsTransitioning(true)

      window.setTimeout(() => {
        setIsUiHidden(false)
        setIsLogOpen(false)
        setScreen('result-review')
        addDialogueLog(resultReviewDialogue)
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
        className={`scene ${isNight ? 'is-night' : ''} ${
          isAfterBadEnd ? 'is-ending-panel' : ''
        }`}
        style={{
          backgroundImage: `url(${
            isBookWarning
              ? bookWarningBackground
              : isBackpack
                ? backpackBackground
                : isPostDisaster
                  ? isFurnitureFastenerUsed
                    ? fixedAfterDisasterBackground
                    : afterDisasterBackground
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
            : isBackpack
              ? 'リュックを整理する場面'
            : isNight
              ? '夜の場面'
              : isQuakeArrival
                ? '地震発生直前の部屋'
              : isPostDisaster
                ? '災害後の部屋'
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

        {!shouldHideGlobalControls && (
          <button
            type="button"
            className="ui-toggle"
            onClick={() => setIsUiHidden((current) => !current)}
          >
            {isUiHidden ? 'UI表示' : 'UI非表示'}
          </button>
        )}

        {!isUiHidden && !shouldHideGlobalControls && (
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
                  onClick={jumpToFinalPreparation}
                >
                  最終日へ
                </button>
                <button
                  type="button"
                  className="game-header-action"
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
                  className="action-icon-button action-icon-furniture"
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
                className="action-icon-button action-icon-shop"
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
                className="action-icon-button action-icon-phone"
                onMouseEnter={() => setHoveredAction('phone')}
                onMouseLeave={() => setHoveredAction(null)}
                onFocus={() => setHoveredAction('phone')}
                onBlur={() => setHoveredAction(null)}
                onClick={() => {
                  setHoveredAction(null)
                  setIsPhoneOpen(true)
                }}
                aria-label="スマホ"
              >
                <img src={phoneIcon} alt="" />
                <span>スマホ</span>
              </button>
              <button
                type="button"
                className="action-icon-button action-icon-backpack"
                onMouseEnter={() => setHoveredAction('backpack')}
                onMouseLeave={() => setHoveredAction(null)}
                onFocus={() => setHoveredAction('backpack')}
                onBlur={() => setHoveredAction(null)}
                onClick={() => {
                  setHoveredAction(null)
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

        {isPreparation && isPhoneOpen && !isUiHidden && (
          <div
            className="phone-overlay"
            aria-label="スマホ画面"
            onClick={() => setIsPhoneOpen(false)}
          >
            <div
              className="phone-screen-shell"
              onClick={(event) => event.stopPropagation()}
            >
              <img src={phoneScreenBackground} alt="" />
              <div className="phone-app-grid" aria-label="スマホアプリ">
                <button
                  type="button"
                  onClick={() =>
                    handlePhoneAction(
                      'contactedFamily',
                      '家族に連絡して、地震への備えを共有した。',
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
                    )
                  }
                >
                  避難場所{storyFlags.checkedShelter ? '確認済み' : ''}
                </button>
              </div>
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
            <header className="game-header">
              <div className="game-header-days">{currentDayLabel}</div>
              <div className="game-header-title">リュック</div>
              <button
                type="button"
                className="game-header-action"
                onClick={() => {
                  setHoveredItem(null)
                  setSelectedItem(null)
                  addDialogueLog(preparationDialogue)
                  setScreen('preparation')
                }}
              >
                対策に戻る
              </button>
            </header>
            <aside className="inventory-panel" aria-label="現在持っているアイテム">
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

        {!isEndingActions && !isResultReview && !isRealLifeMessage && (
          <button
            type="button"
            className={`message-box ${
              isUiHidden && !shouldHideGlobalControls ? 'is-hidden' : ''
            }`}
            onClick={handleNextDialogue}
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
//     name: '簡易トイレ',
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
