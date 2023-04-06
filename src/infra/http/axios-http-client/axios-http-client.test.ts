import { faker } from '@faker-js/faker'
import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import { Mocked, vi } from 'vitest'
import { HttpPostParams } from '@data/protocols/http'

vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

const makeSut = () => {
  return new AxiosHttpClient()
}
const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json(),
})
describe('AxiosHttpClient', () => {
  test('should call axios with correct URL', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url)
  })
})
