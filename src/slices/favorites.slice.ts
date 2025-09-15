import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface FavoritesState { ids: string[] }

function loadFavs(): string[] {
  try {
    const raw = localStorage.getItem('fav_coins')
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const initial: FavoritesState = { ids: loadFavs() }

const slice = createSlice({
name: 'favorites',
initialState: initial,
reducers: {
toggleFavorite(state, action: PayloadAction<string>) {
const id = action.payload
if (state.ids.includes(id)) {
state.ids = state.ids.filter(x => x !== id)
} else {
state.ids.push(id)
}
localStorage.setItem('fav_coins', JSON.stringify(state.ids))
},
},
})

export const { toggleFavorite } = slice.actions
export default slice.reducer