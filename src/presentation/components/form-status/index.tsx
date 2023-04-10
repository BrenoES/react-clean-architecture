import SpinnerLoader from '@presentation/components/spinner-loader/spinner'
import styles from './input.module.scss'

const FormStatus: React.FC = () => {
  return (
    <div className={styles.errorWrap}>
      <SpinnerLoader className={styles.spinner} />
      <span className={styles.error}>Erro</span>
    </div>
  )
}

export default FormStatus
