import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between p-4 px-10 bg-teal-500 shadow-md">
        <button>x</button>
        <button className='flex p-4 px-12 font-normal text-white bg-green-600'>Logout</button>
    </nav>
  )
}

export default Navbar
