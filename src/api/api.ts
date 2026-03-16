import axios from 'axios'
import type { Stock } from '../types/Stock'
import type { Holding } from '../types/Holding'
import type { PricePoint } from '../types/PricePoint'

const api = axios.create({
  baseURL: 'https://localhost:7277/api'
})

export async function fetchStocks(): Promise<Stock[]> {
  const response = await api.get<Stock[]>('/stocks')
  return response.data
}

export async function fetchStock(ticker: string): Promise<Stock> {
  const response = await api.get<Stock>(`/stocks/${ticker}`)
  return response.data
}

export async function fetchPriceHistory(ticker: string): Promise<PricePoint[]> {
  const response = await api.get<PricePoint[]>(`/stocks/${ticker}/history`)
  return response.data
}

export async function fetchPortfolio(): Promise<{ holdings: Holding[], cashBalance: number }> {
  const response = await api.get('/portfolio')
  return response.data
}

export async function buyShares(ticker: string, shares: number, price: number): Promise<void> {
  await api.post('/portfolio/buy', { ticker, shares, price })
}

export async function sellShares(ticker: string, shares: number, price: number): Promise<void> {
  await api.post('/portfolio/sell', { ticker, shares, price })
}

export async function fetchPortfolioHistory(): Promise<{ time: number, value: number }[]> {
  const response = await api.get('/portfolio/history')
  return response.data
}