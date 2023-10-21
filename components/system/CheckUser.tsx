"use client"

import { useUserContext } from '@/app/UserContext'
import { useRouter } from 'next/navigation'
import React, {useEffect, useState} from 'react'

const CheckUser = () => {
    const route = useRouter();
    const {user} = useUserContext();
    useEffect(() => {      
        if(!user){
            route.push("/login");
        }
    }, [user])
  return (
    <></>
  )
}

export default CheckUser