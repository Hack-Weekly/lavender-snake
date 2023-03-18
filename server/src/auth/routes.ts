export default function authHandler(server, options, done) {
  server.get('/', async (req, res) => {
    res.send({ message: 'hello from auth' })
  })

  done()
}
