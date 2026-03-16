import { useState, useEffect } from 'react'
import { usePortfolio } from './usePortfolio'
import { useStocks } from './useStocks'
import { fetchPortfolioHistory } from '../api/api'

export function usePortfolioValue() {
  const { holdings, cashBalance } = usePortfolio()
  const { stocks } = useStocks()
  const [valueHistory, setValueHistory] = useState<{ time: number, value: number }[]>([])

  // Fetch history from API on load and every 5 seconds
  useEffect(() => {
    fetchPortfolioHistory().then(data => setValueHistory(data))

    const interval = setInterval(() => {
      fetchPortfolioHistory().then(data => setValueHistory(data))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  function getCurrentValue(): number {
    const holdingsValue = holdings.reduce((total, holding) => {
      const stock = stocks.find(s => s.ticker === holding.ticker)
      return total + holding.shares * (stock?.price ?? holding.purchasePrice)
    }, 0)
    return holdingsValue + cashBalance
  }

  return { valueHistory, currentValue: getCurrentValue() }
}