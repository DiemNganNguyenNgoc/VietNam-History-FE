import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/QuestionBox/QuestionBox.css"

const VoteHistory = () => {
  // Dữ liệu mẫu
  const votes = [
    {
      type: "upvote",
      for: "question",
      title: "Kỹ thuật lập trình với tập tin (file) bằng ngôn ngữ C++",
      tags: ["C++", "visual studio"],
      time: "12:00, 04/10/2024",
    },
    {
      type: "upvote",
      for: "answer",
      title: "Kỹ thuật lập trình với tập tin (file) bằng ngôn ngữ C++",
      tags: ["C++", "visual studio"],
      time: "12:00, 04/10/2024",
    },
    {
      type: "downvote",
      for: "answer",
      title: "Kỹ thuật lập trình với tập tin (file) bằng ngôn ngữ C++",
      tags: ["C++", "visual studio"],
      time: "12:00, 04/10/2024",
    },
  ];

  return (
    <><div className="title">
          <h3>VOTED </h3>
      </div><div className="container my-4">

              {votes.map((vote, index) => (
                  <div
                      key={index}
                      className="d-flex flex-row align-items-center border rounded p-3 mb-3"
                      style={{
                          backgroundColor: "#F2F5FF", // Màu xanh nhạt giống ảnh
                          borderColor: "#d0e6f5", // Màu viền nhẹ để hài hòa với nền
                      }}
                  >
                      {/* Phần loại vote */}
                      <div className="me-4" style={{ width: "100px", fontWeight: "bold" }}>
                          {vote.type === "upvote" ? (
                              <span className="text-success">{vote.type}</span>
                          ) : (
                              <span className="text-danger">{vote.type}</span>
                          )}
                          <div className="text-muted" style={{ fontSize: "0.9em" }}>
                              for {vote.for}
                          </div>
                      </div>

                      {/* Nội dung chính */}
                      <div className="flex-grow-1">
                          <div style={{ fontSize: "1em" }}>{vote.title}</div>
                          <div className="mt-2">
                              {vote.tags.map((tag, tagIndex) => (
                                  <span
                                      key={tagIndex}
                                      className="badge bg-secondary text-white me-2"
                                      style={{ fontSize: "0.85em" }}
                                  >
                                      {tag}
                                  </span>
                              ))}
                          </div>
                      </div>

                      {/* Thời gian */}
                      <div
                          className="text-muted text-end"
                          style={{ fontSize: "0.85em", minWidth: "150px" }}
                      >
                          vote at {vote.time}
                      </div>
                  </div>
              ))}
          </div></>
  );
};

export default VoteHistory;
