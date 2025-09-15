import { useApi } from '../lib/swr'
import type { CoinDetail } from '../types/coin'

export default function useCoin(id?: string) {
  const key = id
    ? `/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    : null

  return useApi<CoinDetail>(key, { refreshInterval: 20000 })
}
