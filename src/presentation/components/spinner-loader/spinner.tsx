import React from 'react'

import styles from './spinner-styles.module.scss'

type Props = React.HTMLAttributes<HTMLElement>

const SpinnerLoader: React.FC<Props> = (props: Props) => {
  const { className, ...propsAttr } = props
  return (
    <div {...propsAttr} className={[styles.spinner, className].join(' ')}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default SpinnerLoader
