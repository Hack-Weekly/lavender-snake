import fastify from 'fastify'
import userHandler from './user/routes.js'
import chatHandler from './chat/routes.js'
import fastifyCors from '@fastify/cors'
import jwt from './plugins/jwt.js'

export function createServer() {
  const server = fastify()
  server.register(fastifyCors)

  server.register(jwt)
  server.register(userHandler, { prefix: '/user' })
  server.register(chatHandler, { prefix: '/chat' })

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString())
    res.send({ error })
  })

  return server
}
