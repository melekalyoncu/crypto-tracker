import { useApi } from '../lib/swr'
import type { CoinMarket } from '../types/coin'

export default function useCoins(page = 1, perPage = 30, vs = 'usd') {
  const key =
    `/coins/markets?vs_currency=${vs}` +
    `&order=market_cap_desc&per_page=${perPage}&page=${page}&price_change_percentage=24h`

  return useApi<CoinMarket[]>(key, { refreshInterval: 15000 })
}
