import * as fs from 'fs'

import { bob, frank, tim } from '../dummyUser'
// import { data } from '../dummy'

export default function chatHandler(server, options, next) {
  server.get('/', async (req, res) => {
    try {
      const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
      res.send({ message: data })
    } catch (err) {
      console.error(err)
    }
  })

  server.post('/', async (req, res) => {
    try {
      const newThread = {
        participants: [bob, frank, tim],
        messages: [
          {
            id: '123',
            from: bob,
            message: 'This is bob',
          },
          {
            id: '123',
            from: frank,
            message: 'This is frank :)',
          },
          {
            id: '123',
            from: tim,
            message: 'This is tim',
          },
        ],
      }
      const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))

      data.messages.push(newThread)

      // Write the updated data to a file
      fs.writeFileSync('./data.json', JSON.stringify(data, null, 2))

      res.send({ message: 'Message posted' })
    } catch (err) {
      console.error(err)
    }
  })
  next()
}
