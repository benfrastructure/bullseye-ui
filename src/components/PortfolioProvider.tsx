import { useState } from 'react'
import { PortfolioContext } from '../context/PortfolioContext'
import type { Holding } from '../types/Holding'

const STARTING_BALANCE = 100000

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [cashBalance, setCashBalance] = useState(STARTING_BALANCE)

  function buyShares(ticker: string, shares: number, price: number) {
    const cost = shares * price
    if (cost > cashBalance) return
    setCashBalance(prev => prev - cost)
    setHoldings(prev => [...prev, { ticker, shares, purchasePrice: price }])
  }

  function sellShares(ticker: string, shares: number, price: number) {
    let sharesToSell = shares
    const updatedHoldings = []

    for (const holding of holdings) {
      if (holding.ticker !== ticker || sharesToSell <= 0) {
        updatedHoldings.push(holding)
        continue
      }
      if (holding.shares <= sharesToSell) {
        sharesToSell -= holding.shares
      } else {
        updatedHoldings.push({ ...holding, shares: holding.shares - sharesToSell })
        sharesToSell = 0
      }
    }

    setCashBalance(prev => prev + shares * price)
    setHoldings(updatedHoldings)
  }

  return (
    <PortfolioContext.Provider value={{ holdings, cashBalance, buyShares, sellShares }}>
      {children}
    </PortfolioContext.Provider>
  )
}