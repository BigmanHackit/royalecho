import React from 'react'
import MaxWidthWrapper from '../layout/MaxWidthWrapper'
import FreeClassButton from '../FreeClassButton'

const FreeClass = () => {
  return (
    <MaxWidthWrapper className='w-full bg-black text-white py-12 rounded-lg'>
        <div className='flex flex-col gap-8'>
            <h1 className='text-4xl font-bold'>Unlock Your Learning Potential</h1>
            <div className='flex gap-3'>
                <FreeClassButton className='border border-white hover:bg-white hover:text-black rounded' />
            </div>
        </div>
    </MaxWidthWrapper>
  )
}

export default FreeClass