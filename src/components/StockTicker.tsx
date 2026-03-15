import './StockTicker.css'
import { useStocks } from '../hooks/useStocks'

function StockTicker() {
    const { stocks } = useStocks()

    return (
        <div className="ticker-wrapper">
            <div className="ticker-track">
                {[...stocks, ...stocks, ...stocks].map((stock, index) => (
                    <span key={index} className="ticker-item">
                        {stock.ticker} ${stock.price.toFixed(2)}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default StockTicker