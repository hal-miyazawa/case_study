import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

type AiScene = {
  speaker: string
  message: string
  choices: {
    actionId: string
    label: string
  }[]
}

type OpenAiResponseBody = {
  output_text?: string
  output?: {
    content?: {
      text?: string
      type?: string
    }[]
  }[]
  error?: {
    message?: string
  }
}

const actionLabels: Record<string, string> = {
  fix_furniture: '家具固定器具で棚を固定する',
  pack_water: '飲料水を非常用バッグに入れる',
  charge_battery: 'モバイルバッテリーを充電する',
  contact_family: '家族に連絡する',
  check_shelter: '避難場所を確認する',
}

const mockAiScene: AiScene = {
  speaker: '主人公',
  message:
    '買ってきた防災グッズを床に並べる。水と懐中電灯があるだけでも少し安心するが、背の高い棚はまだ固定されていない。',
  choices: [
    {
      actionId: 'fix_furniture',
      label: '家具固定器具で棚を固定する',
    },
    {
      actionId: 'pack_water',
      label: '飲料水を非常用バッグに入れる',
    },
    {
      actionId: 'contact_family',
      label: '家族に連絡する',
    },
  ],
}

const readBody = (request: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      resolve(body)
    })

    request.on('error', reject)
  })

const sendJson = (response: ServerResponse, statusCode: number, data: unknown) => {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(data))
}

const parseAiScene = (text: string): AiScene => {
  const jsonText = text.trim().replace(/^```json\s*|^```\s*|\s*```$/g, '')
  const parsed = JSON.parse(jsonText) as AiScene

  if (
    typeof parsed.speaker !== 'string' ||
    typeof parsed.message !== 'string' ||
    !Array.isArray(parsed.choices)
  ) {
    throw new Error('AI response did not match the expected scene shape.')
  }

  return parsed
}

const getAvailableActions = (gameState: unknown) => {
  if (
    typeof gameState === 'object' &&
    gameState !== null &&
    'availableActions' in gameState &&
    Array.isArray(gameState.availableActions)
  ) {
    return gameState.availableActions.filter(
      (actionId): actionId is string => typeof actionId === 'string',
    )
  }

  return Object.keys(actionLabels)
}

const keepAvailableChoices = (scene: AiScene, gameState: unknown): AiScene => {
  const availableActions = getAvailableActions(gameState)
  const availableActionSet = new Set(availableActions)
  const choices = scene.choices.filter((choice) =>
    availableActionSet.has(choice.actionId),
  )

  for (const actionId of availableActions) {
    if (choices.length >= 3) {
      break
    }

    if (!choices.some((choice) => choice.actionId === actionId)) {
      choices.push({
        actionId,
        label: actionLabels[actionId] ?? actionId,
      })
    }
  }

  return {
    ...scene,
    choices: choices.slice(0, 3),
  }
}

const getOpenAiText = (data: OpenAiResponseBody) => {
  if (data.output_text) {
    return data.output_text
  }

  return data.output
    ?.flatMap((item) => item.content ?? [])
    .find((content) => content.type === 'output_text' && content.text)?.text
}

const createAiScene = async (gameState: unknown): Promise<AiScene> => {
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return mockAiScene
  }

  const openAiResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? 'gpt-5.2',
      instructions:
        'あなたは地震対策ゲームのシナリオを作るAIです。返答は必ずJSONだけにしてください。形式は {"speaker": string, "message": string, "choices": [{"actionId": string, "label": string}]} です。choicesは3つにしてください。actionIdは必ず availableActions に含まれる文字列だけを使い、labelは自然な日本語にしてください。',
      input: `現在のゲーム状態です。この状態に合う短いセリフと次の選択肢を作ってください。\n${JSON.stringify(
        gameState,
        null,
        2,
      )}`,
    }),
  })

  const data = (await openAiResponse.json()) as OpenAiResponseBody

  if (!openAiResponse.ok) {
    throw new Error(data.error?.message ?? 'OpenAI API request failed.')
  }

  const outputText = getOpenAiText(data)

  if (!outputText) {
    throw new Error('OpenAI response did not include output_text.')
  }

  return keepAvailableChoices(parseAiScene(outputText), gameState)
}

const aiSceneApiPlugin = (): Plugin => ({
  name: 'ai-scene-api',
  configureServer(server) {
    server.middlewares.use('/api/ai-scene', async (request, response) => {
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'Method not allowed' })
        return
      }

      try {
        const body = await readBody(request)
        const gameState = body ? JSON.parse(body) : {}
        const scene = await createAiScene(gameState)

        sendJson(response, 200, scene)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to create AI scene.'

        sendJson(response, 500, { error: message })
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), aiSceneApiPlugin()],
})
