import { ClientUser } from 'shared/userTypes.js'
import { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { usersStorageClient } from '../storageClients.js'
import { generateId } from '../utils/generateId.js'
import { isValidEmail, isValidPassword } from '../utils/validators.js'
import { UserAccount } from './data.js'
import { userClient } from '../userClient.js'
import { chatClient } from '@/chatClient.js'
import { WsUserEvent } from 'shared/wsEvents.js'

const SignUpRouteBodySchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
  username: Type.String(),
  thumbnail: Type.String(),
})
type SignUpRouteBody = Static<typeof SignUpRouteBodySchema>

const LoginRouteBodySchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
})
type LoginRouteBody = Static<typeof LoginRouteBodySchema>

const AuthRouteResponseSchema = Type.Object({
  jwt: Type.String(),
  userData: Type.Object({
    id: Type.String(),
    name: Type.String(),
    picture: Type.String(),
  }),
})
type AuthRouteResponse =
  | Static<typeof AuthRouteResponseSchema>
  | { message: string }

export default function userHandler(server: FastifyInstance, options, done) {
  server.post<{
    Body: SignUpRouteBody
    Reply: AuthRouteResponse
  }>(
    '/signup',
    {
      schema: {
        body: SignUpRouteBodySchema,
        response: {
          200: AuthRouteResponseSchema,
        },
      },
    },
    async (req, reply) => {
      const { email, password, username, thumbnail } = req.body

      // First check if request is valid (has all fields, etc)
      if (!email || !password || !username || !thumbnail) {
        reply.code(400).send({ message: 'missing fields' })
        return
      }

      if (!isValidEmail(email.toLowerCase())) {
        reply.code(400).send({ message: 'invalid email' })
        return
      }

      if (!isValidPassword(password)) {
        reply
          .code(400)
          .send({ message: 'password has to be at least 4 characters' })
        return
      }

      // Request is not malformed; does the account exist?
      const users = await userClient.LoadUserAccounts()
      if (users.find((user) => user.email === email.toLowerCase())) {
        reply.code(400).send({
          message: `user with the email ${email.toLowerCase()} already exist`,
        })
        return
      }

      const acct: UserAccount = {
        email,
        password,
        user: {
          id: generateId(),
          name: username,
          picture: thumbnail,
        },
      }

      await userClient.AddUser(acct)

      const token = server.jwt.sign({ id: acct.user.id })
      reply.send({ jwt: token, userData: acct.user })
      const svr = server as any
      svr.broadcast(new WsUserEvent('add', acct.user))
    }
  )

  server.post<{ Body: LoginRouteBody; Reply: AuthRouteResponse }>(
    '/login',
    {
      schema: {
        body: LoginRouteBodySchema,
        response: {
          200: AuthRouteResponseSchema,
        },
      },
    },
    async (req, reply) => {
      const { email, password } = req.body

      // First check if request is valid (has all fields, etc)
      if (!email || !password) {
        reply.code(400).send({ message: 'missing fields' })
        return
      }

      // Looks okay - can we find this account?
      const users = await userClient.LoadUserAccounts()

      const acct = users.find(
        (acct) => acct.email.toLowerCase() === email
      ) as UserAccount

      if (!acct || acct.password !== password) {
        reply.code(400).send({ message: 'invalid credentials' })
        return
      }

      const token = server.jwt.sign({ id: acct.user.id })
      const resp: ClientUser = {
        jwt: token,
        userData: acct.user,
      }
      return reply.send(resp)
    }
  )

  done()
}
