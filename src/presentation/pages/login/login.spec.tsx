import type { RenderResult } from '@testing-library/react'
import { render } from '@testing-library/react'

import Login from '.'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut,
  }
}

describe('Login Component', () => {
  test('should start with initial state', async () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const subtmitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(subtmitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    const passworrdStatus = sut.getByTestId('password-status')
    expect(passworrdStatus.title).toBe('Campo obrigatório')
  })
})
