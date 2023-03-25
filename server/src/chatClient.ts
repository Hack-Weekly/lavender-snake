import {
  genThreadSummary,
  Message,
  Thread,
  ThreadId,
  UserChatData,
} from 'shared/chatTypes.js'
import { UserId } from 'shared/userTypes.js'
import {
  chatStorageClient,
  threadStorageClient,
  usersStorageClient,
} from './storageClients.js'
import { UserAccount } from './user/data.js'
import { generateId } from './utils/generateId.js'
import { upsert } from 'shared/utils.js'

class ChatClient {
  async GetUserData(userId: UserId) {
    return await chatStorageClient.load(userId)
  }

  async SetUserData(userId: UserId, chatData: UserChatData) {
    return await chatStorageClient.save(userId, chatData)
  }

  async AddMessageToThread(
    thread: Thread | ThreadId,
    senderId: UserId,
    messageText: string
  ) {
    if (typeof thread === 'string') {
      thread = await this.GetThread(thread)
    }
    const message: Message = {
      id: generateId(),
      from: senderId,
      message: messageText,
    }

    if (!thread.participants.includes(senderId)) {
      return { error: 'Access not allowed to this thread' }
    }

    // Save the updated thread
    thread.messages.push(message)
    await threadStorageClient.save(thread.id, thread)

    // Update user data
    const threadSummary = genThreadSummary(thread)
    for (const participant of thread.participants) {
      const userData = await this.GetUserData(participant)
      upsert(userData.threads, threadSummary, (ts) => ts.id)
      await this.SetUserData(participant, userData)
    }
    return { message, thread } // TODO: should this be before the save?
  }

  async SendMessage(
    senderId: UserId,
    recipientId: UserId,
    messageText: string
  ) {
    // lets see if a thread already exists
    const userData = await chatStorageClient.load(senderId)
    const threadSummary = userData.threads.find(
      (t) => t.participants.includes(recipientId) && t.participants.length === 2
    )
    if (threadSummary) {
      // Add to existing thread
      return await this.AddMessageToThread(
        threadSummary.id,
        senderId,
        messageText
      )
    } else {
      // Create new thread, and add message to it
      const thread: Thread = {
        id: generateId(),
        messages: [],
        participants: [senderId, recipientId],
      }
      return await this.AddMessageToThread(thread, senderId, messageText)
    }
  }

  async GetThread(threadId: ThreadId) {
    return await threadStorageClient.load(threadId)
  }
}

export const chatClient = new ChatClient()
