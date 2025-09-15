import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '../slices/favorites.slice'
import themeReducer from '../slices/theme.slice'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer,
        theme: themeReducer,

    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector