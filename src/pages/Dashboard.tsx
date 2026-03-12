import { stocks } from '../data/stocks'
import StockCard from '../components/StockCard'

function Dashboard() {
  return (
    <div>
        {
            stocks.map(stock => (
                <StockCard key={stock.ticker} stock={stock}></StockCard>    
            ))
        }
    </div>
  )
}

export default Dashboard