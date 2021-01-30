import { useEffect } from 'react'

import ErrorToast from '../../../assets/svg/ErrorToast.svg'
import IconClose from '../../../assets/svg/Icon-Close-2px.svg'
import InfoToast from '../../../assets/svg/InfoToast.svg'
import SuccessToast from '../../../assets/svg/SuccessToast.svg'
import { IToastMessage, useToast } from '../../../hooks/Toast'
import { Container } from './styles'

interface ToastProps {
  data: IToastMessage
  style: Record<string, unknown>
}

const icons = {
  info: <img src={InfoToast} alt={InfoToast} />,
  error: <img src={ErrorToast} alt={InfoToast} />,
  success: <img src={SuccessToast} alt={InfoToast} />
}

const Toast: React.FC<ToastProps> = ({ data: message, style }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 5000)

    return () => {
      clearTimeout(timer)
    }
  }, [message.id, removeToast])

  return (
    <Container type={message.type} hasdescription={Number(!!message.description)} style={style}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        <img src={IconClose} alt="" />
      </button>
    </Container>
  )
}

export default Toast
