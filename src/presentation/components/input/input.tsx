import styles from './input.module.scss'
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={styles.inputWrap}>
      <input {...props} />
      <span className={styles.status}></span>
    </div>
  )
}

export default Input
