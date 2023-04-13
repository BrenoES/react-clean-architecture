import React, { useState } from 'react'

import {
  LoginHeader as Header,
  Footer,
  Input,
  FormStatus,
} from '@presentation/components'
import { Context } from '@presentation/contexts/form/fom-context'

import styles from './login-styles.module.scss'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
  })

  const [errorState] = useState({
    email: 'Campo obrigatório',
    main: '',
    password: 'Campo obrigatório',
  })

  return (
    <div className={styles.login}>
      <Header />
      <Context.Provider value={{ errorState, state }}>
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
