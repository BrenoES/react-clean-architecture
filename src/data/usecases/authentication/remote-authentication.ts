import type { HttpPostClient } from '@data/protocols/http'
import { HttpStatusCode } from '@data/protocols/http'
import { InvalidCredentialError, UnexpectedError } from '@domain/error'
import type { AccountModel } from '@domain/models'
import type { AuthenticationParams, Authentication } from '@domain/usecases'

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
