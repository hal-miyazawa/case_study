import { useMemo, useState } from 'react'
import {
  escapeStepById,
  initialEscapeStepId,
} from './escapeSteps'
import type { EscapeStep, EscapeStepId } from './types'

type AdvanceEscapeResult =
  | {
      type: 'step'
      step: EscapeStep
    }
  | {
      type: 'shelter'
    }

export function useEscapeFlow() {
  const [escapeStepId, setEscapeStepId] =
    useState<EscapeStepId>(initialEscapeStepId)

  const currentEscapeStep = useMemo(
    () => escapeStepById[escapeStepId],
    [escapeStepId],
  )

  const resetEscapeFlow = () => {
    setEscapeStepId(initialEscapeStepId)
  }

  const advanceEscapeStep = (): AdvanceEscapeResult => {
    const nextStep = currentEscapeStep.next

    if (nextStep === 'shelter') {
      return { type: 'shelter' }
    }

    const nextEscapeStep = escapeStepById[nextStep]
    setEscapeStepId(nextStep)

    return {
      type: 'step',
      step: nextEscapeStep,
    }
  }

  return {
    escapeStepId,
    currentEscapeStep,
    resetEscapeFlow,
    advanceEscapeStep,
  }
}
