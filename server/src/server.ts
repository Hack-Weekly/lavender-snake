import fastify from 'fastify'
import userHandler from './user/routes.js'
import chatHandler from './chat/routes.js'
import fastifyCors from '@fastify/cors'
import jwt from './plugins/jwt.js'
import socket from 'socket.io'
import fastifyIO from 'fastify-socket.io'

export function createServer() {
  const server = fastify()
  server.register(fastifyCors)

  server.register(jwt)
  server.register(userHandler, { prefix: '/user' })
  server.register(chatHandler, { prefix: '/chat' })
  server.register(fastifyIO as any)
  server.ready().then(() => {
    // we need to wait for the server to be ready, else `server.io` is undefined
    server.io.on('connection', (socket) => {
      console.log(socket.id)
    })
  })

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString())
    res.code(400).send({ error })
  })

  return server
}
