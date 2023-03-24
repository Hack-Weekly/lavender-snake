// import { chatGptClient } from '../chatGptClient.js'
import { generateId } from '../utils/generateId.js'
import { Message, Thread, ThreadId, UserChatData } from 'shared/chatTypes.js'
import { WsMessageEvent } from 'shared/wsEvents.js'
import {
  chatStorageClient,
  threadStorageClient,
  usersStorageClient,
} from '../storageClients.js'
import { UserId } from 'shared/userTypes.js'

function randChoice<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
function sleep(ms: number, props: any = undefined) {
  let res: any
  props?.signal?.addEventListener('abort', () => {
    res()
  })
  return new Promise((resolve, reject) => {
    res = resolve
    setTimeout(resolve, ms)
  })
}

interface addMessageType {
  message: string
  threadId: ThreadId // TODO: can also be UserId (e.g., create new thread)
}

export default function chatHandler(server, options, done) {
  server.get('/', { onRequest: [server.authenticate] }, async (req, res) => {
    const userId: UserId = req.user.id
    const allUsers = await usersStorageClient.load('allUsers')
    const userData = await chatStorageClient.load(userId)
    const defaultResp: UserChatData = {
      contacts: allUsers,
      threads: userData,
    }
    console.log({ userData, defaultResp })
    res.send(userData || defaultResp)
  })

  server.get(
    '/thread/:threadId',
    { onRequest: [server.authenticate] },
    async (req, res) => {
      const userId: UserId = req.user.id
      const { threadId } = req.params
      const threadData = await threadStorageClient.load(threadId)

      if (!threadData) {
        res.code(400).send({ message: 'Unknown thread ' })
      } else if (!threadData.participants.includes(userId)) {
        res.code(400).send({ message: 'Access not allowed to this thread' })
      } else {
        res.send(threadData)
      }
    }
  )

  server.post('/', { onRequest: [server.authenticate] }, async (req, res) => {
    const userId: UserId = req.user.id

    try {
      const payload: addMessageType = req.body
      const thread: Thread = await threadStorageClient.load(payload.threadId) // TODO: maybe this is a userId
      if (!thread) {
        res.send({
          error: 'thread not found',
        })
        return // TODO is this right?
      }

      if (!thread.participants.includes(userId)) {
        res.code(400).send({ message: 'Access not allowed to this thread' })
        return
      }

      const message: Message = {
        id: generateId(),
        from: userId,
        message: payload.message,
      }

      thread.messages.push(message)

      threadStorageClient.save(payload.threadId, thread)

      res.send(thread)
      server.broadcast(new WsMessageEvent('add', thread.id, message))

      if (
        thread.participants.length === 2 &&
        thread.participants.includes('autofriendid')
      ) {
        // User is chatting with the bot - lets respond
        await sleep(3000)
        const thread: Thread = await threadStorageClient.load(payload.threadId)
        const message: Message = {
          id: generateId(),
          from: 'autofriendid',
          message: randChoice([
            "That sound's great",
            'Sure thing :)',
            'How kind of you to say',
          ]),
        }
        thread.messages.push(message)
        server.broadcast(new WsMessageEvent('add', thread.id, message))
      }
    } catch (err) {
      console.error(err)
    }
  })

  server.get('/chatgpt', async (req, res) => {
    try {
      // const fact = await chatGptClient.getResponse('Tell me a random fact.')
      // res.send({ fact })
    } catch (err) {
      console.error(err)
    }
  })

  done()
}
