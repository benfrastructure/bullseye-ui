import { useState, useEffect } from 'react'
import type { Stock } from '../types/Stock'
import type { PricePoint } from '../types/PricePoint'
import { stocks as initialStocks } from '../data/stocks'

function randomMovement(price: number): number {
    const change = (Math.random() - 0.5) * 0.5
    return Math.max(0.01, parseFloat((price + change).toFixed(2)))
}

function getCurrentTime(): number {
  const now = new Date()
  return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
}

export function useStockPrices() {
    const [stocks, setStocks] = useState<Stock[]>(initialStocks)
    const [priceHistory, setPriceHistory] = useState<Record<string, PricePoint[]>>(() =>
        Object.fromEntries(initialStocks.map(stock => [stock.ticker, [{ time: getCurrentTime(), price: stock.price }]]))
    )

    useEffect(() => {
        const interval = setInterval(() => {
        const time = getCurrentTime()

        setStocks(prev => {
            const updated = prev.map(stock => ({
            ...stock,
            price: randomMovement(stock.price)
            }))

            setPriceHistory(prevHistory => {
            const newHistory: Record<string, PricePoint[]> = {}
            for (const stock of updated) {
                newHistory[stock.ticker] = [...(prevHistory[stock.ticker] || []), { time, price: stock.price }]
            }
            return newHistory
            })

            return updated
        })
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return { stocks, priceHistory }
}