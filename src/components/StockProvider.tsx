import { useStockPrices } from '../hooks/useStockPrices'
import { StockContext } from '../context/StockContext'

export function StockProvider({ children }: { children: React.ReactNode }) {
  const { stocks, priceHistory } = useStockPrices()

  return (
    <StockContext.Provider value={{ stocks, priceHistory }}>
      {children}
    </StockContext.Provider>
  )
}