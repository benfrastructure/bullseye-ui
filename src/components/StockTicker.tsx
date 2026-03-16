import './StockTicker.css'
import { useStocks } from '../hooks/useStocks'
import { NavLink } from 'react-router-dom'

function StockTicker() {
    const { stocks } = useStocks()

    return (
        <div className="ticker-wrapper">
            <div className="ticker-track">
                {[...stocks, ...stocks, ...stocks].map((stock, index) => (
                    <NavLink to={`/stock/${stock.ticker}`} key={index} className="ticker-item">
                        <span className="ticker-symbol">{stock.ticker}</span>
                        <span className="ticker-price">${stock.price.toFixed(2)}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default StockTicker