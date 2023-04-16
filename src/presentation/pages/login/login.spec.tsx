import type { RenderResult } from '@testing-library/react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import type { Validation } from '@presentation/protocols/validation'

import Login from '.'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string = ''
  input: object
  validate(input: object): string {
    this.input = input
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)
  return {
    sut,
    validationSpy,
  }
}

describe('Login Component', () => {
  afterEach(cleanup)
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
  test('should call Validation with correct email', async () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_value' } })
    expect(validationSpy.input).toEqual({ email: 'any_value' })
  })
})
