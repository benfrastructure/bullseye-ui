import { useStockPrices } from '../hooks/useStockPrices'
import { StockContext } from '../context/StockContext'

export function StockProvider({ children }: { children: React.ReactNode }) {
  const { stocks } = useStockPrices()

  return (
    <StockContext.Provider value={{ stocks }}>
      {children}
    </StockContext.Provider>
  )
}