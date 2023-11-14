import EventForm from '@/components/EventForm'
import axios from 'axios'
import React from 'react'

const page = async ({ params }: { params: { pid: string } }) => {
    const res = await axios.get("http://localhost:3000/api/events/" + params.pid)
    console.log(res.data)
  return (
    <div className='w-full py-12'>
        <EventForm event={res.data} />
    </div>
  )
}

export default page