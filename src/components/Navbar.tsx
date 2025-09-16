import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../app/store'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { Search, X } from 'lucide-react'

export default function Navbar() {
    const favs = useAppSelector(s => s.favorites.ids)
    const [q, setQ] = useState('')
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
    const nav = useNavigate()
    const [params] = useSearchParams()

    useEffect(() => {
        setQ(params.get('q') || '')
    }, [params])

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        nav(q ? `/?q=${encodeURIComponent(q)}` : '/')
        setMobileSearchOpen(false) 
    }

    return (
        <header
            className="sticky top-0 z-20 
      border-b border-neutral-300/40 dark:border-neutral-800/40 
      bg-neutral-50/70 dark:bg-black/30 
      backdrop-blur-md"
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-3 sm:px-4 py-2 sm:py-3 gap-2">
                {/* Left: Brand */}
                <Link to="/" className="text-base sm:text-lg font-semibold whitespace-nowrap">
                    Crypto Tracker
                </Link>

                {/* Center: Search (desktop/tablet) */}
                <form
                    onSubmit={submit}
                    className="hidden sm:flex items-center gap-2 min-w-0"
                >
                    <input
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        placeholder="Ara: bitcoin, eth…"
                        className="rounded-2xl bg-white/70 dark:bg-white/5 border 
              border-black/10 dark:border-white/10 
              px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm outline-none 
              focus:ring-2 focus:ring-indigo-400/30 w-40 md:w-64 lg:w-80"
                    />
                    <button
                        className="rounded-xl border border-black/10 dark:border-white/10 
              px-3 py-1.5 text-xs sm:text-sm hover:bg-black/5 dark:hover:bg-white/5 transition"
                    >
                        Ara
                    </button>
                </form>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Mobile search button */}
                    <button
                        className="sm:hidden rounded-xl border border-black/10 dark:border-white/10 p-2 hover:bg-black/5 dark:hover:bg-white/5 transition"
                        aria-label="Ara"
                        onClick={() => setMobileSearchOpen(true)}
                    >
                        <Search className="h-4 w-4" />
                    </button>

                    <Link
                        to="/?filter=favs"
                        className="text-xs sm:text-sm opacity-80 hover:opacity-100 whitespace-nowrap"
                    >
                        Favoriler ({favs.length})
                    </Link>

                    <ThemeToggle />
                </div>
            </div>

            {/* Mobile search drawer */}
            {mobileSearchOpen && (
                <div className="sm:hidden border-t border-neutral-300/40 dark:border-neutral-800/40 px-3 py-2">
                    <form onSubmit={submit} className="flex items-center gap-2">
                        <input
                            value={q}
                            onChange={e => setQ(e.target.value)}
                            autoFocus
                            placeholder="Ara: bitcoin, eth…"
                            className="flex-1 rounded-2xl bg-white/80 dark:bg-white/5 border 
                border-black/10 dark:border-white/10 
                px-3 py-2 text-sm outline-none 
                focus:ring-2 focus:ring-indigo-400/30"
                        />
                        <button
                            className="rounded-xl border border-black/10 dark:border-white/10 
                px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 transition"
                        >
                            Ara
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileSearchOpen(false)}
                            className="rounded-xl border border-black/10 dark:border-white/10 p-2 hover:bg-black/5 dark:hover:bg-white/5 transition"
                            aria-label="Kapat"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            )}
        </header>
    )
}
