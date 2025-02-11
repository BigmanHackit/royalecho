'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export function EmblaCarousel({children}: {children: React.ReactNode}) {
  const [emblaRef] = useEmblaCarousel({loop: true}, [Autoplay({delay: 3000})])

  return (
    <div className="embla h-56 w-full" ref={emblaRef}>
      <div className="embla__container h-full border">
        {/* <div className="embla__slide flex items-center justify-center rounded-lg text-gray-100 bg-gradient-to-br from-[#141E30] to-[#243B55]">Slide 1</div>
        <div className="embla__slide flex items-center justify-center rounded-lg text-gray-100 bg-gradient-to-br from-[#000428] to-[#004e92]">Slide 2</div>
        <div className="embla__slide flex items-center justify-center rounded-lg text-gray-100 bg-gradient-to-br from-[#2C3E50] to-[#4CA1AF]">Slide 3</div>
        <div className="embla__slide flex items-center justify-center rounded-lg text-gray-100 bg-gradient-to-br from-[#cb2d3e] to-[#ef473a]">Slide 4</div> */}
        {children}
      </div>
    </div>
  )
}

