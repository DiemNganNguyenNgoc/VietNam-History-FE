import React from 'react';
import { Popover } from 'antd';
import parse from 'html-react-parser';
import './AnswerBox.css'; // Đảm bảo file CSS này hỗ trợ cả giao diện mới

const QuestionAnswerBox = ({
    questionTitle,
    questionTags,
    questionDate,
    answerContent,
    answerDate,
    onUpdateAnswer,
    onDeleteAnswer,
    onHiddenAnswer,
    isHiddenAnswer,
}) => {
    const questionPopoverContent = (
        <div>
            {[ "Delete"].map((item, index) => (
                <p
                    key={index}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (item === "Update") {
                            onUpdateAnswer();
                        } else if (item === "Delete") {
                            onDeleteAnswer && onDeleteAnswer();
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

           
            <p
                onClick={(e) => {
                    e.stopPropagation();
                    onHiddenAnswer && onHiddenAnswer();
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
                {isHiddenAnswer ? true : false}
            </p>
        </div>
    );
console.log("URAT", questionTags)
    return (
        <div className="question-answer-box">
            {/* Phần câu hỏi */}
            <div className="question-section">
                <div className="title-and-tags">
                    <h3 className="question_title">{parse(questionTitle)}</h3>
                    <div className="tags-container">
                        {questionTags.map((tag, index) => (
                            <span key={index} className="tag-item">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="date-container">
                    <span className="date-item">{questionDate}</span>
                </div>
                {isHiddenAnswer === false && (
                    <div className="hidden-notice" style={{ color: "#ff0000", fontWeight: "bold", marginBottom: "10px", fontSize: "14px" }}>
                        This answer was hidden
                    </div>
                )}

            </div>

            <div className="divider"></div>

            {/* Phần câu trả lời */}
            <div className="answer-section">
                <div className='Answerdetail'>
                   
                        <h4>Answer:</h4>
                 
                    <div className="btn">
                        <Popover content={questionPopoverContent} trigger="click">
                            <div
                                onClick={(e) => e.stopPropagation()}
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
                <p className="answer-content">{parse(answerContent)}</p>
                <div className="answer-date-container">
                    <span className="date-item">{answerDate}</span>
                </div>
            </div>
        </div>
    );
};

export default QuestionAnswerBox;
