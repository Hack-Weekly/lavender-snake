interface User {
  name: string
  picture: string
}

export interface Message {
  id: string
  from: User
  message: string
}

// a single group, or 1-on-1 conversation
interface ChatData {
  participants: User[]
  messages: Message[]
}

// All the data for the current user (e.g., everything displayed)
export interface UserChatData {
  chatDatas: ChatData[]
  selectedChat: number
}

// some test users
export const bob: User = {
  name: 'Bob',
  picture: '',
}

const frank: User = {
  name: 'Frank',
  picture: '',
}

const tim: User = {
  name: 'Tim',
  picture: '',
}

const defaultChatData: UserChatData = {
  chatDatas: [
    {
      participants: [bob, frank],
      messages: [
        {
          id: '123',
          from: bob,
          message: 'Hi, Frank.',
        },
        {
          id: '223',
          from: frank,
          message: 'Hi Bob!',
        },
      ],
    },
    {
      participants: [bob, tim],
      messages: [],
    },
  ],
  selectedChat: 0,
}

export const data = {
  messages: [{}],
}
