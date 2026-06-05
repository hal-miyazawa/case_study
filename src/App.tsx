import { useState } from 'react'
import './App.css'

type Dialogue = {
  speaker: string
  text: string
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
  const isChoiceScene = dialogueIndex === dialogues.length - 1 && !selectedChoice
  const currentDialogue = selectedChoice
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
      setDialogueIndex(0)
      return
    }

    setDialogueIndex((current) =>
      current === dialogues.length - 1 ? 0 : current + 1,
    )
  }

  const handleSelectChoice = (choice: string) => {
    setSelectedChoice(choice)
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
              onClick={() => handleSelectChoice('買い物に行く')}
            >
              買い物に行く
            </button>
            <button
              type="button"
              className="choice-button choice-right"
              onClick={() => handleSelectChoice('大声で周りに伝える')}
            >
              大声で周りに伝える
            </button>
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
