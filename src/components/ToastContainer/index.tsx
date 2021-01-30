import { useTransition } from 'react-spring'

import { IToastMessage } from '../../hooks/Toast'
import { Container } from './styles'
import Toast from './Toast'

interface ItoastContainerProps {
  messages: IToastMessage[]
}

const ToastContainer: React.FC<ItoastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, message => message.id, {
    from: {
      right: '-120%',
      opacity: 0
    },
    enter: {
      right: '0%',
      opacity: 1
    },
    leave: {
      right: '-120%',
      opacity: 0
    }
  })

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} data={item} />
      ))}
    </Container>
  )
}

export default ToastContainer
