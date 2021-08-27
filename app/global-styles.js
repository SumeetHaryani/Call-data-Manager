import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    /* background-color: #fafafa; */
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    /* font-family: Georgia, Times, 'Times New Roman', serif; */
    line-height: 1.5em;
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 150px;
  }

  .content{
    padding: 90px 50px;
    height: 100vh;
  
  }
`;

export default GlobalStyle;
