import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Stocks from './pages/Stocks'
import Stock from './pages/Stock'
import Portfolio from './pages/Portfolio'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/stock/:ticker" element={<Stock />} />
      </Routes>
    </>
  )
}

export default App