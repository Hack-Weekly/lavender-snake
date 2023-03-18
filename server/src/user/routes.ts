import { isValidEmail, isValidPassword } from '@/utils/validators'
import { addUser, getUserAccount } from './data'

export default function userHandler(server, options, done) {
  server.get('/', { onRequest: [server.authenticate] }, async (req, reply) => {
    reply.send({ message: 'hello from auth' })
  })

  server.post('/signup', async (req, reply) => {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
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

    const userAccount = getUserAccount(email.toLowerCase())
    if (userAccount) {
      reply.code(400).send({
        message: `user with the email ${email.toLowerCase()} already exist`,
      })
      return
    }

    const user = addUser(email.toLowerCase(), password, username)

    const token = server.jwt.sign({ id: user.id })
    reply.send({ ...user, jwt: token })
  })

  server.post('/login', async (req, reply) => {
    const { email, password } = req.body

    if (!email || !password) {
      reply.code(400).send({ message: 'missing fields' })
      return
    }

    const userAccount = getUserAccount(email.toLowerCase())
    if (!userAccount || userAccount.password !== password) {
      reply.code(400).send({ message: 'invalid credentials' })
      return
    }

    const { user } = userAccount

    const token = server.jwt.sign({ id: user.id })
    reply.send({ ...user, jwt: token })
  })

  done()
}
