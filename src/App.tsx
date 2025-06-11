import Header from './components/Header'
import Produtos from './containers/Produtos'
import { useDispatch, useSelector } from 'react-redux'
import { adicionarProduto } from './store/carrinhoSlice'
import { alternarFavorito } from './store/favoritosSlice'
import { useBuscarProdutosQuery } from './services/produtoApi'
import { useEffect } from 'react'
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
  const mensagem = useSelector((state: RootState) => state.carrinho.mensagem)
  const { data: produtos, isLoading, error } = useBuscarProdutosQuery()

  useEffect(() => {
    if (mensagem !== '') {
      alert(mensagem)
    }
  }, [mensagem])

  function adicionarAoCarrinho(produto: Produto) {
    dispatch(adicionarProduto(produto))
  }

  function favoritar(produto: Produto) {
    dispatch(alternarFavorito(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header />
        {isLoading && <h2>Carregando produtos...</h2>}
        {error && <h2>Erro ao carregar os produtos.</h2>}

        {produtos && (
          <Produtos
            produtos={produtos}
            favoritar={favoritar}
            adicionarAoCarrinho={adicionarAoCarrinho}
          />
        )}
      </div>
    </>
  )
}

export default App
