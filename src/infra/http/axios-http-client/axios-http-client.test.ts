import { faker } from '@faker-js/faker'
import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import { Mocked, vi } from 'vitest'
import { HttpPostParams } from '@data/protocols/http'

vi.mock('axios')

const mockedAxiosResult = {
  status: faker.internet.httpStatusCode(),
  data: faker.datatype.json(),
}
const mockedAxios = axios as Mocked<typeof axios>
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

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
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
  test('should returns axios with correct response', async () => {
    const sut = makeSut()
   const httpResponse =  await sut.post(mockPostRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    })
  })
})
