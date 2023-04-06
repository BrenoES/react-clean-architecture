import { faker } from '@faker-js/faker'
import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import { Mocked, vi } from 'vitest'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL', async () => {
    const url = faker.internet.url()
    const sut = new AxiosHttpClient()
    await sut.post({ url })
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  })
})
