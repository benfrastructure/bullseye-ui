import { useState, useEffect } from 'react'
import { usePortfolio } from './usePortfolio'
import { useStocks } from './useStocks'
import type { PricePoint } from '../types/PricePoint'

export function usePortfolioValue() {
  const { holdings, cashBalance } = usePortfolio()
  const { stocks } = useStocks()
  const [valueHistory, setValueHistory] = useState<PricePoint[]>([])

  const getCurrentValue = () => {
    const holdingsValue = holdings.reduce((total, holding) => {
      const stock = stocks.find(s => s.ticker === holding.ticker)
      return total + holding.shares * (stock?.price ?? holding.purchasePrice)
    }, 0)
    return holdingsValue + cashBalance
  }

  useEffect(() => {
    const time = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds()
    const value = holdings.reduce((total, holding) => {
      const stock = stocks.find(s => s.ticker === holding.ticker)
      return total + holding.shares * (stock?.price ?? holding.purchasePrice)
    }, 0) + cashBalance

    setTimeout(() => {
      setValueHistory(prev => [...prev, { time, price: value }])
    }, 0)
  }, [stocks, holdings, cashBalance])

  return { valueHistory, currentValue: getCurrentValue() }
}