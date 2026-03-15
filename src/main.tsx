import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { StockProvider } from './components/StockProvider'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StockProvider>
        <App />
      </StockProvider>
    </BrowserRouter>
  </StrictMode>,
)
