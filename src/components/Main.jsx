import React from 'react'
import Latest from './Latest'
import Best from './Best'
import Stickers from './Stickers'
import Banner from './Banner'

const Main = () => {
  return (
    <div>
        <Banner/>
      <Latest/>
      <Best/>
      <Stickers/>
    </div>
  )
}

export default Main
