import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'

import IconArrowLeft from '../../assets/svg/IconArrowLeft.svg'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { useAuth } from '../../hooks/Auth'
import { useToast } from '../../hooks/Toast'
import api from '../../services/api'
import { Container, Content, NavBar, ButtonRemoveUser } from './styles'
import schemaValidationUpdateUser from './validation'

interface IFormInputs {
  name: string
  email: string
  old_password: string
  password: string
}

const Profile: React.FC = () => {
  const { register, errors, reset, handleSubmit } = useForm<IFormInputs>({
    resolver: yupResolver(schemaValidationUpdateUser)
  })

  const { user, signOut, setUser } = useAuth()
  const { addToast } = useToast()
  const history = useHistory()

  useEffect(() => {
    reset({
      email: user.email,
      name: user.name
    })
  }, [])

  const onHandleSubmitUpdateUser = useCallback((data: IFormInputs) => {
    let bodyRequest = {}

    if (data.old_password.length === 0 && data.password.length === 0) {
      bodyRequest = {
        name: data.name,
        email: data.email
      }
    } else {
      bodyRequest = {
        name: data.name,
        email: data.email,
        old_password: data.old_password,
        password: data.password
      }
    }

    api
      .put('users', bodyRequest)
      .then(response => {
        if (response.status === 200) {
          addToast({
            type: 'success',
            title: 'User update successfully'
          })

          setUser(response.data)
        }
      })
      .catch(() => {
        addToast({
          type: 'error',
          title: 'An error occurred, please try again'
        })
      })
  }, [])

  return (
    <Container>
      <NavBar>
        <div>
          <img src={IconArrowLeft} alt="" onClick={() => history.push('/app')} />
          <p>App</p>
        </div>

        <Button
          type="button"
          onClick={() => {
            signOut()
            history.push('/')
          }}
        >
          Logout
        </Button>
      </NavBar>

      <Content>
        <form onSubmit={handleSubmit(onHandleSubmitUpdateUser)}>
          <Input register={register} error={errors.name?.message} name="name" type="text" placeholder="Name" />
          <Input register={register} error={errors.email?.message} name="email" type="email" placeholder="Email" />

          <div className="inputPassword">
            <Input
              register={register}
              error={errors.old_password?.message}
              name="old_password"
              type="password"
              placeholder="Old Password"
            />
            <Input
              register={register}
              error={errors.password?.message}
              name="password"
              type="password"
              placeholder="New Password"
            />
          </div>

          <Button type="submit">Update Profile</Button>
        </form>

        <ButtonRemoveUser type="submit">Remove Profile</ButtonRemoveUser>
      </Content>
    </Container>
  )
}

export default Profile
