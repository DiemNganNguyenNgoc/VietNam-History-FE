import React from "react";
import "./QuestionBox.css";

const QuestionBox = ({
  id,
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
  isLiked,
  isSaved,
  onLike,
  onSave,
  onUnsave,
}) => {
  return (
    <div className="question-box">
      {/* Thông tin người dùng */}
      <div className="user-info">
        <div className="icon-container">
          {img ? (
            <img className="icon-styles" src={img} alt="avatar" />
          ) : (
            <div className="placeholder-avatar"></div>
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

      {/* Nội dung câu hỏi */}
      <div className="question-content">
        <div className="question-details">
          <span className="detail-item">{views} views</span>
          <span className="detail-item">{answers} answers</span>
          <span className="detail-item">
            {likes}
            <span
              className={`like-icon-container ${isLiked ? "liked" : ""}`}
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
                if (!isLiked) onLike();
              }}
              style={{
                cursor: isLiked ? "default" : "pointer",
                marginLeft: "10px",
              }}
            >
              {isLiked ? (
                <i className="bi bi-hand-thumbs-up-fill like-icon"></i>
              ) : (
                <i className="bi bi-hand-thumbs-up like-icon"></i>
              )}
            </span>
          </span>
          {/* Nút Save/Unsave */}
          <button
            className={`save-button ${isSaved ? "saved" : ""}`}
            onClick={(e) => {
              e.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
              isSaved ? onUnsave() : onSave();
            }}
            style={{
              marginLeft: "10px",
              cursor: "pointer",
            }}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>

        {/* Tiêu đề và tags */}
        <div className="title-and-tags">
          <h3 className="question_title">{title}</h3>
          <div className="tags-container">
            {tags.map((tag, index) => (
              <span key={index} className="tag-item">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Ngày tạo */}
        <div className="date-container">
          <span className="date-item">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
