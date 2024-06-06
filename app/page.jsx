import Hero from '@/components/Hero'
import HomeProperties from '@/components/HomeProperties'
import InfoBoxes from '@/components/InfoBoxes'
import React from 'react'
// import connectDB from '@/config/database'

// export const metadata = {
//   title:'Homepage'
// }

const HomePage = async () => {
  // await connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  )
}

export default HomePage