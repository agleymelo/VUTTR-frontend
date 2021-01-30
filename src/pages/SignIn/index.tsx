import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'

import LogoBossa from '../../assets/Icon-Bossa.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/Auth'
import { useToast } from '../../hooks/Toast'
import { Container, Content, AnimationContainer } from './styles'
import schemaValidationSignIn from './validation'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const history = useHistory()

  const { register, errors, handleSubmit } = useForm<SignInFormData>({
    resolver: yupResolver(schemaValidationSignIn)
  })

  const onHandleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      await signIn({
        email: data.email,
        password: data.password
      })
      history.push('/app')

      addToast({
        type: 'success',
        title: 'Successfully logged in'
      })
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Authentication error!',
        description: 'There was an error SingIn in, check your credentials'
      })
    }
  }, [])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoBossa} alt="VUTTR" />

          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <h1>Login</h1>

            <Input
              register={register}
              error={errors.email?.message}
              name="email"
              type="text"
              placeholder="E-mail"
              autoComplete=""
            />
            <Input
              register={register}
              error={errors.password?.message}
              name="password"
              type="password"
              placeholder="Password"
              autoComplete=""
            />

            <Button type="submit">Log in</Button>
          </form>

          <Link to="/signup">Create an account</Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignIn
