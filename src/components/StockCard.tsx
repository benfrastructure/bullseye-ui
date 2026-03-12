import type { Stock } from '../types/Stock'

interface StockCardProps {
    stock: Stock
}

function StockCard({ stock }: StockCardProps) {
  return (
    <div>
        <h2>{stock.ticker}</h2>
        <p>{stock.companyName}</p>
        <p>${stock.price.toFixed(2)}</p>
        <p>{stock.sector}</p>
    </div>
  )
}

export default StockCard