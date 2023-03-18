import fastify from 'fastify'
import authHandler from './auth/routes'

import chatHandler from './chat/routes'

export function createServer() {
  const server = fastify()
  server.register(require('fastify-cors'))

  server.register(authHandler, { prefix: '/auth' })
  server.register(chatHandler, { prefix: '/chat' })

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString())
    res.send({ error })
  })

  return server
}
