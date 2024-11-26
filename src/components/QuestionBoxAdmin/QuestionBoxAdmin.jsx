import React from 'react';
import './QuestionBoxAdmin.css';
import img1 from "../../assets/image/avatar_1.jpg";
import { Button } from 'bootstrap';

const QuestionBoxAdmin = ({ username, reputation, followers, title, tags, date, views, answers, likes }) => {
  return (
    <div className="question-box">
      <div className="user-info">
        <div className="icon-container">
          <img className="icon-styles" src={img1} alt="avatar"></img>
        </div>
        <span className="username">{username}</span>
        <div className="details-container">
          <span className="detail-item">
            <i className="bi bi-trophy-fill trophy-icon"></i> {reputation}
          </span>
          <span className="detail-item">
            <i className="bi bi-heart-fill heart-icon"></i> {followers}
          </span>
        </div>
      </div>
      <div className="divider"></div>
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
            {tags.map((tag, index) => (
              <span key={index} className="tag-item">{tag}</span>
            ))}
          </div>
        </div>
        <div className="date-container">
          <span className="date-item">{date}</span>
        </div>
      </div>
      <div className='delete-container'>
        
          <i class="bi bi-x-circle" ></i>

      </div>
    </div>
  );
};

export default QuestionBoxAdmin;
