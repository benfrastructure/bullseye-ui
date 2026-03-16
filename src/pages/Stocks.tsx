import { useState } from 'react'
import { useStocks } from '../hooks/useStocks'
import StockCard from '../components/StockCard'
import './Stocks.css'

function Stocks() {
  const { stocks } = useStocks()
  const [search, setSearch] = useState('')

  const filtered = stocks.filter(stock =>
    stock.ticker.toLowerCase().includes(search.toLowerCase()) ||
    stock.companyName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="stocks-container">
      <h1 className="stocks-title">Stocks</h1>
      <input
        className="stocks-search"
        type="text"
        placeholder="Search by name or ticker..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table className="stocks-table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Company</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(stock => (
            <StockCard key={stock.ticker} stock={stock} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Stocks