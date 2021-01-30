import { shade } from 'polished'
import styled from 'styled-components'

import Button from '../../components/Button'

export const Container = styled.div`
  width: 100%;
`
export const NavBar = styled.div`
  padding-top: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;

    img {
      cursor: pointer;
      width: 32px;
      height: 32px;
      margin-right: 16px;
    }

    p {
      text-transform: uppercase;
      color: #170c3a;
    }
  }

  button {
    width: 240px;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  margin: auto 0px;

  width: 100%;
  height: 600px;

  form {
    width: 600px;

    .inputPassword {
      margin-top: 16px;

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      div {
        margin-top: 0px;

        width: 250px;
      }
    }
    button {
      margin-top: 24px;
    }
  }
`
export const ButtonRemoveUser = styled(Button)`
  background: #f95e5a;

  margin-top: 32px;

  width: 600px;

  &:hover {
    background: ${shade(0.3, '#f95e5a')};
  }
`
