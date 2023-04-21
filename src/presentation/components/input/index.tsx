import { useContext } from 'react'

import { Context } from '@presentation/contexts/form/fom-context'

import styles from './input.module.scss'
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  function enableInput(event: React.FocusEvent<HTMLInputElement>): void {
    event.target.readOnly = false
  }

  const getTitle = () => {
    return error || 'Tudo certo!'
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className={styles.inputWrap}>
      <input
        {...props}
        data-testid={props.name}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={styles.status}
      ></span>
    </div>
  )
}

export default Input
