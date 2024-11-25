import React, { useState } from "react";
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import AskQuestionBnt from '../../components/AskQuestionBtn/AskQuestionBntOverride'
import slider1 from '../../assets/image/slider1.webp';
import slider2 from '../../assets/image/slider2.webp';
import slider3 from '../../assets/image/slider3.webp';
function HomePage () {
  const [activeTab, setActiveTab] = useState("interesting");
  return (
  

    <div className="container mt-4" >
      <div>
      <SliderComponent arrImg = {[slider1 , slider2, slider3]}/>
      </div>
      <br></br>
      <div className='title'>TOP QUESTION MAY INTEREST YOU</div>
      <AskQuestionBnt/>
          <ul className="nav nav-tabs">
       
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "interesting" ? "active" : ""}`}
                onClick={() => setActiveTab("interesting")}
              >
                Interesting
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "hot" ? "active" : ""}`}
                onClick={() => setActiveTab("hot")}
              >
                Hot
              </button>
              </li>
              <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "week" ? "active" : ""}`}
                onClick={() => setActiveTab("week")}
              >
                Week
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "month" ? "active" : ""}`}
                onClick={() => setActiveTab("month")}
              >
                Month
              </button>
            </li>
          </ul>
        </div>

  )
}

export default HomePage