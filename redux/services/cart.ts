import { createApi } from '@reduxjs/toolkit/query/react'
import { API } from '@/app.config'

import axiosBaseQuery from './axiosBaseQuery'

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getCartItems: builder.query<any, any>({
      query: () => {
        return ({
            url: `${ API.CART }`,
            method: 'GET',
            headers: {
              Authorization: `JWT ${ localStorage.getItem('accessToken') }`
            }
        })
      },
    }),
  }),
})


export const { useGetCartItemsQuery } = cartApi