import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Stocks from './pages/Stocks'
import Stock from './pages/Stock'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/stocks" element={<Stocks />} />
      <Route path="/stock/:ticker" element={<Stock />} />
    </Routes>
  )
}

export default App