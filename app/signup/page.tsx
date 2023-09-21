import SignupForm from '@/components/SignupForm'
import React from 'react'
import axios from 'axios'

const Signup = () => {
    const signUpAction = async (email: string, username: string, password: string, passwordConfirm: string, name: string) => {
        "use server"
        const res = await axios.post('api/users/signup', { email, username, password, passwordConfirm, name })
        console.log(res.data)
        return res;
    }

  return (
    <div className='min-h-screen flex flex-col justify-center items-center gap-4'>
        <h1 className='text-3xl font-bold'>Gazi Yapay Zeka</h1>
        <SignupForm signUpAction={signUpAction} />
    </div>
  )
}

export default Signup