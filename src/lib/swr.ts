import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import { fetcher } from './axios' 

export const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: true,
  dedupingInterval: 5000,
}

export const useApi = <T = unknown>(key: string | null, config?: SWRConfiguration) =>
  useSWR<T>(key, fetcher, { ...swrConfig, ...config })
