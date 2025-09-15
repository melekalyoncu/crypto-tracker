import { useEffect } from 'react'
import { useAppSelector } from '../app/store'

export default function ThemeProvider() {
    const mode = useAppSelector(s => s.theme.mode)

    useEffect(() => {
        const root = document.documentElement
        root.classList.toggle('dark', mode === 'dark')
        try { localStorage.setItem('theme', mode) } catch {
            console.log('Failed to store theme preference')
        }
    }, [mode])

    return null
}
