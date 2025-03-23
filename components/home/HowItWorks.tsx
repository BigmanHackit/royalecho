import React from 'react'
import MaxWidthWrapper from '../layout/MaxWidthWrapper'
import Image from 'next/image'

const Process = [
  {
    heading: 'Sign up',
    desccription: 'Join our interactive live classes and learn directly from experts.',
    image: '/welcome.jpg',
  },
  {
    heading: 'Join Classes',
    desccription: 'Learn from Experienced and Qualified Instructors',
    image: '/join-class.jpg',
  },
  {
    heading: 'Learn By practice',
    desccription: 'Work on Real-Life Projects to Gain Experience.',
    image: '/practice.jpg',
  },
]
const HowItWorks = () => {
  return (
    <MaxWidthWrapper className="my-24">
        <h1 className='text-xl lg:text-3xl font-bold text-center'>Discover the Simple Steps to Enroll in Our Live Classes</h1>

        <section className='w-full flex flex-col items-center gap-8 mt-8 space-y-8 lg:flex-row lg:space-y-0'>
          {Process.map((process) => {
            return (
              <div key={process.heading} className='w-full flex-col'>
                <Image
                src={process.image || '/img-placeholder.png'}
                alt={process.desccription}
                width={200}
                height={200}
                className='object-cover w-full h-[200px]'
                />

                <div className='w-full mt-3'>
                  <h1 className='font-semibold text-xl'>{process.heading}</h1>
                  <p className='text-sm text-muted-foreground'>{process.desccription}</p>
                </div>
              </div>
            )
          })}
        </section>
    </MaxWidthWrapper>
  )
}

export default HowItWorks