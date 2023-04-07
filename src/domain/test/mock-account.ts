import { faker } from '@faker-js/faker'

import type { AccountModel } from '@domain/models'

export const mockAccount = (): AccountModel => ({
  token: faker.datatype.uuid(),
})
