export default function authHandler(server, options, done) {
  server.get('/', { onRequest: [server.authenticate] }, async (req, reply) => {
    reply.send({ message: 'hello from auth' })
  })

  server.post('/signup', async (req, reply) => {
    // get email and password from request body
    // check if email is taken
    const token = server.jwt.sign({ username: 'bob' })
    reply.send({ token })
  })

  done()
}
