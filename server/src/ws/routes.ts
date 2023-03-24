import { FastifyInstance } from 'fastify'

export default async function wsHandler(server: FastifyInstance) {
  server.get(
    '/',
    { websocket: true },
    (connection /* SocketStream */, req /* FastifyRequest */) => {
      connection.socket.on('message', (message) => {
        // message.toString() === 'hi from client'
        connection.socket.send('your message: ' + message.toString())
      })
      connection.socket.on('open', (socket) => {
        console.log('open')
      })
      connection.socket.on('close', (socket) => {
        console.log('close')
      })
      connection.socket.on('upgrade', (socket) => {
        console.log('upgrade')
      })
    }
  )

  server.get('/digits', { websocket: true }, (connection, req) => {
    const timer = setInterval(() => {
      connection.socket.send(Math.floor(Math.random() * 10).toString())
    }, 1000)
    connection.socket.on('close', () => {
      clearInterval(timer)
    })
  })
}
