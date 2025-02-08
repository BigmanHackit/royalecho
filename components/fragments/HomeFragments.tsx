import React from 'react'
import { HomeBilboard } from '../home/HomeBilboard'
import Invite from '../home/Invite'
import Courses from '../home/Courses'

export const HomeFragments = () => {
  return (
    <>
        <HomeBilboard />
        <Invite />
        <Courses />
    </>
  )
}
