import React from "react";
import QuestionHolder from "../../components/UserAnswer/QuestionHolder";
import "../../css/AnswerSubTab.css";

const AnswerSubTab = (answerQuantity) => {
  answerQuantity = 3;
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
