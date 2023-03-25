import { usersStorageClient } from './storageClients.js'
import { UserAccount } from './user/data.js'

class UserClient {
  async LoadUsers() {
    const allUserAccounts = (await usersStorageClient.load(
      'allUsers'
    )) as unknown as UserAccount[] // this is special
    // Only return the account data, with password/email removed
    return allUserAccounts.map((acct) => acct.user)
  }
}

export const userClient = new UserClient()
