export default function chatHandler(server, options, next) {
  server.get('/', async (req, res) => {
    res.send({ message: 'Hello from chat!' })
  })

  next()
}
