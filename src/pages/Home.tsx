import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useCoins from '../hooks/useCoins'
import Loader from '../components/Loader'
import CoinCard from '../components/CoinCard'
import { useAppSelector } from '../app/store'

export default function Home() {
    const [page, setPage] = useState(1)
    const [params] = useSearchParams()
    const q = (params.get('q') || '').toLowerCase()
    const filter = params.get('filter')
    const { data, isLoading } = useCoins(page, 30, 'usd')
    const favs = useAppSelector(s => s.favorites.ids)

    const list = useMemo(() => {
        let arr = data || []
        if (q) arr = arr.filter(x => x.name.toLowerCase().includes(q) || x.symbol.toLowerCase().includes(q))
        if (filter === 'favs') arr = arr.filter(x => favs.includes(x.id))
        return arr
    }, [data, q, filter, favs])


    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold">Piyasa (Top 30)</h1>
            {isLoading && <Loader />}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {list?.map(c => <CoinCard key={c.id} c={c} />)}
            </div>
            <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-2 border-t border-white/10 bg-black/80 py-3 backdrop-blur">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className="rounded-xl border border-white/10 px-3 py-2 text-sm disabled:opacity-50"
                    disabled={page === 1}
                >
                    Önceki
                </button>
                <span className="text-sm opacity-70">Sayfa {page}</span>
                <button
                    onClick={() => setPage(p => p + 1)}
                    className="rounded-xl border border-white/10 px-3 py-2 text-sm"
                >
                    Sonraki
                </button>
            </div>
        </div>
    )
}