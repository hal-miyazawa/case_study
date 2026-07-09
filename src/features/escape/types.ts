export type EscapeStepId = 'start' | 'route-check' | 'near-shelter' | 'safe-road'

export type EscapeNextStep = EscapeStepId | 'shelter'

export type EscapeRequiredAction = 'check-shelter'

export type EscapeDialogue = {
  speaker: string
  text: string
}

export type EscapeStep = {
  id: EscapeStepId
  background: string
  nightBackground: string
  lightBackground: string
  dialogue: EscapeDialogue
  requiredAction: EscapeRequiredAction
  next: EscapeNextStep
}
