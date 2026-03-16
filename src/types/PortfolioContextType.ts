import type { Holding } from './Holding'

export interface PortfolioContextType {
  holdings: Holding[]
  cashBalance: number
  buyShares: (ticker: string, shares: number, price: number) => void
  sellShares: (ticker: string, shares: number, price: number) => void
}