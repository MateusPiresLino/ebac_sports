import { useEffect, useState } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { useDispatch, useSelector } from 'react-redux'
import { adicionarProduto } from './store/carrinhoSlice'

import { GlobalStyle } from './styles'
import { RootState } from './store/store'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const dispatch = useDispatch()

  const [produtos, setProdutos] = useState<Produto[]>([])
  const itensNoCarrinho = useSelector(
    (state: RootState) => state.carrinho.itens
  )
  const mensagem = useSelector((state: RootState) => state.carrinho.mensagem)

  const [favoritos, setFavoritos] = useState<Produto[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/ebac_sports')
      .then((res) => res.json())
      .then((res) => setProdutos(res))
  }, [])

  useEffect(() => {
    if (mensagem !== '') {
      alert(mensagem)
    }
  }, [mensagem])

  function adicionarAoCarrinho(produto: Produto) {
    dispatch(adicionarProduto(produto))
  }

  function favoritar(produto: Produto) {
    if (favoritos.find((p) => p.id === produto.id)) {
      const favoritosSemProduto = favoritos.filter((p) => p.id !== produto.id)
      setFavoritos(favoritosSemProduto)
    } else {
      setFavoritos([...favoritos, produto])
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
