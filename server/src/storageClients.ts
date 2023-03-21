import { Storage } from '@google-cloud/storage'

const storage = new Storage()

class storageClient {
  isProd: boolean
  bucket: any
  inMemoryStorage: any
  constructor(bucket: string, inMemoryStorage: any) {
    this.isProd = process.env.NODE_ENV === 'production'
    console.log(this.isProd ? 'Prod environment' : 'Dev environment')
    this.inMemoryStorage = inMemoryStorage
    if (this.isProd) {
      this.bucket = storage.bucket(bucket)
    }
  }

  async load(id) {
    if (this.isProd) {
      const file = this.bucket.file(id)
      if ((await file.exists())[0]) {
        return JSON.parse((await file.download()).toString())
      }

      return []
    } else {
      // dev
      return this.inMemoryStorage[id] || []
    }
  }

  async save(id, o) {
    if (this.isProd) {
      await this.bucket.file(id).save(JSON.stringify(o))
    } else {
      // dev
      this.inMemoryStorage[id] = o
    }
  }
}

const chatMemoryStorage = {}
export const chatStorageClient = new storageClient(
  'lavender-snake-chat',
  chatMemoryStorage
)

const usersMemoryStorage = {
  allUsers: [
    {
      // TODO: don't copy this
      email: 'testuser@dummy.com',
      password: 'test',
      user: { id: 'testuserid', name: 'Test User', picture: 'my picture' },
    },
  ],
}
export const usersStorageClient = new storageClient(
  'lavender-snake-users',
  usersMemoryStorage
)
const todoMemoryStorage = {}
export const todoStorageClient = new storageClient(
  'lavender-snake-todo',
  todoMemoryStorage
)
