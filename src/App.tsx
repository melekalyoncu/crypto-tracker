import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CoinDetail from './pages/CoinDetail'
import Navbar from './components/Navbar'
import ThemeProvider from './components/ThemeProvider'

export default function App() {
    const loc = useLocation()
    return (
        <div className="min-h-screen">
            <ThemeProvider />
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 py-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/coin/:id" element={<CoinDetail />} />
                    <Route path="*" element={<div>404: {loc.pathname}</div>} />
                </Routes>
            </main>
        </div>
    )
}