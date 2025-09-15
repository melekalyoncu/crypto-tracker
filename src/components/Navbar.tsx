import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../app/store'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
    const favs = useAppSelector(s => s.favorites.ids)
    const [q, setQ] = useState('')
    const nav = useNavigate()
    const [params] = useSearchParams()

    useEffect(() => {
        setQ(params.get('q') || '')
    }, [params])

    const submit = (e: React.FormEvent) => {
        e.preventDefault()
        nav(q ? `/?q=${encodeURIComponent(q)}` : '/')
    }

    return (
        <header className="sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link to="/" className="text-lg font-semibold">Crypto Tracker</Link>
                <form onSubmit={submit} className="flex items-center gap-2">
                    <input value={q} onChange={e => setQ(e.target.value)} placeholder="Ara: bitcoin, eth…" className="rounded-2xl bg-white/70 dark:bg-white/5 border 
           border-black/10 dark:border-white/10 
           px-4 py-2 text-sm outline-none 
           focus:ring-2 focus:ring-indigo-400/30"
                    />
                    <button className="rounded-xl border border-white/10 px-3 py-2 text-sm">Ara</button>
                </form>
                <Link to="/?filter=favs" className="text-sm opacity-80 hover:opacity-100">Favoriler ({favs.length})</Link>
                <ThemeToggle />
            </div>
        </header>
    )
}