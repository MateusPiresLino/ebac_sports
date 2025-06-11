import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Produto } from '../App'

const delayedFetchBaseQuery = async (
  ...args: Parameters<ReturnType<typeof fetchBaseQuery>>
) => {
  await new Promise((res) => setTimeout(res, 1000))

  const baseQuery = fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/'
  })

  return baseQuery(...args)
}

export const produtoApi = createApi({
  reducerPath: 'api',
  baseQuery: delayedFetchBaseQuery,
  endpoints: (builder) => ({
    buscarProdutos: builder.query<Produto[], void>({
      query: () => 'ebac_sports'
    })
  })
})

export const { useBuscarProdutosQuery } = produtoApi
