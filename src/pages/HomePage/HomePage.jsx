import React from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import AskQuestionBnt from '../../components/AskQuestionBtn/AskQuestionBntOverride'
import slider1 from '../../assets/image/slider1.webp';
import slider2 from '../../assets/image/slider2.webp';
import slider3 from '../../assets/image/slider3.webp';
const HomePage = () => {
  return (
    <div>
      <div>
      <SliderComponent arrImg = {[slider1 , slider2, slider3]}/>
      </div>
      <br></br>
      <div className='title'>TOP QUESTION MAY INTEREST YOU</div>
      <AskQuestionBnt/>
    </div>
  )
}

export default HomePage