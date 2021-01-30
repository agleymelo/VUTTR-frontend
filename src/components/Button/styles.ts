import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.button`
  background: #365df0;
  color: #fff;

  height: 40px;
  width: 100%;

  border-radius: 8px;

  padding: 0 8px;
  margin-top: 16px;

  transition: background-color 0.2s;

  font-size: 16px;
  font-weight: bold;

  &:hover {
    background: ${shade(0.2, '#2F55CC')};
  }
`
