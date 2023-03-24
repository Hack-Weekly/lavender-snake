import { Storage } from '@google-cloud/storage'
import {
  Thread,
  ThreadSummary,
  UserChatData,
  genThreadSummary,
} from 'shared/chatTypes.js'
import { UserAccount } from './user/data.js'
import { Thread, ThreadSummary, UserChatData } from 'shared/chatTypes.js'
import { DateTime } from 'luxon'

const storage = new Storage()

class storageClient<ContentT> {
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

  async load(id): Promise<ContentT | undefined> {
    if (this.isProd) {
      const file = this.bucket.file(id)
      if ((await file.exists())[0]) {
        return JSON.parse((await file.download()).toString())
      }

      return undefined
    } else {
      // dev
      return this.inMemoryStorage[id] || undefined
    }
  }

  async save(id: string, o: ContentT | undefined) {
    if (this.isProd) {
      await this.bucket.file(id).save(JSON.stringify(o))
    } else {
      // dev
      this.inMemoryStorage[id] = o
    }
  }
}

const testUser = {
  // TODO: don't copy this
  email: 'testuser@dummy.com',
  password: 'test',
  user: { id: 'testuserid', name: 'Test User', picture: 'my picture' },
}
const autoFriend = {
  email: 'autofriend@dummy.com',
  password: '3316a735-2da2-43b4-978a-138a1eab26b1',
  user: { id: 'autofriendid', name: 'Lavender Buddy', picture: 'my picture' },
}

const threadData: Thread = {
  id: '3c908c32-c061-494f-a038-682d9c15eb76',
  messages: [
    {
      id: '22692d8f-5677-4657-a281-a5696d00ea08',
      from: autoFriend.user.id,
      message: 'Hi, test user!',
      dateTime: DateTime.now(),
    },
  ],
  participants: [autoFriend.user.id, testUser.user.id],
}

const threadDataSummary = genThreadSummary(threadData)

// TODO: we can't store the full user at rest.
const testUserData: UserChatData = {
  contacts: [testUser.user, autoFriend.user],
  threads: [threadDataSummary],
}

const autoFriendData: UserChatData = {
  contacts: [autoFriend.user, testUser.user],
  threads: [threadDataSummary],
}

const chatMemoryStorage = {
  [testUser.user.id]: testUserData,
  [autoFriend.user.id]: autoFriendData,
}
export const chatStorageClient = new storageClient<UserChatData>(
  'lavender-snake-chat-userdata',
  chatMemoryStorage
)

const threadMemoryStorage = {
  [threadData.id]: threadData,
}
export const threadStorageClient = new storageClient<Thread>(
  'lavender-snake-chat-threads',
  threadMemoryStorage
)

const usersMemoryStorage = {
  allUsers: [testUser, autoFriend],
}
export const usersStorageClient = new storageClient<UserAccount>(
  'lavender-snake-users',
  usersMemoryStorage
)
const todoMemoryStorage = {}
export const todoStorageClient = new storageClient<any>(
  'lavender-snake-todo',
  todoMemoryStorage
)
