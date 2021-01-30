import { InputHTMLAttributes, useState, useCallback } from 'react'
import { IconBaseProps } from 'react-icons'

import ErrorSVG from '../../assets/svg/Exclusion2.svg'
import { Container, Error } from './styles'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any
  error?: string | undefined
  containerStyle?: Record<string, unknown>
  IconComponent?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<IInputProps> = ({ name, error, register, containerStyle, IconComponent, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!register.current?.value)
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  return (
    <Container style={containerStyle} isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      {IconComponent && <IconComponent size={16} />}
      <input name={name} onFocus={handleInputFocus} onBlur={handleInputBlur} ref={register} {...rest} />

      {error && (
        <Error title={error}>
          <img src={ErrorSVG} alt="" />
        </Error>
      )}
    </Container>
  )
}

export default Input
