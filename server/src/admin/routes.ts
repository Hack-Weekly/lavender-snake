import {
  chatStorageClient,
  threadStorageClient,
  usersStorageClient,
} from '../storageClients.js'
import { FastifyInstance } from 'fastify'
import { initData } from '../server.js'

export default function adminHandler(server: FastifyInstance, options, done) {
  server.get('/init', async (req, resp) => {
    try {
      await initData()
      resp.send({ status: 'done' })
    } catch (err) {
      console.error(err)
    }
  })

  server.get('/reset', async (req, resp) => {
    try {
      await chatStorageClient.clearStorage()
      await threadStorageClient.clearStorage()
      await usersStorageClient.clearStorage()
    } catch (err) {
      console.error(err)
    }
    resp.send({ status: 'done' })
  })

  done()
}
