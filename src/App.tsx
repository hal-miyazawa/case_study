import { useEffect, useRef, useState } from 'react'
import backpackBackground from './assets/backgrounds/リュック画面.png'
import bookWarningBackground from './assets/backgrounds/予告本画面.png'
import normalRoomBackground from './assets/backgrounds/通常部屋画面.png'
import backpackIcon from './assets/icons/リュックicon.png'
import shopIcon from './assets/icons/ショップicon.png'
import './App.css'

type Screen = 'book-warning' | 'room-intro' | 'preparation' | 'backpack'

type Dialogue = {
  speaker: string
  text: string
}

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
    text: '三日後、この街で大きな地震が起こる……って書いてある。',
  },
  {
    speaker: '主人公',
    text: 'ただの作り話だよな。でも、なぜか嫌な感じがする。',
  },
  {
    speaker: '主人公',
    text: '何か、今のうちにできることをしておいた方がいいかもしれない。',
  },
]

const roomDialogue: Dialogue = {
  speaker: 'ナレーション',
  text: '地震が起こるとされる日まで、あと3日。何をするか選ぼう。',
}

const roomIntroDialogues: Dialogue[] = [
  {
    speaker: '主人公',
    text: '……いつもの部屋なのに、さっきの本のことが頭から離れない。',
  },
  {
    speaker: '主人公',
    text: 'もし本当に地震が来るなら、今のうちにできることを考えないと。',
  },
]

const backpackItems = [
  {
    name: '飲料水',
    description: '地震後に水分を確保するための大切な備え。',
  },
  {
    name: '非常食セット',
    description: '避難後や停電時でも食べられる食料。',
  },
  {
    name: '懐中電灯',
    description: '停電した部屋や夜の避難で足元を照らせる。',
  },
  {
    name: 'モバイルバッテリー',
    description: 'スマホの充電を保ち、連絡や情報確認を続けられる。',
  },
  {
    name: '救急セット',
    description: '軽いけがをしたときに応急処置ができる。',
  },
  {
    name: '家具固定器具',
    description: '棚や家具を固定して、揺れで倒れる危険を減らせる。',
  },
  {
    name: '窓ガラス飛散防止フィルム',
    description: '割れたガラスが飛び散るのを防ぎ、けがをしにくくする。',
  },
  {
    name: '携帯ラジオ',
    description: '停電や通信障害のときでも避難情報を確認できる。',
  },
  {
    name: '軍手・厚底スリッパ',
    description: '割れたガラスや散乱物の上を歩くときに足元を守れる。',
  },
  {
    name: '缶詰',
    description: '火や水が使えない状況でも食べられる保存食。',
  },
  {
    name: '栄養補助食品',
    description: '短時間で食べられて、避難中の体力を保ちやすい。',
  },
  {
    name: 'レトルトご飯・保存食',
    description: '自宅に残る場合や避難生活で役立つ備蓄食。',
  },
  {
    name: '簡易トイレ',
    description: '断水したときや避難所でトイレに困りにくくなる。',
  },
  {
    name: '常備薬',
    description: '体調不良や持病がある場合に欠かせない備え。',
  },
  {
    name: '消毒液・ウェットシート',
    description: '手や傷口を清潔にして、衛生状態を保ちやすくする。',
  },
  {
    name: 'マスク',
    description: '粉じんや避難所での衛生対策に使える。',
  },
  {
    name: '体温計',
    description: '避難中や避難所で体調を確認するときに役立つ。',
  },
  {
    name: '冷却シート・保温シート',
    description: '暑さや寒さから体を守り、避難生活の負担を減らせる。',
  },
]

