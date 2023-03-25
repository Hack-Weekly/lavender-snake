import { User, UserId } from "./userTypes.js";

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

export interface ThreadSummary {
  id: ThreadId;
  participants: UserId[];
  lastMessage: Message;
}

export interface Data {
  messages: Thread[];
}

export interface UserChatData {
  threads: ThreadSummary[];
  contacts: User[];
}

export const genThreadSummary = (thread: Thread) => {
  const res: ThreadSummary = {
    id: thread.id,
    lastMessage: thread.messages[thread.messages.length - 1],
    participants: [...thread.participants],
  };
  return res;
};
