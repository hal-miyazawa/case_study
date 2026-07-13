import { useState } from 'react'
import shopBackground from '../assets/backgrounds/ショップ画面.png'
import shopBackground1 from '../assets/backgrounds/ショップ画面1.png'
import shopBackground2 from '../assets/backgrounds/ショップ画面2.png'
import shopBackground3 from '../assets/backgrounds/ショップ画面3.png'
import { shopItemIcons } from '../data/shopItemIcons'
import './Shop.css'

// 商品を一意に識別するIDの型。
// App.tsxのリュック商品IDと共通化し、購入flagの取り違えを防ぐ。
export type ItemId =
  | 'furniture-fasteners'
  | 'window-film'
  | 'flashlight'
  | 'radio'
  | 'power-bank'
  | 'gloves-slippers'
  | 'water'
  | 'emergency-food'
  | 'canned-food'
  | 'nutrition-supplements'
  | 'retort-rice'
  | 'portable-toilet'
  | 'first-aid-kit'
  | 'medication'
  | 'disinfectant'
  | 'mask'
  | 'thermometer'
  | 'cooling-blanket'

// 親のAppコンポーネントからショップ画面へ渡す値と関数の型。
type ShopScreenProps = {
  // ヘッダーに表示する残り日数。例: 災害まであと2日
  dayLabel: string

  // 商品購入時に、商品IDと商品名をApp.tsxへ渡す関数。
  // App.tsx側で購入数flagを+1する。
  onBuy: (itemId: ItemId, itemName: string) => void

  // 「部屋に戻る」を押した時に親画面へ戻る関数。
  onBack: () => void

  // 商品IDごとの購入個数。
  // 0なら未購入、1以上なら購入済みとして表示する。
  purchasedItemCounts: Record<ItemId, number>

  dailyPurchaseLimit: number
  remainingPurchases: number
  purchaseLimitMessage: string
}

// ショップで切り替えられる3種類の商品カテゴリ。
type Category = 'safety' | 'food' | 'medical'

// ショップに表示する商品1件分のデータ型。
type ShopItem = {
  // 購入flagと商品を結び付ける一意のID。
  id: ItemId

  // 画面とログに表示する商品名。
  name: string

  // 商品一覧で表示する画像の参照先。
  image: string

  // 商品にマウスを重ねた時に表示する説明文。
  description: string
}

// カテゴリタブのIDと日本語表示名の一覧。
const categories: { id: Category; label: string }[] = [
  { id: 'safety', label: '防災グッズ' },
  { id: 'food', label: '食料' },
  { id: 'medical', label: '医療系' },
]

const shopBackgrounds = [
  shopBackground,
  shopBackground1,
  shopBackground2,
  shopBackground3,
]

