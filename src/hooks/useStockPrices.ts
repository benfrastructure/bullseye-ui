import { useState, useEffect } from 'react'
import type { Stock } from '../types/Stock'
import { fetchStocks } from '../api/api'

export function useStockPrices() {
  const [stocks, setStocks] = useState<Stock[]>([])

  useEffect(() => {
    // Initial load from API
    fetchStocks().then(data => setStocks(data))

    // Poll for updated prices every 5 seconds
    const interval = setInterval(() => {
      fetchStocks().then(data => setStocks(data))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return { stocks }
}