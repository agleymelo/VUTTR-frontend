import { shade } from 'polished'
import styled, { keyframes } from 'styled-components'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const appearFromUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px)
  }

  to {
    opacity: 1;
    transform: translateY(0)
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromUp} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }

  > a {
    color: #365df0;
    text-decoration: none;
    transition: color 0.4s;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 34px;
      height: 34px;
      font-size: 24px;
      color: #170c3a;
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.7, '#365df0')};
    }
  }
`
export const Form = styled.form``
