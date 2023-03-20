import { ChatGPTAPI } from 'chatgpt'

class ChatGptClient {
  api: ChatGPTAPI

  constructor() {
    // console.log(process.env.CHAT_GPT_API)
    this.api = new ChatGPTAPI({
      apiKey: process.env.CHAT_GPT_API,
    })
  }

  async getResponse(text: string) {
    const res = await this.api.sendMessage(text)
    console.log(res.text)
    return res.text
  }
}

export const chatGptClient = new ChatGptClient()
