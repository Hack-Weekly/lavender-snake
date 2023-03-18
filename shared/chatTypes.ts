export type UserId = string;
export interface User {
  id: UserId;
  name: string;
  picture: string;
}

export type MessageId = string;
export interface Message {
  id: MessageId;
  from: UserId;
  message: string;
}

// a single group, or 1-on-1 conversation
export type ThreadId = string;
export interface Thread {
  id: ThreadId;
  participants: UserId[];
  messages: Message[];
}

export interface Data {
  messages: Thread[];
}

export interface UserChatData {
  threads: ThreadId[];
  contacts: User[];
}
