/**
 * OpenAIクライアントの設定
 */

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

/**
 * システムプロンプト
 */
const SYSTEM_PROMPTS = {
  /** 文法解説用 */
  GRAMMAR: `あなたは英検準2級の文法を教えるAI先生です。
初心者にもわかりやすく、日本語で解説してください。
解説には以下を含めてください：
- 文法ルールの説明
- 使用場面
- 例文
- よくある間違いと注意点`,

  /** 英作文添削用 */
  WRITING: `あなたは英検準2級のライティング採点者です。
以下の観点から、100点満点で採点してください：
- 語彙（25点）
- 文法（25点）
- 内容（25点）
- 構成（25点）

添削結果をJSON形式で返してください：
{
  "vocabulary_score": 数値,
  "grammar_score": 数値,
  "content_score": 数値,
  "organization_score": 数値,
  "total_score": 数値,
  "feedback": "全体のフィードバック",
  "improved_version": "改善版の英文",
  "model_answer": "模範解答"
}`,

  /** チャット用 */
  CHAT: `あなたは英検準2級の学習をサポートするAI先生です。
英語の質問、文法の質問、英作文の添削などに答えてください。
わかりやすく、励ましながら教えてください。
英検準2級の範囲内で、実践的なアドバイスを心がけてください。`,

  /** 読解問題の解説用 */
  READING: `あなたは英検準2級の長文読解を教えるAI先生です。
文章の要約、重要単語の解説、設問の解き方などをわかりやすく教えてください。`,

  /** 苦手分析用 */
  ANALYSIS: `あなたは学習データを分析するAIです。
ユーザーの学習データから、苦手分野を分析し、効果的な学習アドバイスを提供してください。
`,
}

/**
 * 文法解説を生成する
 */
export async function generateGrammarExplanation(
  grammar: string,
  context?: string
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPTS.GRAMMAR,
        },
        {
          role: 'user',
          content: `以下の文法について解説してください：\n\n${grammar}${
            context ? `\n\nコンテキスト：${context}` : ''
          }`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    return response.choices[0]?.message?.content || '解説の生成に失敗しました'
  } catch (error) {
    console.error('Grammar explanation error:', error)
    throw new Error('文法解説の生成に失敗しました')
  }
}

/**
 * ライティングを添削する
 */
export async function evaluateWriting(
  prompt: string,
  userWriting: string
): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPTS.WRITING,
        },
        {
          role: 'user',
          content: `【設問】\n${prompt}\n\n【学生の回答】\n${userWriting}\n\nこの回答を採点してください。`,
        },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('添削結果の取得に失敗しました')
    }

    return JSON.parse(content)
  } catch (error) {
    console.error('Writing evaluation error:', error)
    throw new Error('ライティングの添削に失敗しました')
  }
}

/**
 * チャットメッセージを送信する
 */
export async function sendChatMessage(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPTS.CHAT,
        },
        ...messages,
      ],
      temperature: 0.8,
      max_tokens: 1000,
    })

    return response.choices[0]?.message?.content || '回答の生成に失敗しました'
  } catch (error) {
    console.error('Chat error:', error)
    throw new Error('チャットの送信に失敗しました')
  }
}

/**
 * 学習分析を生成する
 */
export async function generateLearningAnalysis(
  studyData: any
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPTS.ANALYSIS,
        },
        {
          role: 'user',
          content: `以下の学習データを分析し、効果的な学習アドバイスを提供してください：\n\n${JSON.stringify(
            studyData,
            null,
            2
          )}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    return response.choices[0]?.message?.content || '分析の生成に失敗しました'
  } catch (error) {
    console.error('Analysis generation error:', error)
    throw new Error('学習分析の生成に失敗しました')
  }
}

export default openai
