import fastify from 'fastify'
import userHandler from './user/routes.js'
import chatHandler from './chat/routes.js'
import fastifyCors from '@fastify/cors'
import jwt from './plugins/jwt.js'
import fastifyWS from '@fastify/websocket'

export function createServer() {
  const server = fastify()
  server.register(fastifyCors)

  server.register(jwt)
  server.register(userHandler, { prefix: '/user' })
  server.register(chatHandler, { prefix: '/chat' })

  server.register(fastifyWS as any)
  server.register(async function (server) {
    server.get(
      '/ws',
      { websocket: true },
      (connection /* SocketStream */, req /* FastifyRequest */) => {
        connection.socket.on('message', (message) => {
          // message.toString() === 'hi from client'
          connection.socket.send('hi from server')
        })
        connection.socket.on('open', (socket) => {
          console.log('open')
        })
        connection.socket.on('upgrade', (socket) => {
          console.log('upgrade')
        })
      }
    )
  })

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
