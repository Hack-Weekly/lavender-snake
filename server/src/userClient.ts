import { User } from 'shared/userTypes.js'
import { usersStorageClient } from './storageClients.js'
import { UserAccount } from './user/data.js'

class UserClient {
  async LoadUsers() {
    const allUserAccounts = await this.LoadUserAccounts()
    // Only return the account data, with password/email removed
    return allUserAccounts.map((acct) => acct.user)
  }

  async LoadUserAccounts() {
    const res = (await usersStorageClient.load(
      'allUsers'
    )) as unknown as UserAccount[] // this is special
    return res ?? []
  }

  async AddUser(userAccount: UserAccount) {
    const allUserAccounts = await this.LoadUserAccounts()
    await usersStorageClient.save('allUsers', [
      ...allUserAccounts,
      userAccount,
    ] as any)
  }
}

export const userClient = new UserClient()
