export default function chatHandler(server, options, next) {
  server.get('/', async (req, res) => {
    res.send({ message: 'Hello from chat!' })
  })

  server.post('/', async (req, res) => {
    const data = req.body
    console.log(data)
    res.send({ message: 'Message posted' })
  })
  next()
}
