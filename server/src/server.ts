import fastify from 'fastify'
import userHandler from './user/routes.js'
import chatHandler from './chat/routes.js'
import wsHandler from './ws/routes.js'
import fastifyCors from '@fastify/cors'
import jwt from './plugins/jwt.js'
import fastifyWS from '@fastify/websocket'
import { FastifyPluginCallback } from 'fastify'

export function createServer() {
  const server = fastify()
  server.register(fastifyCors)

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
    req.log.error(error.toString())
    res.code(400).send({ error })
  })

  return server
}
