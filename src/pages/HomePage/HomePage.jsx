import React from 'react'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/image/slider1.webp'
import slider2 from '../../assets/image/slider2.webp'
import slider3 from '../../assets/image/slider3.webp'
const HomePage = () => {
  return (
    <div>
      <SliderComponent arrImg = {[slider1 , slider2, slider3]}/>
    </div>
  )
}

export default HomePage