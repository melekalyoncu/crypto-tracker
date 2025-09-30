import { Link } from 'react-router-dom'
import PriceChangeTag from './PriceChangeTag'
import { useAppDispatch, useAppSelector } from '../app/store'
import { toggleFavorite } from '../slices/favorites.slice'
import type { CoinMarket } from '../types/coin'

export default function CoinCard({ c }: { c: CoinMarket }) {
  const favs = useAppSelector(s => s.favorites.ids)
  const dispatch = useAppDispatch()
  const isFav = favs.includes(c.id)
  return (
    <div className="rounded-2xl border border-neutral-300 hover:border-neutral-600 dark:border-neutral-600 dark:hover:border-neutral-400 p-4 transition">
      <div className="flex items-center gap-3">
        <img src={c.image} alt={c.name} className="h-8 w-8 rounded-full" />
        <div className="flex-1">
          <Link to={`/coin/${c.id}`} className="font-semibold hover:underline">{c.name}</Link>
          <div className="text-xs opacity-60 uppercase">{c.symbol}</div>
        </div>
        <button
          onClick={() => dispatch(toggleFavorite(c.id))}
          className={`rounded-full px-3 py-1 text-xs border ${isFav ? 'border-yellow-400 text-yellow-300' : 'border-white/10 text-white/70'}`}
        >{isFav ? 'Favori ✓' : 'Favorilere ekle'}</button>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-bold">
          {typeof c.current_price === 'number'
            ? `$${c.current_price.toLocaleString()}`
            : '—'}
        </div>
        <PriceChangeTag value={c.price_change_percentage_24h} />
      </div>
    </div>
  )
}