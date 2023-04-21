import type { AccountModel } from '@domain/models'
import { mockAccount } from '@domain/test'
import type { Authentication, AuthenticationParams } from '@domain/usecases'

export class AuthenticationSpy implements Authentication {
  account = mockAccount()
  params: AuthenticationParams
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}
