import React from 'react'
import MaxWidthWrapper from '../layout/MaxWidthWrapper'
import { EmblaCarousel } from '../shared/Carousel'

export const HomeBilboard = () => {
  return (
    <MaxWidthWrapper className='my-8 w-full'>
        <EmblaCarousel />
    </MaxWidthWrapper>
  )
}
