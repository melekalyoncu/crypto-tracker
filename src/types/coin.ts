export interface CoinMarket {
id: string
symbol: string
name: string
image: string
current_price: number
price_change_percentage_24h: number
market_cap: number
}

export interface CoinDetail {
id: string
symbol: string
name: string
description: { en: string }
image: { large: string, small: string }
market_data: {
current_price: { [k: string]: number }
price_change_percentage_24h: number
market_cap: { [k: string]: number }
}
}