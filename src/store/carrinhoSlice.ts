import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Produto } from '../App'

type CarrinhoState = {
  itens: Produto[]
  mensagem: string
}

const initialState: CarrinhoState = {
  itens: [],
  mensagem: ''
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionarProduto: (state, action: PayloadAction<Produto>) => {
      const produtoExiste = state.itens.find(
        (item) => item.id === action.payload.id
      )

      if (produtoExiste) {
        state.mensagem = 'Item já esta no carrinho'
      } else {
        state.itens.push(action.payload)
        state.mensagem = ''
      }
    }
  }
})

export const { adicionarProduto } = carrinhoSlice.actions
export default carrinhoSlice.reducer
