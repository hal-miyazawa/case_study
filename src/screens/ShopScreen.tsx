import { useState } from 'react'
import shopBackground from '../assets/backgrounds/ショップ画面.png'
import itemIcon from '../assets/icons/item.png'
import './Shop.css'

type ShopScreenProps = {
  dayLabel: string
  onBuy: (itemId: string) => void
  onBack: () => void
}

type Category = 'safety' | 'food' | 'medical'

type ShopItem = {
  id: string
  name: string
  image: string
  description: string
}

const categories: { id: Category; label: string }[] = [
  { id: 'safety', label: '防災グッズ' },
  { id: 'food', label: '食料' },
  { id: 'medical', label: '医療系' },
]

const items: Record<Category, ShopItem[]> = {
  safety: [
    { id: 's1', name: '家具固定器具', image: itemIcon, description: '家具を壁に固定するための器具です。' },
    { id: 's2', name: '窓ガラス飛散防止フィルム', image: itemIcon, description: '地震などの際、窓ガラスが飛散するのを防ぐフィルムです。' },
    { id: 's3', name: '懐中電灯', image: itemIcon, description: '非常時や暗闇で使用する携帯照明です。' },
    { id: 's4', name: '携帯ラジオ', image: itemIcon, description: '非常時に情報を得るための携帯ラジオです。' },
    { id: 's5', name: 'モバイルバッテリー', image: itemIcon, description: '機器の充電に使用するモバイルバッテリーです。' },
    { id: 's6', name: '軍手・厚底スリッパ', image: itemIcon, description: '作業や非常時などに使用する保護具です。' },
  ],
  food: [
    { id: 'f1', name: '飲料水', image: itemIcon, description: '非常時の水分補給に必要な飲料水です。' },
    { id: 'f2', name: '非常食セット', image: itemIcon, description: '非常時に使用する食料品です。' },
    { id: 'f3', name: '缶詰', image: itemIcon, description: '長期保存が可能な缶詰食品です。' },
    { id: 'f4', name: '栄養補助食品', image: itemIcon, description: '栄養バランスを整えるための補助食品です。' },
    { id: 'f5', name: 'レトルトご飯・保存食', image: itemIcon, description: '便利で長期保存が可能な食料品です。' },
    { id: 'f6', name: '簡易トイレ', image: itemIcon, description: '非常時や災害時に使用する簡易トイレです。' },
  ],
  medical: [
    { id: 'm1', name: '救急セット', image: itemIcon, description: '救急時に使用するセットです。' },
    { id: 'm2', name: '常備薬', image: itemIcon, description: '日常的に使用する常備薬です。' },
    { id: 'm3', name: '消毒液・ウェットシート', image: itemIcon, description: '消毒や清掃に使用する製品です。' },
    { id: 'm4', name: 'マスク', image: itemIcon, description: '感染症予防に使用するマスクです。' },
    { id: 'm5', name: '体温計', image: itemIcon, description: '体温を測定するための体温計です。' },
    { id: 'm6', name: '冷却シート・保温シート', image: itemIcon, description: '体温を調整するために使用するシートです。' },
  ],
}

export default function ShopScreen({ dayLabel, onBuy, onBack }: ShopScreenProps) {
  const [category, setCategory] = useState<Category>('safety')
  const [hoverItem, setHoverItem] = useState<ShopItem | null>(null)
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null)
  const messageText = selectedItem
    ? selectedItem.description
    : hoverItem
      ? hoverItem.description
      : 'アイテムを選択してください'

  return (
    <main
      className="game-screen shop-bg"
      style={{ backgroundImage: `url(${shopBackground})` }}
    >

      <header className="game-header">
        <div className="game-header-days">{dayLabel}</div>
        <div className="game-header-title">ショップ</div>
        <button className="game-header-action" onClick={onBack}>部屋に戻る</button>
      </header>

      <section className="shop-panel" aria-label="ショップの商品一覧">
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
          {items[category].map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="shop-list-item"
                onMouseEnter={() => setHoverItem(item)}
                onMouseLeave={() => setHoverItem(null)}
                onFocus={() => setHoverItem(item)}
                onBlur={() => setHoverItem(null)}
                onClick={() => setSelectedItem(item)}
              >
                <span className="shop-item-icon-slot">
                  <img src={item.image} className="list-icon" alt="" />
                </span>
                <span className="list-name">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {selectedItem && (
        <div className="confirm-modal-overlay" role="dialog" aria-modal="true">
          <section className="confirm-modal" aria-label="商品購入確認">
            <p>{selectedItem.name}を購入しますか？</p>
            <div className="confirm-actions">
              <button
                type="button"
                onClick={() => {
                  onBuy(selectedItem.name)
                  setSelectedItem(null)
                }}
              >
                はい
              </button>
              <button type="button" onClick={() => setSelectedItem(null)}>
                いいえ
              </button>
            </div>
          </section>
        </div>
      )}

      <div className="message-box">
        <span className="nameplate">ナレーション</span>
        <span className="dialogue-text">{messageText}</span>
      </div>

    </main>
  )
}
