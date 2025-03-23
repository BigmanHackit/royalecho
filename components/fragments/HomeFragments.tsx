import React from 'react'
import { HomeBilboard } from '../home/HomeBilboard'
import Invite from '../home/FeaturesList'
import Benefits from '../home/Benefits'
import Services from '../home/Services'
import Testimonials from '../shared/Testimonials'
import HowItWorks from '../home/HowItWorks'
import FreeClass from '../shared/FreeClass'

export const HomeFragments = () => {
  return (
    <>
        <HomeBilboard />
        <Invite />
        <Benefits />
        <Services />
        <Testimonials />
        <HowItWorks />
        <FreeClass />
    </>
  )
}
