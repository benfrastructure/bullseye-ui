import './StockCard.css'
import type { Stock } from '../types/Stock'
import { useNavigate } from 'react-router-dom'

interface StockCardProps {
    stock: Stock
}

function StockCard({ stock }: StockCardProps) {
  const navigate = useNavigate()

  return (
    <tr onClick={() => navigate(`/stock/${stock.ticker}`)}>
        <td>{stock.ticker}</td>
        <td>{stock.companyName}</td>
        <td>${stock.price.toFixed(2)}</td>
    </tr>
  )
}

export default StockCard