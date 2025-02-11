import React from 'react'
import MaxWidthWrapper from '../layout/MaxWidthWrapper'
import { EmblaCarousel } from '../shared/Carousel'

export const HomeBilboard = () => {
  return (
    <MaxWidthWrapper className='my-8 w-full'>
        <EmblaCarousel>
          <div className="embla__slide flex items-center justify-center rounded-lg text-gray-100 bg-gradient-to-br from-[#141E30] to-[#243B55]">Slide 1</div>
        <div className="embla__slide flex items-center justify-center rounded-lg text-gray-100 bg-gradient-to-br from-[#000428] to-[#004e92]">Slide 2</div>
        <div className="embla__slide flex items-center justify-center rounded-lg text-gray-100 bg-gradient-to-br from-[#2C3E50] to-[#4CA1AF]">Slide 3</div>
        <div className="embla__slide flex items-center justify-center rounded-lg text-gray-100 bg-gradient-to-br from-[#cb2d3e] to-[#ef473a]">Slide 4</div>
        </EmblaCarousel>
    </MaxWidthWrapper>
  )
}
