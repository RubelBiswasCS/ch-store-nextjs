import React from 'react'
import Link from 'next/link'

export const Products = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        products
        <Link href={'/'}><button>home</button></Link>
    </div>
  )
}

export default Products
