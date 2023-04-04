import type { HttpPostClient } from '@data/protocols/http/http-post-client'
import {
  HttpResponse,
  HttpStatusCode,
} from '@data/protocols/http/http-response'
import { InvalidCredentialError } from '@domain/error/invalid-credential'
import type { AuthenticationParams } from '@domain/usecases/authentication'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      body: params,
      url: this.url,
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized: {
        throw new InvalidCredentialError()
      }
      default: {
        return Promise.resolve()
      }
    }
  }
}
