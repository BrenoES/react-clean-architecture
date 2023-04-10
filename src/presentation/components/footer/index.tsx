import styles from './footer.module.scss'
import React, { memo } from 'react'

const Footer: React.FC = () => {
  return <footer className={styles.footer}></footer>
}

export default memo(Footer)
