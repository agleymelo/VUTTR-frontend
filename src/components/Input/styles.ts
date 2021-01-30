import styled, { css } from 'styled-components'

import ToolTip from '../ToolTip'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  background: #ebeaed;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  border: 1px solid #f5f4f6;
  color: #121619;
  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      background: #feefee;
      border-color: #f95e5a;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ebeaed;
      color: #dedce1;
    `}

  ${props =>
    props.isFilled &&
    css`
      border-color: #10b26c;
    `}

  input {
    color: #121619;
    flex: 1;
    background: transparent;
    border: 0;

    &::placeholder {
      color: #666360;
    }
  }

  img {
    width: 24px;
    height: 24px;
  }

  svg {
    margin-right: 16px;
  }
`

export const Error = styled(ToolTip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #f95e5a;
    color: #fff;

    &::before {
      border-color: #f95e5a transparent;
    }
  }
`
