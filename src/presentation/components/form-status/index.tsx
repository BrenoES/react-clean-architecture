import { useContext } from 'react'

import SpinnerLoader from '@presentation/components/spinner-loader'
import { Context } from '@presentation/contexts/form/fom-context'

import styles from './form-status.module.scss'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {isLoading && <SpinnerLoader className={styles.spinner} />}
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
