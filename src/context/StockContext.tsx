import { createContext } from 'react'
import type { StockContextType } from '../types/StockContextType'

export const StockContext = createContext<StockContextType | null>(null)