import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #FFF;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button, textarea, p, h1, h2, h3 {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: bold
  }

  button {
    cursor: pointer;
  }

  #root {
    height: 100vh;
    max-width: 970px;
    margin: 0 auto;
    padding: 0 40px;
  }
`
