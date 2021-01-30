import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'

import LogoBossa from '../../assets/Icon-Bossa.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useToast } from '../../hooks/Toast'
import api from '../../services/api'
import { Container, Content, AnimationContainer } from './styles'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const { addToast } = useToast()
  const history = useHistory()

  const { register, errors, handleSubmit } = useForm<SignUpFormData>({})

  const onHandleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      await api.post('users', data)

      addToast({
        type: 'success',
        title: 'User created'
      })

      history.push('/')
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Error creating user',
        description: err.response.data.error || 'error registering, try again'
      })
    }
  }, [])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoBossa} alt="VUTTR" />

          <form onSubmit={handleSubmit(onHandleSubmit)}>
            <h1>Sign Up</h1>

            <Input
              register={register}
              error={errors.email?.message}
              name="name"
              type="text"
              placeholder="Full Name"
              autoComplete=""
            />
            <Input
              register={register}
              error={errors.name?.message}
              name="email"
              type="email"
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

            <Button type="submit">Sign Up</Button>
          </form>

          <Link to="/">Back to Login</Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp
