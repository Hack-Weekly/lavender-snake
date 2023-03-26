import { createServer, initData } from './server.js'

const PORT = process.env.PORT || '3000'
export const server = createServer()
initData() // TODO: this should be awaited

server.listen({ port: +PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err
  console.log(`server listening on ${address}`)
})
