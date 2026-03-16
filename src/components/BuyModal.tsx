import { useState } from 'react'
import { usePortfolio } from '../hooks/usePortfolio'
import type { Stock } from '../types/Stock'
import './BuyModal.css'

interface BuyModalProps {
  stock: Stock
  onClose: () => void
}

function BuyModal({ stock, onClose }: BuyModalProps) {
  const { cashBalance, buyShares } = usePortfolio()
  const [amount, setAmount] = useState('')

  const dollarAmount = parseFloat(amount)
  const fractionalShares = dollarAmount / stock.price
  const hasEnoughCash = dollarAmount <= cashBalance
  const isValid = dollarAmount > 0 && hasEnoughCash

  function handleBuy() {
    if (!isValid) return
    buyShares(stock.ticker, fractionalShares, stock.price)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">Buy {stock.ticker}</h2>
        <p className="modal-company">{stock.companyName}</p>
        <p className="modal-price">Current Price: ${stock.price.toFixed(2)}</p>
        <p className="modal-cash">Available Cash: ${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

        <div className="modal-input-group">
          <label className="modal-label">Dollar Amount</label>
          <input
            className="modal-input"
            type="number"
            min="0"
            step="any"
            placeholder="$0.00"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>

        {dollarAmount > 0 && (
          <>
            <p className="modal-shares">
              ≈ {fractionalShares.toFixed(6)} shares
            </p>
            <p className={`modal-total ${!hasEnoughCash ? 'modal-error' : ''}`}>
              {!hasEnoughCash && 'Insufficient funds'}
            </p>
          </>
        )}

        <div className="modal-buttons">
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
          <button className="modal-confirm" onClick={handleBuy} disabled={!isValid}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default BuyModal