function App() {
  const [screen, setScreen] = useState<Screen>('book-warning')
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [roomIntroIndex, setRoomIntroIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionText, setTransitionText] = useState<string | null>(null)
  const [hoveredAction, setHoveredAction] = useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = useState<(typeof backpackItems)[number] | null>(
    null,
  )
  const [selectedItem, setSelectedItem] = useState<(typeof backpackItems)[number] | null>(
    null,
  )
  const [isUiHidden, setIsUiHidden] = useState(false)
  const [isLogOpen, setIsLogOpen] = useState(false)
  const [dialogueLog, setDialogueLog] = useState<Dialogue[]>([
    bookWarningDialogues[0],
  ])
  const logBodyRef = useRef<HTMLDivElement | null>(null)

  const isBookWarning = screen === 'book-warning'
  const isRoomIntro = screen === 'room-intro'
  const isPreparation = screen === 'preparation'
  const isBackpack = screen === 'backpack'
  const currentDialogue = isBookWarning
    ? bookWarningDialogues[dialogueIndex]
    : isRoomIntro
      ? roomIntroDialogues[roomIntroIndex]
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
          : hoveredAction === 'phase'
            ? {
                speaker: 'ナレーション',
                text: '何か対策をしよう。',
              }
            : hoveredAction === 'days-left'
              ? {
                  speaker: '主人公',
                  text: 'あと三日で地震が起こるはず……何か対策しないと。',
                }
              : isBackpack
                ? selectedItem
                  ? {
                      speaker: 'ナレーション',
                      text: `${selectedItem.name}を使いますか？`,
                    }
                  : hoveredItem
                    ? {
                        speaker: hoveredItem.name,
                        text: hoveredItem.description,
                      }
                    : {
                        speaker: 'ナレーション',
                        text: '持っているものを確認して、非常用リュックに入れる準備をしよう。',
                      }
                : roomDialogue
  const isLastBookDialogue =
    isBookWarning && dialogueIndex === bookWarningDialogues.length - 1
  const isLastRoomIntroDialogue =
    isRoomIntro && roomIntroIndex === roomIntroDialogues.length - 1

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
        addDialogueLog(roomDialogue)
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
    }
  }

  return (
    <main className="game-screen">
      <section
        className="scene"
        style={{
          backgroundImage: `url(${
            isBookWarning
              ? bookWarningBackground
              : isBackpack
                ? backpackBackground
                : normalRoomBackground
          })`,
        }}
        aria-label={
          isBookWarning
            ? '予告本を見る場面'
            : isBackpack
              ? 'リュックを整理する場面'
              : '主人公の部屋'
        }
      >
        <div
          className={`scene-transition ${isTransitioning ? 'is-active' : ''}`}
          aria-hidden="true"
        >
          {transitionText && (
            <strong className="transition-title">{transitionText}</strong>
          )}
        </div>

        <button
          type="button"
          className="ui-toggle"
          onClick={() => setIsUiHidden((current) => !current)}
        >
          {isUiHidden ? 'UI表示' : 'UI非表示'}
        </button>

        {!isUiHidden && (
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
            <div
              className="phase-hud"
              onMouseEnter={() => setHoveredAction('phase')}
              onMouseLeave={() => setHoveredAction(null)}
              onFocus={() => setHoveredAction('phase')}
              onBlur={() => setHoveredAction(null)}
              tabIndex={0}
              aria-label="現在のフェーズ"
            >
              対策フェーズ
            </div>
            <div
              className="day-counter"
              onMouseEnter={() => setHoveredAction('days-left')}
              onMouseLeave={() => setHoveredAction(null)}
              onFocus={() => setHoveredAction('days-left')}
              onBlur={() => setHoveredAction(null)}
              tabIndex={0}
              aria-label="地震発生までの残り日数"
            >
              残り3日
            </div>
            <div className="action-icons" aria-label="対策行動">
              <button
                type="button"
                className="action-icon-button"
                onMouseEnter={() => setHoveredAction('shop')}
                onMouseLeave={() => setHoveredAction(null)}
                onFocus={() => setHoveredAction('shop')}
                onBlur={() => setHoveredAction(null)}
              >
                <img src={shopIcon} alt="" />
                <span>ショップ</span>
              </button>
              <button
                type="button"
                className="action-icon-button"
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

        {isBackpack && !isUiHidden && (
          <>
            <div className="backpack-top-actions">
              <button
                type="button"
                className="back-button"
                onClick={() => {
                  setHoveredItem(null)
                  setSelectedItem(null)
                  addDialogueLog(roomDialogue)
                  setScreen('preparation')
                }}
              >
                対策に戻る
              </button>
            </div>
            <aside className="inventory-panel" aria-label="現在持っているアイテム">
              <h2>持っているアイテム</h2>
              <ul>
                {backpackItems.map((item) => (
                  <li key={item.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem(null)}
                      onFocus={() => setHoveredItem(item)}
                      onBlur={() => setHoveredItem(null)}
                      onClick={() => {
                        setSelectedItem(item)
                        addDialogueLog({
                          speaker: 'ナレーション',
                          text: `${item.name}を使いますか？`,
                        })
                      }}
                    >
                      <span className="item-icon-slot" aria-hidden="true" />
                      <span>{item.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          </>
        )}

        {isBackpack && selectedItem && !isUiHidden && (
          <div className="confirm-actions" aria-label="アイテム使用確認">
            <button type="button" onClick={() => setSelectedItem(null)}>
              はい
            </button>
            <button type="button" onClick={() => setSelectedItem(null)}>
              いいえ
            </button>
          </div>
        )}

        {isLogOpen && (
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

        <button
          type="button"
          className={`message-box ${isUiHidden ? 'is-hidden' : ''}`}
          onClick={handleNextDialogue}
          aria-label={isBookWarning ? '次のセリフへ進む' : '自由行動を選ぶ'}
        >
          <span className="nameplate">{currentDialogue.speaker}</span>
          <span className="dialogue-text">{currentDialogue.text}</span>
          <span className="next-mark">
            {isBookWarning || isRoomIntro ? '▼' : ''}
          </span>
        </button>
      </section>
    </main>
  )
}

export default App
