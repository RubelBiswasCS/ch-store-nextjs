import React, { useState } from 'react'
import axios from 'axios'

import { API } from '@/app.config'

const Login = () => {
    const [ user, setUser ]: any = useState(null)

    // On Input Change
    const _onInputChange = (e: any) => {
        setUser((user: any) => ({
            ...user,
            [  e.target.name ]: e.target.value
        }))
    }

    // On Submit
    const _onSubmit = () => {
        axios.post(API.LOGIN, user)
            .then((res: any) => {
                const { access, refresh } = res?.data ?? null
                localStorage.setItem('accessToken', access)
                localStorage.setItem('refreshToken', refresh)
                const userData =  JSON.parse(atob(refresh?.split('.')[1]))
                localStorage.setItem('user', JSON.stringify(userData))
                window.location.href = '/'
            })
            .catch((err: any) => {
                console.error(err)
                localStorage.clear()
            })
    }

    return (
        <div className='flex items-center justify-center w-screen h-screen'>
            <div className='flex flex-col w-1/3 gap-4 p-8 shadow-lg'>
                <div className='flex flex-col w-full'>
                    <label htmlFor="email">{ 'Email' }</label>
                    <input value={ user?.email ?? '' } onChange={ _onInputChange } className='h-8 shadow-md outline-1' name='email' type='email' />
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="password">{ 'Password' }</label>
                    <input value={ user?.password ?? '' } onChange={ _onInputChange } className='h-8 border-2 shadow-md outline-1' name='password' type='password' />
                </div>
                <div className='flex flex-col w-full'>
                    <button onClick={ _onSubmit } className='w-full h-8 bg-red-200 border-solid border-1'>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login
