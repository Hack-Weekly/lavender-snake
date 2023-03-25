import { chatGptClient } from '../chatGptClient.js'
import { generateId } from '../utils/generateId.js'
import {
  genThreadSummary,
  Message,
  Thread,
  ThreadId,
  UserChatData,
} from 'shared/chatTypes.js'
import { WsMessageEvent } from 'shared/wsEvents.js'
import {
  chatStorageClient,
  threadStorageClient,
  usersStorageClient,
} from '../storageClients.js'
import { UserId } from 'shared/userTypes.js'
import { DateTime } from 'luxon'
import { userClient } from '../userClient.js'
import { chatClient } from '../chatClient.js'
import { sleep } from 'shared/utils.js'

function randChoice<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

interface addMessageType {
  message: string
  threadId?: ThreadId
  userId?: UserId
}

export default function chatHandler(server, options, done) {
  server.get('/', { onRequest: [server.authenticate] }, async (req, res) => {
    const userId: UserId = req.user.id
    const userData = await chatClient.GetUserData(userId)
    if (userData) {
      res.send(userData)
    } else {
      const defaultResp: UserChatData = {
        contacts: await userClient.LoadUsers(),
        threads: [],
      }
      res.send(defaultResp)
      // user has no messages at all - lets send one from Lavender Buddy
      await sleep(3000)
      await chatClient.SendMessage(
        'autofriendid',
        userId,
        "Hi! I see you are new to Lavender LINE, so let's be friends :) I'm really good with facts and random trivia, so ask me something!"
      )
    }
  })

  server.get(
    '/thread/:threadId',
    { onRequest: [server.authenticate] },
    async (req, res) => {
      const userId: UserId = req.user.id
      const { threadId } = req.params
      const threadData = await chatClient.GetThread(threadId)

      if (!threadData) {
        res.code(400).send({ message: 'Unknown thread ' })
      } else if (!threadData.participants.includes(userId)) {
        res.code(400).send({ message: 'Access not allowed to this thread' })
      } else {
        res.send(threadData)
      }
    }
  )

  server.post('/', { onRequest: [server.authenticate] }, async (req, resp) => {
    const userId: UserId = req.user.id

    try {
      const {
        threadId,
        userId: recipientId,
        message: messageText,
      } = req.body as addMessageType

      if ((recipientId && threadId) || (!recipientId && !threadId)) {
        resp.code(400).send({ message: 'Must supply thread or user ID' })
        return
      }

      const res = threadId
        ? await chatClient.AddMessageToThread(threadId, userId, messageText)
        : await chatClient.SendMessage(userId, recipientId, messageText)

      if (res.error) {
        resp.code(400).send({ message: res.error })
        return
      }

      const { message, thread } = res
      resp.send(message)
      // TODO: we shouldn't broadcast to everyone - just participants
      server.broadcast(new WsMessageEvent('add', thread.id, message))

      // If user is chatting with the bot, lets respond
      if (
        thread.participants.length === 2 &&
        thread.participants.includes('autofriendid')
      ) {
        await sleep(3000)
        const msg = chatGptClient
          ? await chatGptClient.getResponse(messageText)
          : randChoice([
              "That sound's great",
              'Sure thing :)',
              'How kind of you to say',
            ])
        chatClient.AddMessageToThread(thread, 'autofriendid', msg)
        server.broadcast(new WsMessageEvent('add', thread.id, message))
      }
    } catch (err) {
      console.error(err)
    }
  })

  server.get('/chatgpt', async (req, res) => {
    try {
      const fact = await chatGptClient.getResponse('Tell me a random fact.')
      res.send({ fact })
    } catch (err) {
      console.error(err)
    }
  })

  done()
}
