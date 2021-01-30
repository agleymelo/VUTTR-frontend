import { shade } from 'polished'
import styled, { keyframes } from 'styled-components'

// import { Form } from '@unform/web'

import Button from '../../components/Button'

export const Container = styled.div`
  height: 100vh;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 50px;

  h1 {
    font-size: 42px;
    color: #170c3a;
  }

  h2 {
    margin-top: 16px;
    color: #170c3a;
  }
`
export const ContentMiddle = styled.div`
  margin-top: 32px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ContaineSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 10px;
  background: #ebeaed;
  border-radius: 5px;
  width: auto;

  input {
    border: none;
    background: none;
    font-size: 18px;
  }
`

export const ButtonAdd = styled(Button)`
  background: #0dcb7d;

  margin-top: 0px;

  width: 174px;
  height: 40px;

  transition: background 0.3s ease-in-out;

  &:hover {
    background: ${shade(0.2, '#10B26C')};
  }
`

export const ContentModal = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    max-width: 530px;
    width: 100%;
    margin: 0 auto;

    margin-bottom: 24px;

    h3 {
      text-transform: uppercase;
    }

    button {
      margin: 0;

      background: transparent;
      width: 36px;
      height: 32px;

      &:hover {
        background: transparent;
      }

      img {
        width: 24px;
        height: 24px;
      }
    }
  }
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;

  max-width: 530px;
  width: 100%;
  margin: 0 auto;

  p {
    color: #170c3a;
    font-size: 22px;

    margin-top: 16px;

    &:first-child {
      margin-top: 0px;
    }
  }

  button {
    margin-top: 32px;

    background: #0dcb7d;

    transition: background 0.3s ease-in-out;

    &:hover {
      background: ${shade(0.2, '#10B26C')};
    }
  }
`

export const ContentModalButtons = styled.div`
  display: flex;

  justify-content: space-between !important;

  margin-top: 16px;

  button {
    margin-top: 16px;

    width: 150px;
    height: 42px;

    background: #0dcb7d;

    transition: background 0.3s ease-in-out;

    &:hover {
      background: ${shade(0.2, '#10B26C')};
    }
  }
`

export const ButtonRemoveTool = styled(Button)`
  margin-top: 8px;

  background: #f95e5a !important;

  &:hover {
    background: ${shade(0.3, '#f95e5a')} !important;
  }
`

export const ContainerCard = styled.div`
  display: flex;

  margin: 16px 0px;

  &:last-child {
    padding-bottom: 32px;
  }
`
export const ContentCard = styled.div`
  background: #8f8a9b;

  padding: 8px 16px;

  width: 100%;
  height: 150px;

  border-radius: 9px;

  color: #ffffff;

  a {
    text-decoration: none;
    font-size: 12px;
    color: #ffffff;

    padding-top: 8px;

    &:hover {
      color: ${shade(0.3, '#FCFCFD')};
      transition: text-decoration 0.3s;
      text-decoration: underline;
    }
  }

  .footer {
    cursor: pointer;

    p {
      height: 64px;
      padding-top: 16px;

      font-size: 16px;
    }

    span {
      display: inline-block;

      font-size: 12px;

      & + span {
        margin-left: 8px;
      }
    }
  }
`
export const ContentHeader = styled.div`
  display: flex;

  justify-content: space-between;
  height: 32px !important;

  .title {
    font-size: 24px;
    font-weight: normal;
  }

  button {
    margin: 0;

    background: transparent;
    width: 36px;
    height: 32px;

    &:hover {
      background: transparent;
    }

    img {
      width: 20px;
      height: 20px;
    }
  }
`

export const TitleModal = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  flex: 1;
  font-size: 16px;

  text-transform: uppercase;

  margin-top: 32px;
`

const animationLoading = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: -140px;
  height: 100%;

  img {
    width: 50px;
    animation-name: ${animationLoading};
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`
