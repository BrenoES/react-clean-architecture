import { useContext } from 'react'

import SpinnerLoader from '@presentation/components/spinner-loader'
import { Context } from '@presentation/contexts/form/fom-context'

import styles from './form-status.module.scss'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {state.isLoading && <SpinnerLoader className={styles.spinner} />}
      {errorState.main && (
        <span className={styles.error}>{errorState.main}</span>
      )}
    </div>
  )
}

export default FormStatus
