import { usePortfolioValue } from '../hooks/usePortfolioValue'
import { usePortfolio } from '../hooks/usePortfolio'
import StockTicker from '../components/StockTicker'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import './Dashboard.css'

function Dashboard() {
  const { valueHistory, currentValue } = usePortfolioValue()
  const { cashBalance } = usePortfolio()

  function formatCurrency(value: number): string {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <div className="dashboard-page">
      <StockTicker />

      <div className="dashboard-summary">
        <div className="dashboard-summary-item">
          <span className="dashboard-summary-label">Portfolio Value</span>
          <span className="dashboard-summary-value">${formatCurrency(currentValue)}</span>
        </div>
        <div className="dashboard-summary-item">
          <span className="dashboard-summary-label">Cash Balance</span>
          <span className="dashboard-summary-value">${formatCurrency(cashBalance)}</span>
        </div>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">Portfolio Value Today</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={valueHistory}>
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
                formatter={(value) => [`$${formatCurrency(Number(value))}`, 'Portfolio Value']}
            />
            <Line
                type="monotone"
                dataKey="value"
                stroke="#4dbda0"
                dot={false}
                isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Dashboard