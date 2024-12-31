import React from 'react';
import './QuestionBoxAdmin.css';

const QuestionBoxAdmin = ({
  img,
  username,
  reputation,
  followers,
  title,
  tags,
  date,
  views,
  answers,
  likes,
  onDelete,
  isHidden, // Thêm trạng thái hiện tại
}) => {

  return (
    <div className="question-box">
      <div className="user-info">
        <div className="icon-container">
          {img ? (
            <img className="icon-styles" src={img} alt="avatar" />
          ) : (
            <div className="placeholder-avatar"> </div>
          )}
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

        {/* Hiển thị thông báo nếu câu hỏi đang bị ẩn */}
        {isHidden && (
          <div className="hidden-notice" style={{ color: "#ff0000", fontWeight: "bold", marginTop: "10px" }}>
            This question was hidden by the user.
          </div>
        )}
      </div>

      <div>
        <button
          className="btn btn-sm btn-light"
          onClick={onDelete} // Truyền event vào hàm
        >
          <i className="bi bi-trash text-danger"></i>
        </button>

      </div>
    </div>
  );
};

export default QuestionBoxAdmin;
