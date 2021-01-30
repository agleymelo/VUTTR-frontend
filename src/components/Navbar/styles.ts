import styled from 'styled-components'

import Button from '../Button'

export const Container = styled.div`
  padding: 10px 0px;
`

export const ContentBar = styled.div`
  width: 100%;
  height: 54px;
`
export const HeaderContent = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  img {
    width: 32px;
    height: 32px;
  }

  div {
    display: flex;
    align-items: center;

    span {
      padding-right: 16px;
      text-transform: uppercase;
      font-size: 12px;
    }

    button {
      margin-top: 0;

      a {
        text-decoration: none;
        color: #fff;
      }
    }
  }
`
export const ButtonProfile = styled(Button)`
  background: #365df0;

  width: 174px;
  height: 40px;

  transition: background 0.3s ease-in-out;
`
