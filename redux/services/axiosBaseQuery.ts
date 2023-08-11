import { API } from '@/app.config'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios from 'axios'
import type { AxiosError } from 'axios'

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    any,
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, ...rest }) => {

    try {
      const result = await axios({ url: baseUrl + url, method, data, params, headers, ...rest })
      return { data: result?.data }
    } catch (axiosError: any) {
      const status = axiosError?.response?.status ?? null
      if(status === 401){
        try {
          const refreshTokenResult = await axios.post(`${ API.REFRESH_TOKEN }`, {
            refresh: localStorage.getItem('refreshToken'),
          })
          const accessToken = refreshTokenResult?.data?.access ?? ''
          const refreshToken = refreshTokenResult?.data?.refresh ?? ''
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
        } catch (refreshError: any) {
          window.location.href = 'login'
        }
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

export default axiosBaseQuery
