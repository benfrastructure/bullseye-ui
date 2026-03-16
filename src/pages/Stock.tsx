import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStocks } from '../hooks/useStocks'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import BuyModal from '../components/BuyModal'
import './Stock.css'

function Stock() {
  const { ticker } = useParams()
  const { stocks, priceHistory } = useStocks()
  const [showBuyModal, setShowBuyModal] = useState(false)

  const stock = stocks.find(s => s.ticker === ticker)
  const history = priceHistory[ticker ?? ''] ?? []

  if (!stock) return <p>Stock not found.</p>

  return (
    <div className="stock-page">
      <div className="stock-header">
        <p className="stock-ticker">{stock.ticker}</p>
        <h1 className="stock-company">{stock.companyName}</h1>
        <p className="stock-price">${stock.price.toFixed(2)}</p>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <XAxis
              dataKey="time"
              type="number"
              domain={[0, 86400]}
              tickCount={7}
              stroke="#4dbda0"
              tick={{ fill: '#4dbda0' }}
              tickFormatter={(seconds) => {
                const h = Math.floor(seconds / 3600)
                const m = Math.floor((seconds % 3600) / 60)
                const ampm = h >= 12 ? 'PM' : 'AM'
                const hour = h % 12 || 12
                return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`
              }}
            />
            <YAxis
              domain={['auto', 'auto']}
              stroke="#4dbda0"
              tick={{ fill: '#4dbda0' }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#111', border: '1px solid #4dbda0', color: '#4dbda0' }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#4dbda0"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="stock-details">
        <div className="stock-detail-item">
          <span className="stock-detail-label">Market Cap</span>
          <span className="stock-detail-value">${(stock.marketCap / 1_000_000_000).toFixed(1)}B</span>
        </div>
        <div className="stock-detail-item">
          <span className="stock-detail-label">Sector</span>
          <span className="stock-detail-value">{stock.sector}</span>
        </div>
      </div>

      <button className="buy-button" onClick={() => setShowBuyModal(true)}>Buy Shares</button>

      {showBuyModal && (
        <BuyModal stock={stock} onClose={() => setShowBuyModal(false)} />
      )}
    </div>
  )
}

export default Stock