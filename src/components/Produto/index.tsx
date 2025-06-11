import { Produto as ProdutoType } from '../../App'
import * as S from './styles'
import { useDispatch } from 'react-redux'
import { adicionarProduto } from '../../store/carrinhoSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

type Props = {
  produto: ProdutoType
  favoritar: (produto: ProdutoType) => void
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto, favoritar }: Props) => {
  const dispatch = useDispatch()
  const favoritos = useSelector((state: RootState) => state.favoritos.itens)
  const estaNosFavoritos = favoritos.some(
    (item: ProdutoType) => item.id === produto.id
  )
  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={() => favoritar(produto)} type="button">
        {estaNosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar
        onClick={() => dispatch(adicionarProduto(produto))}
        type="button"
      >
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
