import type { HttpPostClient } from '@data/protocols/http/http-post-client'
import { HttpStatusCode } from '@data/protocols/http/http-response'
import { InvalidCredentialError } from '@domain/error/invalid-credential'
import { UnexpectedError } from '@domain/error/unexpected'
import { AccountModel } from '@domain/models/account-model'
import type {
  Authentication,
  AuthenticationParams,
} from '@domain/usecases/authentication'

type HttpPostClientAutentication = HttpPostClient<
  AuthenticationParams,
  AccountModel
>
export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClientAutentication
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      body: params,
      url: this.url,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized: {
        throw new InvalidCredentialError()
      }
      default: {
        throw new UnexpectedError()
      }
    }
  }
}
