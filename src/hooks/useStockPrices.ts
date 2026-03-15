import { useState, useEffect } from 'react'
import type { Stock } from '../types/Stock'
import { stocks as initialStocks } from '../data/stocks'

function randomMovement(price: number): number {
    const change = (Math.random() - 0.5) * 2
    return Math.max(0.01, parseFloat((price + change).toFixed(2)))
}

export function useStockPrices() {
    const [stocks, setStocks] = useState<Stock[]>(initialStocks)

    useEffect(() => {
        const interval = setInterval(() => {
            setStocks(prev => prev.map(stock => ({
                ...stock,
                price: randomMovement(stock.price)
            })))
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return { stocks }
}