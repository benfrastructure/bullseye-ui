import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { StockProvider } from './components/StockProvider'
import { PortfolioProvider } from './components/PortfolioProvider'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StockProvider>
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </StockProvider>
    </BrowserRouter>
  </StrictMode>,
)
