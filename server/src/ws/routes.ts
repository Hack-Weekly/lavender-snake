import { usersStorageClient } from '../storageClients.js'
import { FastifyInstance } from 'fastify'

export default async function wsHandler(server: FastifyInstance) {
  // Auth is probably unnecessary, because to connect to the websocket you need to be logged in on the client anyway
  // Uncomment this line to enable authentication
  // server.addHook('preValidation', server.authenticate!) // TODO: make TS happy with this line

  server.get<{ Querystring: { username: string } }>(
    '/',
    { websocket: true },
    async (connection, req) => {
      // A user join the chat
      // const { id } = req.user as any
      // const userAccounts = await usersStorageClient.load('allUsers')
      // const user = userAccounts.find((account) => account.user.id === id)
      // const username = user ? user.name : 'Unknown user'

      broadcast({
        sender: '__server',
        message: `${'TODO'} joined`,
      })

      // A user leaving the chat
      connection.socket.on('close', () => {
        broadcast({
          sender: '__server',
          message: `${req.query.username} left`,
        })
      })

      // Broadcast incoming message
      connection.socket.on('message', (message) => {
        message = JSON.parse(message.toString())

        broadcast({
          // sender: 'TODO',
          ...message,
        })
      })
    }
  )

  // How do I let TS now that the server instance is already decorated with broadcast fn?
  function broadcast(message) {
    for (const client of server.websocketServer.clients) {
      client.send(JSON.stringify(message))
    }
  }
}
