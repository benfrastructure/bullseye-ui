import { useState, useEffect } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'
import type { Holding } from '../types/Holding'
import { fetchPortfolio, buyShares as apiBuyShares, sellShares as apiSellShares } from '../api/api'

const STARTING_BALANCE = 100000

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [cashBalance, setCashBalance] = useState(STARTING_BALANCE)

  useEffect(() => {
    fetchPortfolio().then(data => {
      setHoldings(data.holdings)
      setCashBalance(data.cashBalance)
    })
  }, [])

  async function buyShares(ticker: string, shares: number, price: number) {
    await apiBuyShares(ticker, shares, price)
    const data = await fetchPortfolio()
    setHoldings(data.holdings)
    setCashBalance(data.cashBalance)
  }

  async function sellShares(ticker: string, shares: number, price: number) {
    await apiSellShares(ticker, shares, price)
    const data = await fetchPortfolio()
    setHoldings(data.holdings)
    setCashBalance(data.cashBalance)
  }

  return (
    <PortfolioContext.Provider value={{ holdings, cashBalance, buyShares, sellShares }}>
      {children}
    </PortfolioContext.Provider>
  )
}