import styled, { css } from 'styled-components'

import ToolTip from '../ToolTip'

interface ContainerProps {
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  background: #ebeaed;
  border-radius: 10px;
  padding: 16px;
  /* width: 100%; */
  border: 1px solid #f5f4f6;
  color: #121619;
  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      background: #feefee;
      border-color: #f95e5a;
    `}

  textarea {
    width: 100%;
    background-color: transparent;

    border-radius: 8px;
    border: none;

    font-size: 16px;
    resize: none;
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
