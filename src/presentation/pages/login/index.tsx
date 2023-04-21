import React, { useEffect, useState } from 'react'

import type { Authentication } from '@domain/usecases'
import {
  LoginHeader as Header,
  Footer,
  Input,
  FormStatus,
} from '@presentation/components'
import { Context } from '@presentation/contexts/form/fom-context'
import type { Validation } from '@presentation/protocols/validation'

import styles from './login-styles.module.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    email: '',
    emailError: 'Campo obrigatório',
    isLoading: false,
    mainError: '',
    password: '',
    passwordError: 'Campo obrigatório',
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    })
  }, [state.email, state.password])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    setState({ ...state, isLoading: true })
    await authentication.auth({ email: state.email, password: state.password })
  }

  return (
    <div className={styles.login}>
      <Header />
      <Context.Provider value={{ setState, state }}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            className={styles.submit}
            disabled={!!state.emailError || !!state.passwordError}
            type="submit"
            data-testid="submit"
          >
            Entrar
          </button>
          <span className={styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
