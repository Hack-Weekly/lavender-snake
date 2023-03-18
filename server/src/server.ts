import fastify from 'fastify'
import userHandler from './user/routes'
import chatHandler from './chat/routes'

export function createServer() {
  const server = fastify()
  server.register(require('@fastify/cors'))

  server.register(require('./plugins/jwt'))
  server.register(userHandler, { prefix: '/user' })
  server.register(chatHandler, { prefix: '/chat' })

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString())
    res.send({ error })
  })

  return server
}
