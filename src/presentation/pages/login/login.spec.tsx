import { faker } from '@faker-js/faker'
import type { RenderResult } from '@testing-library/react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { ValidationStub } from '@presentation/test'

import Login from '.'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} />)
  return {
    sut,
  }
}

describe('Login Component', () => {
  afterEach(cleanup)
  test('should start with initial state', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const subtmitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(subtmitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    const passworrdStatus = sut.getByTestId('password-status')
    expect(passworrdStatus.title).toBe(validationError)
  })

  test('should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
  })

  test('should show password error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
  })

  test('should show valid email state if Validation succeeds', async () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
  })

  test('should show valid password state if Validation succeeds', async () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
  })

  test('should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    })
    const subtmitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(subtmitButton.disabled).toBe(false)
  })
})
