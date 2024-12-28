import { Popover } from 'antd';
import React from 'react';
import './QuestionBox.css';

const QuestionBox = ({ tags, title, date, views, answers, likes, onUpdate, onDelete }) => {
  const content = (
    <div>
      {["Update", "Delete"].map((item, index) => (
        <p
          key={index}
          onClick={(e) => {
            e.stopPropagation(); // Ngăn sự kiện click lan ra phần tử cha
            if (item === "Update") {
              onUpdate();
            } else if (item === "Delete") {
              onDelete && onDelete();
            }
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#C5E3FC")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          style={{
            padding: "10px",
            margin: 0,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {item}
        </p>
      ))}
    </div>
  );

  const handlePopoverClick = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra phần tử cha
  };

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
            {tags.map((tag, index) => (
              <span key={index} className="tag-item">{tag}</span>
            ))}
          </div>
        </div>

        <div className="date-container">
          <span className="date-item">{date}</span>
        </div>

        <div className="btn">
          <Popover content={content} trigger="click">
            <div
              onClick={handlePopoverClick} // Ngăn lan sự kiện
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <i
                className="bi bi-three-dots-vertical"
                style={{ color: '#777' }}
              ></i>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
