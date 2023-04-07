import type axios from 'axios'
import type { Mocked } from 'vitest'
import { vi } from 'vitest'

import { mockPostRequest } from '@data/test'
import { mockAxios } from '@infra/test'

import { AxiosHttpClient } from './axios-http-client'

vi.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return { mockedAxios, sut }
}

describe('AxiosHttpClient', () => {
  test('should call axios with correct URL', async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
  test('should returns axios with correct response', () => {
    const { sut, mockedAxios } = makeSut()
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[1].value)
  })
})
