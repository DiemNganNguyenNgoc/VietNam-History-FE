import React from "react";
import QuestionHolder from "../../components/UserQuestion/QuestionHolder";
import "../../css/QuestionSubTab.css";

const SaveSubTab = (questionQuantity) => {
  questionQuantity = 3;
  return (
    <div>
      <div className="title">
        <h3>Saved {questionQuantity} </h3>
      </div>
      <div className="question-list">
        <QuestionHolder></QuestionHolder>
      </div>
    </div>
  );
};

export default SaveSubTab;
