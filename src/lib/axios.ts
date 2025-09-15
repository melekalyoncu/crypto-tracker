import axios from 'axios'

export const api = axios.create({
baseURL: 'https://api.coingecko.com/api/v3',
timeout: 15000,
})

export const fetcher = (url: string) => api.get(url).then(r => r.data)