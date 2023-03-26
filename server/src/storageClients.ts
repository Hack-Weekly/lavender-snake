import { Bucket, Storage } from '@google-cloud/storage'
import {
  Thread,
  ThreadSummary,
  UserChatData,
  genThreadSummary,
} from 'shared/chatTypes.js'
import { UserAccount } from './user/data.js'
import { DateTime } from 'luxon'
import { LAVENDER_BUDDY_ID } from './chatClient.js'

const storage = new Storage()

class storageClient<ContentT> {
  isProd: boolean
  bucket: Bucket
  inMemoryStorage: any
  constructor(bucket: string, inMemoryStorage: any) {
    this.isProd = process.env.NODE_ENV === 'production'
    console.log(this.isProd ? 'Prod environment' : 'Dev environment')
    this.inMemoryStorage = inMemoryStorage
    if (this.isProd) {
      this.bucket = storage.bucket(bucket)
    }
  }

  async clearStorage() {
    await this.bucket?.deleteFiles()
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

// const testUser = {
//   // TODO: don't copy this
//   email: 'testuser@dummy.com',
//   password: 'test',
//   user: {
//     id: 'testuserid',
//     name: 'Test User',
//     picture:
//       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/555.png',
//   },
// }
// const autoFriend = {
//   email: `${LAVENDER_BUDDY_ID}@dummy.com`,
//   password: '3316a735-2da2-43b4-978a-138a1eab26b1',
//   user: {
//     id: LAVENDER_BUDDY_ID,
//     name: 'Lavender Buddy',
//     picture:
//       'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png',
//   },
// }

// const threadData: Thread = {
//   id: '3c908c32-c061-494f-a038-682d9c15eb76',
//   messages: [
//     {
//       id: '22692d8f-5677-4657-a281-a5696d00ea08',
//       from: autoFriend.user.id,
//       message: 'Hi, test user!',
//       dateTime: DateTime.now().toString(),
//     },
//   ],
//   participants: [autoFriend.user.id, testUser.user.id],
// }

// const threadDataSummary = genThreadSummary(threadData)

// // TODO: we can't store the full user at rest.
// const testUserData: UserChatData = {
//   contacts: [testUser.user, autoFriend.user],
//   threads: [threadDataSummary],
// }

// const autoFriendData: UserChatData = {
//   contacts: [autoFriend.user, testUser.user],
//   threads: [threadDataSummary],
// }

// const chatMemoryStorage = {
//   [testUser.user.id]: testUserData,
//   [autoFriend.user.id]: autoFriendData,
// }
export const chatStorageClient = new storageClient<UserChatData>(
  'lavender-snake-chat-userdata',
  {}
)

// const threadMemoryStorage = {
//   [threadData.id]: threadData,
// }
export const threadStorageClient = new storageClient<Thread>(
  'lavender-snake-chat-threads',
  {}
)

// const usersMemoryStorage = {
//   allUsers: [testUser, autoFriend],
// }
export const usersStorageClient = new storageClient<UserAccount>(
  'lavender-snake-users',
  {}
)
// const todoMemoryStorage = {}
export const todoStorageClient = new storageClient<any>(
  'lavender-snake-todo',
  {}
)
