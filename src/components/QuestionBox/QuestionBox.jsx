import React, { useState } from "react";
import "./QuestionBox.css";
import { Popover, Button } from "antd";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as TagService from "../../services/TagService";

const QuestionBox = ({
  id,
  img,
  username,
  reputation,
  followerCount,
  title,
  tags,
  date,
  views,
  answers,
  likes,
  isLiked,
  isSaved,
  isReported,
  onLike,
  onSave,
  onUnsave,
  onReport,
}) => {
  const getAllTag = async () => {
    const res = await TagService.getAllTag();
    // console.log("res.data", res);
    return res;
  };

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
            <i className="bi bi-person-fill person-icon"></i> {followerCount}
          </span>
        </div>
      </div>

      <div className="divider"></div>

      {/* Nội dung câu hỏi */}
      <div className="question-content">
        <div className="title-and-tags">
          <h3 className="question_title">{title}</h3>
          {/* <div className="tags-container">
            {tags.map((tag, index) => (
              <span key={index} className="tag-item">
                {tag}
              </span>
            ))}
          </div> */}
        </div>

        <div className="question-details">
          <span className="detail-item">{views} views</span>
          <span className="detail-item">{answers} answers</span>
          <span className="detail-item">
            {likes}
            <span
              className={`like-icon-container ${isLiked ? "liked" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
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
        </div>

        {/* Ngày tạo và nút Save/Menu */}
        <div className="footer-container">
          <span className="date-item">{date}</span>

          <div className="action-container" style={{ marginBottom: "10px" }}>
            <button
              className={`save-button ${isSaved ? "saved" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                isSaved ? onUnsave() : onSave();
              }}
              style={{ width: "80px" }}
            >
              {isSaved ? "Saved" : "Save"}
            </button>

            {/* Nút Report */}
            <button
              className={`report-button ${isReported ? "reported" : ""}`}
              type="text"
              danger
              disabled={isReported}
              onClick={(e) => {
                e.stopPropagation();
                onReport();
              }}
            >
              {isReported ? "Reported" : "Report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
