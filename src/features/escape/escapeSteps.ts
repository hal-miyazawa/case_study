import escapeBackground from '../../assets/backgrounds/脱出画面.png'
import escapeLightBackground from '../../assets/backgrounds/脱出画面_ライト.png'
import escapeNightBackground from '../../assets/backgrounds/脱出画面_夜.png'
import escapeBackground2 from '../../assets/backgrounds/脱出画面2.png'
import escapeLightBackground2 from '../../assets/backgrounds/脱出画面2_ライト.png'
import escapeNightBackground2 from '../../assets/backgrounds/脱出画面2_夜.png'
import escapeBackground3 from '../../assets/backgrounds/脱出画面3.png'
import escapeLightBackground3 from '../../assets/backgrounds/脱出画面3_ライト.png'
import escapeNightBackground3 from '../../assets/backgrounds/脱出画面3_夜.png'
import safeRoadBackground from '../../assets/backgrounds/安全道.png'
import safeRoadLightBackground from '../../assets/backgrounds/安全道_ライト.png'
import safeRoadNightBackground from '../../assets/backgrounds/安全道_夜.png'
import type { EscapeStep, EscapeStepId } from './types'

export const escapeSteps: EscapeStep[] = [
  {
    id: 'start',
    background: escapeBackground,
    nightBackground: escapeNightBackground,
    lightBackground: escapeLightBackground,
    dialogue: {
      speaker: 'ナレーション',
      text: '外へ出た。まずはスマホで避難場所を確認しよう。',
    },
    requiredAction: 'check-shelter',
    next: 'route-check',
  },
  {
    id: 'route-check',
    background: escapeBackground2,
    nightBackground: escapeNightBackground2,
    lightBackground: escapeLightBackground2,
    dialogue: {
      speaker: 'ナレーション',
      text: '道が入り組んできた。もう一度スマホで避難場所を確認しよう。',
    },
    requiredAction: 'check-shelter',
    next: 'near-shelter',
  },
  {
    id: 'near-shelter',
    background: escapeBackground3,
    nightBackground: escapeNightBackground3,
    lightBackground: escapeLightBackground3,
    dialogue: {
      speaker: 'ナレーション',
      text: '避難所に近づいてきた。現在地を確認しよう。',
    },
    requiredAction: 'check-shelter',
    next: 'safe-road',
  },
  {
    id: 'safe-road',
    background: safeRoadBackground,
    nightBackground: safeRoadNightBackground,
    lightBackground: safeRoadLightBackground,
    dialogue: {
      speaker: 'ナレーション',
      text: '安全な通りに出た。最後に避難所までの道を確認しよう。',
    },
    requiredAction: 'check-shelter',
    next: 'shelter',
  },
]

export const initialEscapeStepId: EscapeStepId = 'start'
export const escapeStepById = Object.fromEntries(
  escapeSteps.map((step) => [step.id, step]),
) as Record<EscapeStepId, EscapeStep>
export const initialEscapeDialogue = escapeStepById[initialEscapeStepId].dialogue
