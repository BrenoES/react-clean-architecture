import SpinnerLoader from '@presentation/components/spinner-loader'
import styles from './form-status.module.scss'

const FormStatus: React.FC = () => {
  return (
    <div className={styles.errorWrap}>
      <SpinnerLoader className={styles.spinner} />
      <span className={styles.error}>Erro</span>
    </div>
  )
}

export default FormStatus
