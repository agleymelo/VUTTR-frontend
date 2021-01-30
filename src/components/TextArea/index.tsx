import { TextareaHTMLAttributes } from 'react'
import { IconBaseProps } from 'react-icons'

import ErrorSVG from '../../assets/svg/Exclusion2.svg'
import { Container, Error } from './styles'

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  error: string | undefined
  containerStyle?: Record<string, unknown>
  IconComponent?: React.ComponentType<IconBaseProps>
}

const TextArea: React.FC<ITextareaProps> = ({ name, register, error, containerStyle, IconComponent, ...rest }) => {
  return (
    <Container style={containerStyle} isErrored={!!error}>
      {IconComponent && <IconComponent size={16} />}
      <textarea name={name} rows={3} ref={register} {...rest} />

      {error && (
        <Error title={error}>
          <img src={ErrorSVG} alt="" />
        </Error>
      )}
    </Container>
  )
}

export default TextArea
