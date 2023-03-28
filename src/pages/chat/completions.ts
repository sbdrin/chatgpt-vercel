import type { APIRoute } from "astro"
import type { ChatMessage } from "~/types"
import { countTokens } from "~/utils/tokens"
import { fetchWithTimeout } from "~/utils"

const maxTokens = 3000
export const post: APIRoute = async context => {
  try {
    const body = await context.request.json()
    const { messages, temperature = 0.6 } = body as {
      messages?: ChatMessage[]
      temperature?: number
    }

    if (!messages?.length) {
      throw new Error("没有输入任何文字。")
    }
    const key = context.request.headers.get("Authorization")
    if (!key) throw new Error("Headers中未填写Authorization")

    const tokens = messages.reduce((acc, cur) => {
      const tokens = countTokens(cur.content)
      return acc + tokens
    }, 0)

    if (tokens > (Number.isInteger(maxTokens) ? maxTokens : 3072)) {
      if (messages.length > 1)
        throw new Error(
          `由于开启了连续对话选项，导致本次对话过长，请清除部分内容后重试，或者关闭连续对话选项。`
        )
      else throw new Error("太长了，缩短一点吧。")
    }

    const rawRes: any = await fetchWithTimeout(
      "https://api.openai.com/v1/chat/completions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: key
        },
        timeout: 10000,
        method: "POST",
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages,
          temperature
        })
      }
    ).catch(err => {
      return new Response(
        JSON.stringify({
          error: {
            message: err.message
          }
        }),
        { status: 500 }
      )
    })
    console.log("请求结果为：", rawRes.body)
    return new Response(rawRes.body)
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: {
          message: err.message
        }
      }),
      { status: 400 }
    )
  }
}
