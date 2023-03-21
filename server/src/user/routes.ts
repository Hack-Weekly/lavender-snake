import { ClientUser } from '@shared/userTypes.js'
import { usersStorageClient } from '../storageClients.js'
import { generateId } from '../utils/generateId.js'
import { isValidEmail, isValidPassword } from '../utils/validators.js'
import { UserAccount } from './data.js'

export default function userHandler(server, options, done) {
  server.post('/signup', async (req, reply) => {
    const { email, password, username } = req.body

    // First check if request is valid (has all fields, etc)
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

    // Request is not malformed; does the account exist?
    const users = await usersStorageClient.load('allUsers')
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
        picture: 'TODO a picture',
      },
    }

    await usersStorageClient.save('allUsers', [...users, acct])

    const token = server.jwt.sign({ id: acct.user.id })
    reply.send({ ...acct.user, jwt: token })
  })

  server.post('/login', async (req, reply) => {
    const { email, password } = req.body

    // First check if request is valid (has all fields, etc)
    if (!email || !password) {
      reply.code(400).send({ message: 'missing fields' })
      return
    }

    // Looks okay - can we find this account?
    const users = await usersStorageClient.load('allUsers')

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
    reply.send(resp)
  })

  done()
}
