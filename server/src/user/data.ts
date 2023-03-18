import { generateId } from '@/utils/generateId'
import type { User } from '@shared/chatTypes'

interface UserAccount {
  email: string
  password: string
  user: User
}

const userAccounts: UserAccount[] = [
  {
    email: 'bob@dummy.com',
    password: 'bob123',
    user: {
      id: 'bobid',
      name: 'Bob',
      picture: 'https://robohash.org/Bob',
    },
  },
  {
    email: 'frank@dummy.com',
    password: 'frank123',
    user: {
      id: 'frankid',
      name: 'Frank',
      picture: 'https://robohash.org/Frank',
    },
  },
  {
    email: 'tim@dummy.com',
    password: 'tim123',
    user: {
      id: 'timid',
      name: 'Tim',
      picture: 'https://robohash.org/Tim',
    },
  },
]

export function addUser(
  email: string,
  password: string,
  username: string
): User {
  const userAccount = {
    email,
    password,
    user: {
      id: generateId(),
      name: username,
      picture: `https://robohash.org/${username}`,
    },
  }

  userAccounts.push(userAccount)
  return userAccount.user
}

export function getUserAccount(email: string) {
  return userAccounts.find((user) => user.email === email)
}
