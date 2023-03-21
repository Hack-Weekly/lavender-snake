import { User } from '@shared/userTypes.js'

export interface UserAccount {
  email: string
  password: string
  user: User
}
