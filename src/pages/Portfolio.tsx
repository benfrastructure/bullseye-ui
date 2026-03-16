import { usePortfolio } from '../hooks/usePortfolio'
import { useStocks } from '../hooks/useStocks'
import './Portfolio.css'

function Portfolio() {
  const { holdings, cashBalance, sellShares } = usePortfolio()
  const { stocks } = useStocks()

  function getCurrentPrice(ticker: string): number {
    return stocks.find(s => s.ticker === ticker)?.price ?? 0
  }

  function getTotalValue(): number {
    const holdingsValue = holdings.reduce((total, holding) => {
      return total + holding.shares * getCurrentPrice(holding.ticker)
    }, 0)
    return holdingsValue + cashBalance
  }

  function formatCurrency(value: number): string {
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <div className="portfolio-page">
      <h1 className="portfolio-title">Portfolio</h1>

      <div className="portfolio-summary">
        <div className="portfolio-summary-item">
          <span className="portfolio-summary-label">Total Value</span>
          <span className="portfolio-summary-value">${formatCurrency(getTotalValue())}</span>
        </div>
        <div className="portfolio-summary-item">
          <span className="portfolio-summary-label">Cash Balance</span>
          <span className="portfolio-summary-value">${formatCurrency(cashBalance)}</span>
        </div>
      </div>

      {holdings.length === 0 ? (
        <p className="portfolio-empty">You don't own any shares yet.</p>
      ) : (
        <table className="portfolio-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Shares</th>
              <th>Purchase Price</th>
              <th>Current Price</th>
              <th>Value</th>
              <th>Gain / Loss</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding, index) => {
              const currentPrice = getCurrentPrice(holding.ticker)
              const value = holding.shares * currentPrice
              const gainLoss = (currentPrice - holding.purchasePrice) * holding.shares
              const isPositive = gainLoss >= 0

              return (
                <tr key={index}>
                  <td className="portfolio-ticker">{holding.ticker}</td>
                  <td>{holding.shares.toFixed(6)}</td>
                  <td>${formatCurrency(holding.purchasePrice)}</td>
                  <td>${formatCurrency(currentPrice)}</td>
                  <td>${formatCurrency(value)}</td>
                  <td className={isPositive ? 'gain' : 'loss'}>
                    {isPositive ? '+' : ''}${formatCurrency(gainLoss)}
                  </td>
                  <td>
                    <button className="sell-button" onClick={() => sellShares(holding.ticker, holding.shares, currentPrice)}>
                      Sell
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Portfolio