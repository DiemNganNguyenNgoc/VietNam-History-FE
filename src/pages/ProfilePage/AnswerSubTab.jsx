import React from "react";
import QuestionHolder from "../../components/UserAnswer/QuestionHolder";
import "../../css/AnswerSubTab.css";
import { useSelector } from "react-redux";

const AnswerSubTab = (answerQuantity) => {
    const user = useSelector((state) => state.user);
  
  answerQuantity = user?.answerCount|| 0;
  return (
    <div>
      <div className="title">
        <h3>Answers {answerQuantity} </h3>
      </div>
      <div className="answer-list">
        <QuestionHolder></QuestionHolder>
      </div>
    </div>
  );
};

export default AnswerSubTab;
