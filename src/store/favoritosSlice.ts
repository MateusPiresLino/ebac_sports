import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Produto } from '../App'

const initialState = {
  itens: [] as Produto[]
}

const favoritoSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    alternarFavorito: (state, action: PayloadAction<Produto>) => {
      const itemExiste = state.itens.find(
        (item) => item.id === action.payload.id
      )
      if (itemExiste) {
        state.itens = state.itens.filter(
          (item) => item.id !== action.payload.id
        )
      } else {
        state.itens.push(action.payload)
      }
    }
  }
})

export const { alternarFavorito } = favoritoSlice.actions
export default favoritoSlice.reducer
