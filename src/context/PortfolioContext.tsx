import { createContext } from 'react'
import type { PortfolioContextType } from '../types/PortfolioContextType'

export const PortfolioContext = createContext<PortfolioContextType | null>(null)