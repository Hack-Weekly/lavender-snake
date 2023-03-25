import { FastifyInstance } from 'fastify'
import { WsMessageEvent } from 'shared/wsEvents.js'
import { parseJwt } from '../utils/parseJwt.js'
import { userClient } from '../userClient.js'
import { User, UserId } from 'shared/userTypes.js'
import { chatClient } from '../chatClient.js'
import { chatGptClient } from '../chatGptClient.js'
import { sleep } from 'shared/utils.js'

export default async function wsHandler(server: FastifyInstance) {
  server.get<{ Querystring: { jwt: string } }>(
    '/',
    { websocket: true },
    async (connection, req) => {
      // A user join the chat
      const { jwt } = req.query
      const userId = getUserIdFromJwt(jwt)
      const user = await getUserFromId(userId)
      if (user) {
        serverBroadcast(`${user.name} joined`)
      }

      // A user leaving the chat
      connection.socket.on('close', async () => {
        const { jwt } = req.query
        const userId = getUserIdFromJwt(jwt)
        const user = await getUserFromId(userId)

        if (user) {
          serverBroadcast(`${user.name} left`)
        }
      })

      // Broadcast incoming message
      connection.socket.on('message', async (msg) => {
        msg = JSON.parse(msg.toString())
        const incomingMessage = msg as unknown as {
          threadId: string
          message: string
        }

        const { jwt } = req.query
        const userId: UserId = getUserIdFromJwt(jwt)

        const res = await chatClient.AddMessageToThread(
          incomingMessage.threadId,
          userId,
          incomingMessage.message
        )

        if (res.error) {
          serverBroadcast(res.error)
          return
        }

        broadcast(new WsMessageEvent('add', res.thread.id, res.message))

        // If user is chatting with the bot:
        if (
          res.thread.participants.length === 2 &&
          res.thread.participants.includes('autofriendid')
        ) {
          await sleep(3000)
          const msg = chatGptClient
            ? await chatGptClient.getResponse(incomingMessage.message)
            : randChoice([
                "That sound's great",
                'Sure thing :)',
                'How kind of you to say',
              ])
          console.log(msg)
          const botRes = await chatClient.AddMessageToThread(
            res.thread,
            'autofriendid',
            msg
          )

          if (res.error) {
            serverBroadcast(res.error)
            return
          }

          broadcast(new WsMessageEvent('add', botRes.thread.id, botRes.message))
        }
      })
    }
  )

  // How do I let TS now that the server instance is already decorated with broadcast fn?
  function broadcast(message: { [key: string]: any }) {
    for (const client of server.websocketServer.clients) {
      client.send(JSON.stringify(message))
    }
  }

  function serverBroadcast(message: string) {
    broadcast({
      dataType: 'server_announcement',
      message,
    })
  }

  function getUserIdFromJwt(jwt: string): UserId {
    const { id } = parseJwt(jwt)
    return id
  }

  async function getUserFromId(id: UserId): Promise<User | undefined> {
    const userAccounts = await userClient.LoadUserAccounts()
    const userAccount = userAccounts.find((account) => account.user.id === id)
    const user = userAccount?.user
    return user
  }

  function randChoice<T>(arr: Array<T>): T {
    return arr[Math.floor(Math.random() * arr.length)]
  }
}
