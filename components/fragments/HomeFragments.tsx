import React from 'react'
import { HomeBilboard } from '../home/HomeBilboard'
import Invite from '../home/FeaturesList'
import Benefits from '../home/Benefits'
import Services from '../home/Services'

export const HomeFragments = () => {
  return (
    <>
        <HomeBilboard />
        <Invite />
        <Benefits />
        <Services />
    </>
  )
}
