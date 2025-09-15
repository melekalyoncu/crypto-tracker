import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ThemeMode = 'light' | 'dark'
interface ThemeState { mode: ThemeMode }

function readStoredTheme(): ThemeMode {
    try {
        const t = localStorage.getItem('theme')
        if (t === 'dark' || t === 'light') return t
    } catch {
        console.log('No stored theme found, using system preference')
    }

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark' : 'light'
}

const initialState: ThemeState = { mode: readStoredTheme() }

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<ThemeMode>) { state.mode = action.payload },
        toggleTheme(state) { state.mode = state.mode === 'dark' ? 'light' : 'dark' },
    },
})

export const { setTheme, toggleTheme } = themeSlice.actions
export default themeSlice.reducer