// カテゴリごとに分類した全18商品のショップ表示データ。
// idはApp.tsxのbackpackItemsと必ず一致させる。
const items: Record<Category, ShopItem[]> = {
  safety: [
    {
      id: 'furniture-fasteners',
      name: '家具固定器具',
      image: shopItemIcons['furniture-fasteners'],
      description: '家具を壁に固定するための器具です。',
    },
    {
      id: 'window-film',
      name: '窓ガラス飛散防止フィルム',
      image: shopItemIcons['window-film'],
      description: '地震などの際、窓ガラスが飛散するのを防ぐフィルムです。',
    },
    {
      id: 'flashlight',
      name: '懐中電灯',
      image: shopItemIcons.flashlight,
      description: '非常時や暗闇で使用する携帯照明です。',
    },
    {
      id: 'radio',
      name: '携帯ラジオ',
      image: shopItemIcons.radio,
      description: '非常時に情報を得るための携帯ラジオです。',
    },
    {
      id: 'power-bank',
      name: 'モバイルバッテリー',
      image: shopItemIcons['power-bank'],
      description: '機器の充電に使用するモバイルバッテリーです。',
    },
    {
      id: 'gloves-slippers',
      name: '軍手・厚底スリッパ',
      image: shopItemIcons['gloves-slippers'],
      description: '作業や非常時などに使用する保護具です。',
    },
  ],
  food: [
    {
      id: 'water',
      name: '飲料水',
      image: shopItemIcons.water,
      description: '非常時の水分補給に必要な飲料水です。',
    },
    {
      id: 'emergency-food',
      name: '非常食セット',
      image: shopItemIcons['emergency-food'],
      description: '非常時に使用する食料品です。',
    },
    {
      id: 'canned-food',
      name: '缶詰',
      image: shopItemIcons['canned-food'],
      description: '長期保存が可能な缶詰食品です。',
    },
    {
      id: 'nutrition-supplements',
      name: '栄養補助食品',
      image: shopItemIcons['nutrition-supplements'],
      description: '栄養バランスを整えるための補助食品です。',
    },
    {
      id: 'retort-rice',
      name: 'レトルトご飯',
      image: shopItemIcons['retort-rice'],
      description: '便利で長期保存が可能な食料品です。',
    },
    {
      id: 'portable-toilet',
      name: '生米',
      image: shopItemIcons['portable-toilet'],
      description: '白米はおいしい！元気が出る！',
    },
  ],
  medical: [
    {
      id: 'first-aid-kit',
      name: '救急セット',
      image: shopItemIcons['first-aid-kit'],
      description: '救急時に使用するセットです。',
    },
    {
      id: 'medication',
      name: '頭痛薬',
      image: shopItemIcons.medication,
      description: '日常的に使用する頭痛薬です。',
    },
    {
      id: 'disinfectant',
      name: '消毒液・ウェットシート',
      image: shopItemIcons.disinfectant,
      description: '消毒や清掃に使用する製品です。',
    },
    {
      id: 'mask',
      name: 'マスク',
      image: shopItemIcons.mask,
      description: '感染症予防に使用するマスクです。',
    },
    {
      id: 'thermometer',
      name: '体温計',
      image: shopItemIcons.thermometer,
      description: '体温を測定するための体温計です。',
    },
    {
      id: 'cooling-blanket',
      name: '冷却シート・保温シート',
      image: shopItemIcons['cooling-blanket'],
      description: '体温を調整するために使用するシートです。',
    },
  ],
}

