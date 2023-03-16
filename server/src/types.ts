export interface User {
  name: string
  picture: string
}

export interface Message {
  id: string
  from: User
  message: string
}

// a single group, or 1-on-1 conversation
export interface Thread {
  participants: User[]
  messages: Message[]
}

export interface Data {
  messages: Thread[]
}
