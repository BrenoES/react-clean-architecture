import React, { useEffect, useState } from 'react'

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
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    isLoading: false,
    mainError: '',
    passwordError: 'Campo obrigatório',
  })

  useEffect(() => {
    validation.validate({ email: state.email })

  }, [state.email])
  useEffect(() => {
    validation.validate({ password: state.password })
  }, [state.password])

  return (
    <div className={styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            className={styles.submit}
            disabled
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
