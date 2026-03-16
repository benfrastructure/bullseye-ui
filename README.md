# Bullseye UI

A mock stock trading simulation built with React and TypeScript. Users can browse fake stocks, view 24-hour price charts, buy and sell shares, and track their portfolio value over time.

This project was built as a proof of concept to demonstrate proficiency with modern React development patterns.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- Recharts
- Tailwind CSS

## Features

- Live stock price updates every 5 seconds
- 24-hour price history chart per stock
- Buy shares via dollar amount (fractional shares supported)
- Portfolio page with holdings, cash balance, and gain/loss tracking
- Dashboard with real-time portfolio value graph
- Stock ticker on dashboard
- Search stocks by name or ticker

## Architecture

The frontend follows a clean separation of concerns:

- `src/api/` — all HTTP calls to the backend API
- `src/context/` — React context objects for global state
- `src/components/` — reusable UI components
- `src/pages/` — page-level components mapped to routes
- `src/hooks/` — custom React hooks for shared logic
- `src/types/` — TypeScript interfaces

Global state is managed via two React contexts:
- `StockContext` — live stock prices, updated every 5 seconds via polling
- `PortfolioContext` — user holdings and cash balance, synced with the backend

## Getting Started

1. Make sure the [Bullseye API](https://github.com/benfrastructure/bullseye-api) is running
2. Clone this repo
3. Install dependencies:
```bash
   npm install
```
4. Start the dev server:
```bash
   npm run dev
```
5. Open `http://localhost:5173`

## Known Limitations

This is a proof of concept. In a production version:

- Authentication and user accounts would be required
- Stock data would come from a real market data provider
- Portfolio and price history would persist in a database
- The app would be deployed behind HTTPS with proper environment configuration
