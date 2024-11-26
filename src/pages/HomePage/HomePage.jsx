import React, { useState } from "react";
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import AskQuestionBnt from '../../components/AskQuestionBtn/AskQuestionBntOverride'
import slider1 from '../../assets/image/slider1.webp';
import slider2 from '../../assets/image/slider2.webp';
import slider3 from '../../assets/image/slider3.webp';
import QuestionHolder from '../../components/QuestionHolder/QuestionHolder';
import SortBtnHome from '../../components/SortBtnHome/SortBtnHome'
function HomePage() {
  const [activeTab, setActiveTab] = useState("interesting");
  return (


    <div className="container mt-4" >
      <div>
        <SliderComponent arrImg={[slider1, slider2, slider3]} />
      </div>
      <br></br>
      <div className="col-12">
      <span className='title'>TOP QUESTION MAY INTEREST YOU</span>
      <span><AskQuestionBnt/></span>
      </div>
     <SortBtnHome></SortBtnHome>
      <div className="row mt-4">
        <div className="col-12">
          {activeTab === "interesting" && <QuestionHolder />}
          {activeTab === "hot" && <QuestionHolder />}
          {activeTab === "week" && <QuestionHolder />}
          {activeTab === "month" && <QuestionHolder />}
        </div>
      </div>
    </div>

  )
}

export default HomePage