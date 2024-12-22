import React from 'react';
import './QuestionBox.css';
import * as QuestionService from "../../services/QuestionService";
import { useSelector } from "react-redux";

const QuestionBox = ({ title, date, views, answers, likes }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="question-box">
      <div className="question-content">
        <div className="question-details">
          <span className="detail-item">{views} views</span>
          <span className="detail-item">{answers} answers</span>
          <span className="detail-item">
            {likes} <i className="bi bi-hand-thumbs-up like-icon"></i>
          </span>
        </div>
        <div className="title-and-tags">
          <h3 className="question_title">{title}</h3>
          <div className="tags-container">
            
              <span className="tag-item">{"tag"}</span>
            
          </div>
        </div>
        <div className="date-container">
          <span className="date-item">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
