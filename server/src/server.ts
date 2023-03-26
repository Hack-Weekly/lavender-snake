import fastify from 'fastify'
import userHandler from './user/routes.js'
import chatHandler from './chat/routes.js'
import wsHandler from './ws/routes.js'
import fastifyCors from '@fastify/cors'
import jwt from './plugins/jwt.js'
import fastifyWS from '@fastify/websocket'
import { FastifyPluginCallback } from 'fastify'
import {
  chatClient,
  GLOBAL_THREAD_ID,
  LAVENDER_BUDDY_ID,
} from './chatClient.js'
import { threadStorageClient } from './storageClients.js'
import { userClient } from './userClient.js'
import { UserChatData } from 'shared/chatTypes.js'

export async function initData() {
  // Create lavender buddy
  const allUsers = await userClient.LoadUsers()
  const lavenderBuddy = allUsers.find((u) => u.id === LAVENDER_BUDDY_ID)
  if (!lavenderBuddy) {
    console.log('Creating lavender buddy')
    await userClient.AddUser({
      email: `${LAVENDER_BUDDY_ID}@dummy.com`,
      password: '3316a735-2da2-43b4-978a-138a1eab26b1',
      user: {
        id: LAVENDER_BUDDY_ID,
        name: 'Lavender Buddy',
        picture:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png',
      },
    })
    const buddyChatData: UserChatData = {
      contacts: allUsers,
      threads: [],
    }
    await chatClient.SetUserData(LAVENDER_BUDDY_ID, buddyChatData)
  }
  // Create global thread
  let globalThread = await chatClient.GetThread(GLOBAL_THREAD_ID)
  if (!globalThread) {
    console.log('Creating global thread')
    const allUsers = await userClient.LoadUsers()
    globalThread = {
      id: GLOBAL_THREAD_ID,
      messages: [],
      participants: allUsers.map((user) => user.id),
    }
    await threadStorageClient.save(GLOBAL_THREAD_ID, globalThread)
  }
}
export function createServer() {
  const server = fastify()
  server.register(fastifyCors, {
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  })

  server.register(jwt)
  server.register(userHandler, { prefix: '/user' })
  server.register(chatHandler, { prefix: '/chat' })

  server.register(fastifyWS as unknown as FastifyPluginCallback)
  server.register(wsHandler, { prefix: '/ws' })

  server.decorate('broadcast', (data, filter) => {
    for (const client of server.websocketServer.clients) {
      client.send(JSON.stringify(data))
    }
  })

  server.setErrorHandler((error, req, res) => {
    console.error(error)
    req.log.error(error.toString())
    res.code(400).send({ error })
  })

  return server
}
