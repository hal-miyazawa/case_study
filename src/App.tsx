import { useState } from 'react'
import './App.css'

type Dialogue = {
  speaker: string
  text: string
}

type AiScene = {
  speaker: string
  message: string
  choices: {
    actionId: string
    label: string
  }[]
}

const dialogues: Dialogue[] = [
  {
    speaker: '主人公',
    text: '……今の夢、なんだったんだ。',
  },
  {
    speaker: '主人公',
    text: '家具が倒れてきて、逃げることもできなかった。',
  },
  {
    speaker: '主人公',
    text: 'このままだと、本当に同じことが起きる気がする。',
  },
  {
    speaker: '主人公',
    text: '何か対策しないと……。',
  },
]

function App() {
  const [dialogueIndex, setDialogueIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [aiScene, setAiScene] = useState<AiScene | null>(null)
  const [aiError, setAiError] = useState<string | null>(null)
  const [isAiLoading, setIsAiLoading] = useState(false)
  const isChoiceScene = dialogueIndex === dialogues.length - 1 && !selectedChoice
  const currentDialogue = isAiLoading
    ? {
        speaker: 'AI',
        text: 'ChatGPT が次の場面を考えています……',
      }
    : aiError
      ? {
          speaker: 'エラー',
          text: aiError,
        }
      : aiScene
        ? {
            speaker: aiScene.speaker,
            text: aiScene.message,
          }
        : selectedChoice
    ? {
        speaker: '主人公',
        text: `「${selectedChoice}」を選んだ。`,
      }
    : isChoiceScene
      ? {
          speaker: 'テレビ',
          text: 'Q どうしますか',
        }
      : dialogues[dialogueIndex]
  const isLastDialogue = dialogueIndex === dialogues.length - 1

  const handleNextDialogue = () => {
    if (isChoiceScene) {
      return
    }

    if (selectedChoice) {
      setSelectedChoice(null)
      setAiScene(null)
      setAiError(null)
      setDialogueIndex(0)
      return
    }

    setDialogueIndex((current) =>
      current === dialogues.length - 1 ? 0 : current + 1,
    )
  }

  const handleSelectChoice = async (choice: string, actionId: string) => {
    setSelectedChoice(choice)
    setAiScene(null)
    setAiError(null)
    setIsAiLoading(true)

    try {
      const response = await fetch('/api/ai-scene', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timeLeft: 3,
          money: 5000,
          purchasedItems: ['飲料水', '懐中電灯', '家具固定器具'],
          completedActions: [],
          selectedAction: {
            actionId,
            label: choice,
          },
          availableActions: [
            'fix_furniture',
            'pack_water',
            'charge_battery',
            'contact_family',
            'check_shelter',
          ],
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'AI の応答取得に失敗しました。')
      }

      setAiScene(data)
    } catch (error) {
      setAiError(
        error instanceof Error
          ? error.message
          : 'AI の応答取得に失敗しました。',
      )
    } finally {
      setIsAiLoading(false)
    }
  }

  return (
    <main className="game-screen">
      <section className="scene" aria-label="主人公の部屋">
        <div className="wall">
          <div className="lamp"></div>
          <div className="clock">12</div>
          <div className="door"></div>
          <div className="window"></div>
          <div className="shelf"></div>
          <div className="tv"></div>
          <div className="table"></div>
          <div className="plant plant-left"></div>
          <div className="plant plant-right"></div>
          <div className="kitchen"></div>
          <div className="character"></div>
        </div>

        {isChoiceScene && (
          <div className="choice-layer" aria-label="行動を選択">
            <button
              type="button"
              className="choice-button choice-left"
              onClick={() => void handleSelectChoice('買い物に行く', 'go_shop')}
            >
              買い物に行く
            </button>
            <button
              type="button"
              className="choice-button choice-right"
              onClick={() =>
                void handleSelectChoice('大声で周りに伝える', 'warn_neighbors')
              }
            >
              大声で周りに伝える
            </button>
          </div>
        )}

        {aiScene && (
          <div className="ai-choice-preview" aria-label="AIが作った次の選択肢">
            {aiScene.choices.map((choice) => (
              <span key={choice.actionId} className="ai-choice-chip">
                {choice.label}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          className="message-box"
          onClick={handleNextDialogue}
          aria-label={isChoiceScene ? '選択肢を選んでください' : '次のセリフへ進む'}
        >
          <span className="nameplate">{currentDialogue.speaker}</span>
          <span className="dialogue-text">{currentDialogue.text}</span>
          <span className="next-mark">
            {isChoiceScene ? '' : isLastDialogue ? '↺' : '▼'}
          </span>
        </button>
      </section>
    </main>
  )
}

export default App
