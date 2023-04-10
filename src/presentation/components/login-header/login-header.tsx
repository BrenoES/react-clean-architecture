import Logo from '@presentation/components/logo/logo'
import styles from './login-header.module.scss'
import React, { memo } from 'react'

const LoginHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para programadores</h1>
    </header>
  )
}

export default memo(LoginHeader)
