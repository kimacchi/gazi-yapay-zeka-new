import { headers } from 'next/headers'
import React from 'react'

const page = () => {
    const host = headers().get("host") === "localhost:3000" ? "http://localhost:3000" : `https://${headers().get("host")}`
  return (
    <div>page</div>
  )
}

export default page