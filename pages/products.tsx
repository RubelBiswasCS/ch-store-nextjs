import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useGetProductsQuery, useLazyGetProductsQuery } from "@/redux/services/products"

export const Products = () => {
    const [ color, setColor ]: any = useState('')
    const [ productQuery, setProductQuery ]: any = useState(null)

    // const { data, error, isLoading }: any = useGetProductsQuery(productQuery)

    const [getAllProducts, { data, isLoading }, lastPromiseInfo] = useLazyGetProductsQuery()

    const _onSelect = (e: any) => {
        const value = e?.target?.value ?? ''
        setColor(value)
    }

    // On Get Products
    const _onGetProducts = () => {
        // setProductQuery({ color })
        getAllProducts({ color }, true)
    }

    useEffect(() => {
        getAllProducts(null, true)
    }, [])

  return (
    <div className='flex flex-col min-h-screen'>
         <div className="flex flex-col">
            <div className='flex gap-4'>
                <select onChange={ _onSelect }>
                    <option>red</option>
                    <option>blue</option>
                    <option>black</option>
                </select>
                <button onClick={ _onGetProducts }>Get Products</button>
            </div>
        <span>Products</span>
        { isLoading ? 'Loading' : '' }
        { data?.map((d: any, idx: any) => <span key={idx}>{ d?.name ?? '' }</span>) }
        </div>
        <Link href={'/'}><button>home</button></Link>
    </div>
  )
}

export default Products
