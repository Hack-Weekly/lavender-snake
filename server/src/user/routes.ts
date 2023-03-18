import { isValidEmail, isValidPassword } from '@/utils/validators'
import { addUser, getUserByEmail } from './data'

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

    const user = getUserByEmail(email.toLowerCase())
    if (user) {
      reply.code(400).send({
        message: `user with the email ${email.toLowerCase()} already exist`,
      })
      return
    }

    const userData = addUser(email.toLowerCase(), password, username)

    const token = server.jwt.sign({ id: userData.id })
    reply.send({ ...userData, jwt: token })
  })

  done()
}
