import { faker } from '@faker-js/faker'

import type { HttpPostParams } from '@data/protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  body: faker.datatype.json(),
  url: faker.internet.url(),
})
