"use client"
import React from 'react'
import { LampContainer } from '../ui/lamp'
import { motion } from 'framer-motion'
import { Blog } from '@/types/blog'
import { BentoGrid, BentoGridItem } from '../ui/bento-grid'


const OurEvents = ({blogs}:{blogs: Blog[]}) => {
  return (
    <div className='h-screen bg-gradient-to-b from-black to-transparent px-12 w-full' id="" >
        <h2 className='text-2xl'>
          Sizlerle <span className='text-light-blue'>Paylaştıklarımız</span>
        </h2>
        <div className='w-full flex mt-12 justify-center'>
        <BentoGrid>
          {
            Array.from({length: 4}).map((_, index) => {
              return (
                <BentoGridItem
                  className={index % 3 === 0 ? 'col-span-2 w-full' : 'w-full'}
                  key={index}
                  title={blogs[0].title}
                  description={blogs[0].summary}
                  header={
                  <CustomHeader 
                    url={`https://gazi-yapay-zeka.pockethost.io/api/files/${blogs[0].collectionId}/${blogs[0].id}/${blogs[0].thumbnail}`}
                  />
                }
                />
              )
            })
          }
        </BentoGrid>
        </div>
    </div>
  )
}

const CustomHeader = ({url}:{url:string}) => {
  return (
    <img 
      alt={"header"}
      src={url}
      className='w-full object-scale-down  rounded-lg'
    />
  )
}

export default OurEvents