import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offer from '../components/Offers/Offer'
import NewCollection from '../components/NewCollection/NewCollection'

const Shop = () => {
  return (
    <div>
        <Hero/>
        <Popular/>
        <Offer/>
        <NewCollection/>
    </div>
  )
}

export default Shop