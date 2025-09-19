import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from 'styled-components'
import { RecoilRoot } from 'recoil'   // ⬅️ 추가

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <RecoilRoot>  
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>,
)
