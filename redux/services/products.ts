import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API } from '@/app.config'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    any,
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, ...rest }) => {
    console.log({ headers })

    try {
      const result = await axios({ url: baseUrl + url, method, data, params, headers, ...rest })
      return { data: result?.data }
    } catch (axiosError: any) {
      const status = axiosError?.response?.status ?? null
      console.log({ status })
      if(status === 401){

        axios.post(`${ API.REFRESH_TOKEN }`, {
          refresh: localStorage.getItem('refreshToken'),
        })
          .then(async (response) => {
            const accessToken = response?.data?.access ?? ''
            const refreshToken = response?.data?.refresh ?? ''
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            const result = await axios({ 
              url: baseUrl + url, 
              method, 
              data, 
              params,
              ...rest,
              headers: { ...headers, Authorization: `JWT ${accessToken}`  } 
            })
            return { data: result?.data }
          })
          .catch((err) => {
            console.log({ err })
            window.location.href = 'login'
          })
      }
      let err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

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