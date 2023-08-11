import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API } from '@/app.config'

import axiosBaseQuery from './axiosBaseQuery'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<any, any>({
      query: (params: any) => {
        console.log({ params })
        return ({
            url: `${ API.PRODUCTS }`,
            method: 'GET',
            headers: {
              Authorization: `JWT ${ localStorage.getItem('accessToken') }`
            },
            params: params
        })
      },
      providesTags: ['Products'],
    }),
  }),
})


export const { useGetProductsQuery, useLazyGetProductsQuery } = productApi