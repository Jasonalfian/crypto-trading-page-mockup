## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) or visit https://crypto-trading-page-mockup.vercel.app/ with your browser to see the result.

Demo of website:
https://github.com/Jasonalfian/crypto-trading-page-mockup/assets/41385867/23a61a83-73de-4034-8d31-cd9fdf92d85c

Endpoint used public url provided by Binance in:
- https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md
- https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md

Websockets usage: 
- Orderbook data
- Kline for real time chart data
- General Info of assets in header area

REST API usage:
- Fetch historical data of coin, prepend it with real time chart data
- List of exchange info for list of coins available in binance (for simplicity, only exchange with USDT shown)

Notable Library:
- https://mui.com/ for component library
- https://www.npmjs.com/package/axios for API rest fetching
- https://www.npmjs.com/package/lightweight-charts for chart component
- https://www.npmjs.com/package/numeral for currency formatting
- https://www.npmjs.com/package/lodash for rounding number
- https://www.npmjs.com/package/recoil for state management

## Disclaimer

Sometimes binance API is blocked in Indonesia for some internet providers, try enabling proxy if error connection occured.
