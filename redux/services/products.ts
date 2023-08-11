import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API } from '@/app.config'

import axiosBaseQuery from './axiosBaseQuery'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getProducts: builder.query<any, any>({
      query: () => {
        return ({
            url: `${ API.PRODUCTS }`,
            method: 'GET',
            headers: {
              Authorization: `JWT ${ localStorage.getItem('accessToken') }`
            }
        })
      },
    }),
  }),
})


export const { useGetProductsQuery } = productApi