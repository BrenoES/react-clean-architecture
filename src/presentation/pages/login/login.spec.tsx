import { render } from '@testing-library/react'

import Login from '.'

describe('Login Component', () => {
  test('should not render spinner and error on start', async () => {
    const { getByTestId } = await render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
  test('should start with initial state', async () => {
    const { getByTestId } = await render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const subtmitButton = getByTestId('submit') as HTMLButtonElement
    expect(subtmitButton.disabled).toBe(true)
    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    const passworrdStatus = getByTestId('password-status')
    expect(passworrdStatus.title).toBe('Campo obrigatório')
  })
})
