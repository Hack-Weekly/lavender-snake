import fastify, { FastifyInstance } from 'fastify'
import { WsMessageEvent } from 'shared/wsEvents.js'
import { parseJwt } from '../utils/parseJwt.js'
import { userClient } from '../userClient.js'
import { User } from 'shared/userTypes.js'

export default async function wsHandler(server: FastifyInstance) {
  server.get<{ Querystring: { jwt: string } }>(
    '/',
    { websocket: true },
    async (connection, req) => {
      // A user join the chat
      const { jwt } = req.query
      const user = await getUserFromJwt(jwt)

      if (user) {
        broadcast({
          sender: '__server',
          message: `${user.name} joined`,
        })
      }

      // A user leaving the chat
      connection.socket.on('close', async () => {
        const { jwt } = req.query
        const user = await getUserFromJwt(jwt)

        if (user) {
          broadcast({
            sender: '__server',
            message: `${user.name} left`,
          })
        }
      })

      // Broadcast incoming message
      connection.socket.on('message', (message) => {
        message = JSON.parse(message.toString())

        broadcast({
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

  async function getUserFromJwt(jwt: string): Promise<User | undefined> {
    const { id } = parseJwt(jwt)
    const userAccounts = await userClient.LoadUserAccounts()
    const userAccount = userAccounts.find((account) => account.user.id === id)
    const user = userAccount?.user
    return user
  }
}
