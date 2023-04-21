import { faker } from '@faker-js/faker'
import type { RenderResult } from '@testing-library/react'
import { cleanup, fireEvent, render } from '@testing-library/react'

import { AuthenticationSpy, ValidationStub } from '@presentation/test'

import Login from '.'

type SimulateStatusParams = {
  sut: RenderResult
  fieldName: string
  validationError?: string
}
type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

type SimulateValidSubmitParams = {
  sut: RenderResult
  email?: string
  password?: string
}

const simulateValidSubmit = ({
  sut,
  email = faker.internet.email(),
  password = faker.internet.password(),
}: SimulateValidSubmitParams) => {
  populateEmailField({ email, sut })
  populatePasswordField({ password, sut })
  const subtmitButton = sut.getByTestId('submit')
  fireEvent.click(subtmitButton)
}

const populateEmailField = ({ sut, email = faker.internet.email() }) => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = ({
  sut,
  password = faker.internet.password(),
}) => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input(passwordInput, {
    target: { value: password },
  })
}

const simulateStatusFor = ({
  sut,
  fieldName,
  validationError,
}: SimulateStatusParams) => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  )
  return {
    authenticationSpy,
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
    simulateStatusFor({ fieldName: 'email', sut, validationError })
    simulateStatusFor({ fieldName: 'password', sut, validationError })
  })

  test('should show email error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField({ sut })
    simulateStatusFor({ fieldName: 'email', sut, validationError })
  })

  test('should show password error if Validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordField({ sut })
    simulateStatusFor({ fieldName: 'password', sut, validationError })
  })

  test('should show valid email state if Validation succeeds', async () => {
    const { sut } = makeSut()
    populateEmailField({ sut })
    simulateStatusFor({ fieldName: 'email', sut })
  })

  test('should show valid password state if Validation succeeds', async () => {
    const { sut } = makeSut()
    populatePasswordField({ sut })
    simulateStatusFor({ fieldName: 'password', sut })
  })

  test('should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    populateEmailField({ sut })
    populatePasswordField({ sut })
    const subtmitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(subtmitButton.disabled).toBe(false)
  })

  test('should show spinner on submit', async () => {
    const { sut } = makeSut()
    simulateValidSubmit({ sut })
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit({ email, password, sut })
    expect(authenticationSpy.params).toEqual({
      email,
      password,
    })
  })
})