// 商品カテゴリの切り替え、説明表示、購入確認を行うショップ画面。
export default function ShopScreen({
  dayLabel,
  onBuy,
  onBack,
  purchasedItemCounts,
  dailyPurchaseLimit,
  remainingPurchases,
  purchaseLimitMessage,
}: ShopScreenProps) {
  // 現在選択されているカテゴリ。
  const [category, setCategory] = useState<Category>('safety')

  // マウスまたはキーボードで選択中の商品。未選択時はnull。
  const [hoverItem, setHoverItem] = useState<ShopItem | null>(null)

  // 購入確認中の商品。nullのときは購入確認モーダルを表示しない。
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)
  const [isSoldOutNoticeOpen, setIsSoldOutNoticeOpen] = useState(false)
  const [isPurchaseLimitNoticeOpen, setIsPurchaseLimitNoticeOpen] = useState(false)
  const [backgroundIndex, setBackgroundIndex] = useState(0)
  const isPurchaseLimitReached = remainingPurchases <= 0
  const purchasedToday = dailyPurchaseLimit - remainingPurchases
  const purchaseLimitReachedMessage =
    '今日はもう買えるものはない。必要なものを持って帰ろう。'

  // メッセージボックスに表示する説明文。
  const messageText = selectedItem
    ? selectedItem.description
    : hoverItem
      ? hoverItem.description
      : isPurchaseLimitReached
        ? purchaseLimitReachedMessage
        : purchaseLimitMessage

  // 「はい」を押したときの購入処理。
  // 購入数そのものはApp.tsx側で更新する。
  const handleBuy = (item: ShopItem) => {
    onBuy(item.id, item.name)
    setBackgroundIndex((current) => (current + 1) % shopBackgrounds.length)
    setSelectedItem(null)
  }

  return (
    <main
      className="game-screen shop-bg"
      style={{ backgroundImage: `url(${shopBackgrounds[backgroundIndex]})` }}
      onClick={() =>
        setBackgroundIndex((current) => (current + 1) % shopBackgrounds.length)
      }
    >
      <header className="game-header" onClick={(event) => event.stopPropagation()}>
        <div className="game-header-days">{dayLabel}</div>
        <div className="game-header-title">ショップ</div>
        <button type="button" className="game-header-action" onClick={onBack}>
          部屋に戻る
        </button>
      </header>

      <div
        className="shop-purchase-status"
        aria-label="本日の購入可能数"
        onClick={(event) => event.stopPropagation()}
      >
        <span>購入枠</span>
        <strong>あと{remainingPurchases}/{dailyPurchaseLimit}</strong>
        <ol aria-hidden="true">
          {Array.from({ length: dailyPurchaseLimit }, (_, index) => (
            <li
              key={index}
              className={index < purchasedToday ? 'is-used' : ''}
            />
          ))}
        </ol>
      </div>

      <section
        className="shop-panel"
        aria-label="ショップの商品一覧"
        onClick={(event) => event.stopPropagation()}
      >
        <nav className="shop-category-tabs" aria-label="商品カテゴリ">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`shop-category-tab ${category === c.id ? 'active' : ''}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </nav>

        <ul className="shop-item-grid">
          {items[category].map((item) => {
            // App.tsx側で管理している購入数を取得する。
            const purchasedCount = purchasedItemCounts[item.id] ?? 0
            const isPurchased = purchasedCount > 0

            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`shop-list-item ${isPurchased ? 'is-purchased' : ''}`}
                  onMouseEnter={() => setHoverItem(item)}
                  onMouseLeave={() => setHoverItem(null)}
                  onFocus={() => setHoverItem(item)}
                  onBlur={() => setHoverItem(null)}
                  onClick={() => {
                    if (isPurchased) {
                      setSelectedItem(null)
                      setIsPurchaseLimitNoticeOpen(false)
                      setIsSoldOutNoticeOpen(true)
                      return
                    }

                    if (isPurchaseLimitReached) {
                      setSelectedItem(null)
                      setIsSoldOutNoticeOpen(false)
                      setIsPurchaseLimitNoticeOpen(true)
                      return
                    }

                    setIsSoldOutNoticeOpen(false)
                    setIsPurchaseLimitNoticeOpen(false)
                    setSelectedItem(item)
                  }}
                  aria-label={
                    isPurchased
                      ? `${item.name}（購入済み）`
                      : item.name
                  }
                >
                  <span className="shop-item-icon-slot">
                    <img src={item.image} className="list-icon" alt="" />
                  </span>

                  <span className="list-name">
                    {item.name}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      {selectedItem && (
        <div
          className="confirm-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(event) => event.stopPropagation()}
        >
          <section className="confirm-modal" aria-label="商品購入確認">
            <p>{selectedItem.name}を購入しますか？</p>
            <div className="confirm-actions">
              <button type="button" onClick={() => handleBuy(selectedItem)}>
                はい
              </button>
              <button type="button" onClick={() => setSelectedItem(null)}>
                いいえ
              </button>
            </div>
          </section>
        </div>
      )}

      {isPurchaseLimitNoticeOpen && (
        <div
          className="confirm-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(event) => event.stopPropagation()}
        >
          <section className="confirm-modal" aria-label="購入上限">
            <p>{purchaseLimitReachedMessage}</p>
            <div className="confirm-actions">
              <button
                type="button"
                onClick={() => setIsPurchaseLimitNoticeOpen(false)}
              >
                閉じる
              </button>
            </div>
          </section>
        </div>
      )}

      {isSoldOutNoticeOpen && (
        <div
          className="confirm-modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={(event) => event.stopPropagation()}
        >
          <section className="confirm-modal" aria-label="売り切れ">
            <p>この商品は売り切れです。</p>
            <div className="confirm-actions">
              <button type="button" onClick={() => setIsSoldOutNoticeOpen(false)}>
                閉じる
              </button>
            </div>
          </section>
        </div>
      )}

      <div className="message-box" onClick={(event) => event.stopPropagation()}>
        <span className="nameplate">ナレーション</span>
        <span className="dialogue-text">{messageText}</span>
      </div>
    </main>
  )
}

// import { useState } from 'react'
// import shopBackground from '../assets/backgrounds/ショップ画面.png'
// import './Shop.css'

// // 商品を一意に識別するIDの型。
// // App.tsxのリュック商品IDと共通化し、購入flagの取り違えを防ぐ。
// export type ItemId =
//   | 'furniture-fasteners'
//   | 'window-film'
//   | 'flashlight'
//   | 'radio'
//   | 'power-bank'
//   | 'gloves-slippers'
//   | 'water'
//   | 'emergency-food'
//   | 'canned-food'
//   | 'nutrition-supplements'
//   | 'retort-rice'
//   | 'portable-toilet'
//   | 'first-aid-kit'
//   | 'medication'
//   | 'disinfectant'
//   | 'mask'
//   | 'thermometer'
//   | 'cooling-blanket'

// // 親のAppコンポーネントからショップ画面へ渡す値と関数の型。
// type ShopScreenProps = {
//   // 商品購入時に、商品IDと表示名を親へ通知する関数。
//   onBuy: (itemId: ItemId, itemName: string) => void
//   // 「部屋に戻る」を押した時に親画面へ戻る関数。
//   onBack: () => void
//   // 商品IDごとの購入済みflag。trueの商品は再購入できない。
//   purchasedItemCounts: Record<ItemId, number>
// }

// // ショップで切り替えられる3種類の商品カテゴリ。
// type Category = 'safety' | 'food' | 'medical'

// // ショップに表示する商品1件分のデータ型。
// type ShopItem = {
//   // 購入flagと商品を結び付ける一意のID。
//   id: ItemId
//   // 画面とログに表示する商品名。
//   name: string
//   // 商品一覧で表示する画像の参照先。
//   image: string
//   // 商品にマウスを重ねた時に表示する説明文。
//   description: string
// }

// // カテゴリタブのIDと日本語表示名の一覧。
// const categories: { id: Category; label: string }[] = [
//   { id: 'safety', label: '防災グッズ' },
//   { id: 'food', label: '食料' },
//   { id: 'medical', label: '医療系' },
// ]

// // カテゴリごとに分類した全18商品のショップ表示データ。
// const items: Record<Category, ShopItem[]> = {
//   safety: [
//     { id: 'furniture-fasteners', name: '家具固定器具', image: 'img/item.png', description: '家具を壁に固定するための器具です。' },
//     { id: 'window-film', name: '窓ガラス飛散防止フィルム', image: 'img/item.png', description: '地震などの際、窓ガラスが飛散するのを防ぐフィルムです。' },
//     { id: 'flashlight', name: '懐中電灯', image: 'img/item.png', description: '非常時や暗闇で使用する携帯照明です。' },
//     { id: 'radio', name: '携帯ラジオ', image: 'img/item.png', description: '非常時に情報を得るための携帯ラジオです。' },
//     { id: 'power-bank', name: 'モバイルバッテリー', image: 'img/item.png', description: '機器の充電に使用するモバイルバッテリーです。' },
//     { id: 'gloves-slippers', name: '軍手・厚底スリッパ', image: 'img/item.png', description: '作業や非常時などに使用する保護具です。' },
//   ],
//   food: [
//     { id: 'water', name: '飲料水', image: 'img/item.png', description: '非常時の水分補給に必要な飲料水です。' },
//     { id: 'emergency-food', name: '非常食セット', image: 'img/item.png', description: '非常時に使用する食料品です。' },
//     { id: 'canned-food', name: '缶詰', image: 'img/item.png', description: '長期保存が可能な缶詰食品です。' },
//     { id: 'nutrition-supplements', name: '栄養補助食品', image: 'img/item.png', description: '栄養バランスを整えるための補助食品です。' },
//     { id: 'retort-rice', name: 'レトルト', image: 'img/item.png', description: '便利で長期保存が可能な食料品です。' },
//     { id: 'portable-toilet', name: '生米', image: 'img/item.png', description: '非常時や災害時に使用する簡易トイレです。' },
//   ],
//   medical: [
//     { id: 'first-aid-kit', name: '救急セット', image: 'img/item.png', description: '救急時に使用するセットです。' },
//     { id: 'medication', name: '頭痛薬', image: 'img/item.png', description: '日常的に使用する頭痛薬です。' },
//     { id: 'disinfectant', name: '消毒液・ウェットシート', image: 'img/item.png', description: '消毒や清掃に使用する製品です。' },
//     { id: 'mask', name: 'マスク', image: 'img/item.png', description: '感染症予防に使用するマスクです。' },
//     { id: 'thermometer', name: '体温計', image: 'img/item.png', description: '体温を測定するための体温計です。' },
//     { id: 'cooling-blanket', name: '冷却シート・保温シート', image: 'img/item.png', description: '体温を調整するために使用するシートです。' },
//   ],
// }

// // 商品カテゴリの切り替え、説明表示、購入操作を行うショップ画面。
// export default function ShopScreen({ onBuy, onBack, purchasedItemCounts }: ShopScreenProps) {
//   // 現在選択されているカテゴリと、カテゴリを変更する関数。
//   const [category, setCategory] = useState<Category>('safety')
//   // マウスまたはキーボードで選択中の商品。未選択時はnull。
//   const [hoverItem, setHoverItem] = useState<ShopItem | null>(null)
//   // ヘッダーへ表示する災害発生までの残り日数。
//   const daysLeft = 3

//   return (
//     <main
//       className="game-screen shop-bg"
//       style={{ backgroundImage: `url(${shopBackground})` }}
//     >

//       <header className="game-header">
//         <div className="game-header-days">災害まで{daysLeft}日</div>
//         <div className="game-header-title">ショップ</div>
//         <button className="game-header-action" onClick={onBack}>部屋に戻る</button>
//       </header>

//       <section className="shop-panel" aria-label="ショップの商品一覧">
//         <nav className="shop-category-tabs" aria-label="商品カテゴリ">
//           {categories.map((c) => (
//             <button
//               key={c.id}
//               type="button"
//               className={`shop-category-tab ${category === c.id ? 'active' : ''}`}
//               onClick={() => setCategory(c.id)}
//             >
//               {c.label}
//             </button>
//           ))}
//         </nav>

//         <ul className="shop-item-grid">
//           {items[category].map((item) => {
//             // この商品が購入済みかを、親で管理しているflagから取得する。
//             const isPurchased = purchasedItemCounts[item.id] > 0

//             return <li key={item.id}>
//               <button
//                 type="button"
//                 className={`shop-list-item ${isPurchased ? 'is-purchased' : ''}`}
//                 onMouseEnter={() => setHoverItem(item)}
//                 onMouseLeave={() => setHoverItem(null)}
//                 onFocus={() => setHoverItem(item)}
//                 onBlur={() => setHoverItem(null)}
//                 onClick={() => onBuy(item.id, item.name)}
//                 disabled={isPurchased}
//               >
//                 <span className="shop-item-icon-slot">
//                   <img src={item.image} className="list-icon" alt="" />
//                 </span>
//                 <span className="list-name">
//                   {item.name}
//                   {isPurchased && <small>購入済み</small>}
//                 </span>
//               </button>
//             </li>
//           })}
//         </ul>
//       </section>

//       <div className="message-box">
//         <span className="nameplate">ナレーション</span>
//         <span className="dialogue-text">
//           {hoverItem ? hoverItem.description : 'アイテムを選択してください'}
//         </span>
//       </div>

//     </main>
//   )
// }
