const fp = require('fastify-plugin')

export default fp(function (server, options, done) {
  server.register(require('@fastify/jwt'), {
    secret: 'lavender_snake_secret_key',
  })

  server.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  done()
})
