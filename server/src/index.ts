import { createServer } from './server.js'

const PORT = process.env.PORT || '3000'
export const server = createServer()

server.listen(+PORT, '0.0.0.0', (err, address) => {
  if (err) throw err
  console.log(`server listening on ${address}`)
})
