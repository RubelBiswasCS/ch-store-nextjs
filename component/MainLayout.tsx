import React from 'react'
import Navbar from './Navbar'

const MainLayout = ({ children }: any) => {
  return (
    <div className='flex flex-col w-full'>
        <Navbar />
        { children }
    </div>
  )
}

export default MainLayout