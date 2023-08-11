import { createApi } from '@reduxjs/toolkit/query/react'
import { API } from '@/app.config'

import axiosBaseQuery from './axiosBaseQuery'

export const colorApi = createApi({
  reducerPath: 'colorApi',
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getAllColors: builder.query<any, any>({
      query: () => {
        return ({
            url: `${ API.COLOR }`,
            method: 'GET',
            headers: {
              Authorization: `JWT ${ localStorage.getItem('accessToken') }`
            }
        })
      },
    }),
  }),
})


export const { useGetAllColorsQuery } = colorApi