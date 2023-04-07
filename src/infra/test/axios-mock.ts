import { faker } from '@faker-js/faker'
import axios from 'axios'
import type { Mocked } from 'vitest'

export const mockAxios = (): Mocked<typeof axios> => {
  const mockedAxios = axios as Mocked<typeof axios>

  mockedAxios.post.mockResolvedValue({
    data: faker.datatype.json(),
    status: faker.internet.httpStatusCode({ types: ['success'] }),
  })

  return mockedAxios
}
