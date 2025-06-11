import { configureStore } from '@reduxjs/toolkit'
import carrinhoSlice from './carrinhoSlice'
import favoritosSlice from './favoritosSlice'
import { produtoApi } from '../services/produtoApi'

export const store = configureStore({
  reducer: {
    carrinho: carrinhoSlice,
    favoritos: favoritosSlice,
    [produtoApi.reducerPath]: produtoApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(produtoApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
