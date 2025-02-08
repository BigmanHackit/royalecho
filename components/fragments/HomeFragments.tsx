import React from 'react'
import { HomeBilboard } from '../home/HomeBilboard'
import Invite from '../home/Invite'
import Courses from '../home/Courses'
import Tabs from '../Tabs'

export const HomeFragments = () => {
  return (
    <>
        <HomeBilboard />
        <Invite />
        <Courses />
    </>
  )
}
