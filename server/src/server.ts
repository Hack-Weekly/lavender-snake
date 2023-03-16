import fastify from 'fastify'

import chatHandler from './chat/routes'

export function createServer() {
  const server = fastify()
  server.register(require('fastify-cors'))

  server.register(chatHandler, { prefix: '/chat' })

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString())
    res.send({ error })
  })

  return server
}
