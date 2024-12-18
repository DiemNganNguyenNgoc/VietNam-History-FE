import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import slider1 from '../../assets/image/slider1.webp';
import slider2 from '../../assets/image/slider2.webp';
import slider3 from '../../assets/image/slider3.webp';
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import SortBtnHome from '../../components/SortBtnHome/SortBtnHome';
function HomePage() {
  const [activeTab, setActiveTab] = useState("interesting");

  const navigate = useNavigate();

  const hadleAskQues=()=>{
    navigate("/askquestion")
  }
  return (
    <div className="container mt-4" >
      <div>
        <SliderComponent arrImg={[slider1, slider2, slider3]} />
      </div>
      <br></br>
      <div className="row">
        <div className="col">
          <span className='title'>TOP QUESTION MAY INTEREST YOU</span>
        </div>
        <div className="col-2" style={{marginTop:'10px'}}>
          <ButtonComponent
            textButton="Ask question"
            onClick={hadleAskQues} />
        </div>
      </div>
      <SortBtnHome></SortBtnHome>
      <div className="row mt-4">
        <div className="col-12">
          {/* {activeTab === "interesting" && <QuestionHolder />}
          {activeTab === "hot" && <QuestionHolder />}
          {activeTab === "week" && <QuestionHolder />}
          {activeTab === "month" && <QuestionHolder />} */}
        </div>
      </div>
    </div>

  )
}

export default HomePage