import { AccountModel } from '@domain/models/account-model'
import { faker } from '@faker-js/faker'

export const mockAccount = (): AccountModel => ({
  token: faker.datatype.uuid(),
})
