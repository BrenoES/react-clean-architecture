import SpinnerLoader from '@presentation/components/spinner-loader/spinner'
import React from 'react'

import styles from './login-styles.module.scss'
import Header from '@presentation/components/login-header/login-header'
import Footer from '@presentation/components/footer/footer'
import Input from '@presentation/components/input/input'
import FormStatus from '@presentation/components/form-status'

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <Header />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button className={styles.submit} type="submit">
          Entrar
        </button>
        <span className={styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
