import { Moon, Sun } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../app/store'
import { toggleTheme } from '../slices/theme.slice'

export default function ThemeToggle() {
  const mode = useAppSelector(s => s.theme.mode)
  const dispatch = useAppDispatch()

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 transition"
    >
      {mode === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="hidden sm:inline">{mode === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )
}
