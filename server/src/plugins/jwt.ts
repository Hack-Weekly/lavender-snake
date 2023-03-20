import fp from 'fastify-plugin'
import jwt from '@fastify/jwt'

export default fp(function (server, options, done) {
  server.register(jwt, {
    secret: 'lavender_snake_secret_key', // TODO
  })

  server.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send(err)
    }
  })

  done()
})
