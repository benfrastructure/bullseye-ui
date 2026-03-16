import type { Stock } from './Stock'
import type { PricePoint } from './PricePoint'

export interface StockContextType {
  stocks: Stock[]
  priceHistory: Record<string, PricePoint[]>
}