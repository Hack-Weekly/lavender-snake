import { randomUUID } from 'crypto'
import * as fs from 'fs'
import { ThreadId } from '../types'
import { dummyThreads } from './dummyData/dummyThreads'

import { bob, frank, tim } from './dummyData/dummyUsers'
// import { data } from '../dummy'

interface addMessageType {
  message: string
  threadId: ThreadId // TODO: can also be UserId (e.g., create new thread)
}
export default function chatHandler(server, options, next) {
  server.get('/', async (req, res) => {
    const currentUser = bob
    const allThreads = dummyThreads
    try {
      res.send({
        threads: allThreads.filter((thread) =>
          thread.participants.includes(bob.id)
        ),
        contacts: [tim, frank],
      })
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
        id: randomUUID(),
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
  next()
}
