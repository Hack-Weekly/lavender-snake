import { User, UserId } from "./userTypes.js"
import { DateTime } from "luxon"

export type MessageId = string
export interface Message {
	id: MessageId
	from: UserId
	message: string
	dateTime: DateTime
}

// a single group, or 1-on-1 conversation
export type ThreadId = string
export interface Thread {
	id: ThreadId
	participants: UserId[]
	messages: Message[]
}

export interface ThreadSummary {
	id: ThreadId
	participants: UserId[]
	lastMessage: Message
}

export interface Data {
	messages: Thread[]
}

export interface UserChatData {
	threads: ThreadSummary[]
	contacts: User[]
}

export const genThreadSummary = (thread: Thread) => {
	const res: ThreadSummary = {
		id: thread.id,
		lastMessage: { ...thread.messages[thread.messages.length - 1] },
		participants: [...thread.participants],
	}
	if (res.lastMessage.message.length > 23) {
		res.lastMessage.message = `${res.lastMessage.message.substring(0, 20)}...`
	}
	return res
}
