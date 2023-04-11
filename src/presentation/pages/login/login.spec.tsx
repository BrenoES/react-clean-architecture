import { render } from '@testing-library/react'

import Login from '.'

describe('Login Component', () => {
  test('should not render spinner and error on start', async () => {
    const { getByTestId } = await render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
})