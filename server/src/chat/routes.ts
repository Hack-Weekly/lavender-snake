import { chatGptClient } from '../chatGptClient.js'
import { generateId } from '../utils/generateId.js'
import { Thread, ThreadId, UserChatData } from '@shared/chatTypes.js'
import { dummyThreads } from './dummyData/dummyThreads.js'

import { bob, frank, tim } from './dummyData/dummyUsers.js'
// import { data } from '../dummy'

interface addMessageType {
  message: string
  threadId: ThreadId // TODO: can also be UserId (e.g., create new thread)
}

export default function chatHandler(server, options, done) {
  server.get('/', { onRequest: [server.authenticate] }, async (req, res) => {
    const currentUser = bob
    console.log(req.user)
    const allThreads = dummyThreads
    try {
      const response: UserChatData = {
        threads: allThreads
          .filter((thread) => thread.participants.includes(currentUser.id))
          .map((thread) => ({
            id: thread.id,
            participants: thread.participants,
            lastMessage: thread.messages[thread.messages.length - 1],
          })),
        contacts: [tim, frank, bob],
      }
      res.send(response)
    } catch (err) {
      console.error(err)
    }
  })

  server.get('/thread/:threadId', async (req, res) => {
    const allThreads = dummyThreads
    const { threadId } = req.params
    console.log(threadId)
    try {
      const response: Thread | undefined = allThreads.find(
        (thread) => thread.id === threadId
      )
      res.send(response)
    } catch (err) {
      console.error(err)
    }
  })

  server.post('/', async (req, res) => {
    const currentUser = bob
    const allThreads = dummyThreads

    try {
      const payload: addMessageType = req.body
      const thread = allThreads.find((t) => (t.id = payload.threadId))
      if (!thread) {
        res.send({
          error: 'thread not found',
        })
        return // TODO is this right?
      }

      thread.messages.push({
        id: generateId(),
        from: currentUser.id,
        message: payload.message,
      })

      res.send({
        status: 'good',
      })
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
