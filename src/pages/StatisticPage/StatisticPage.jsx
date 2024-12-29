import React, { useState } from "react";
import "../../css/StatisticPage.css";
import StatisticActivityPage from "./StatisticActivityPage";
import StatisticQuestionPage from "./StatisticQuestionPage";
import StatisticTopicPage from "./StatisticTopicPage";
import StatisticUserPage from "./StatisticUserPage";

const StatisticPage = () => {
  const [activeTab, setActiveTab] = useState("questions");

  return (
    <div className="d-flex">
      {/* Tabs dọc */}
      <div
        className="nav flex-column nav-pills me-3"
        style={{ width: "200px" }}
      >
        <button
          className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
          onClick={() => setActiveTab("questions")}
        >
          Questions
        </button>
        <button
          className={`nav-link ${activeTab === "activities" ? "active" : ""}`}
          onClick={() => setActiveTab("activities")}
        >
          Activites
        </button>
        <button
          className={`nav-link ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          className={`nav-link ${activeTab === "tags" ? "active" : ""}`}
          onClick={() => setActiveTab("tags")}
        >
          Tags
        </button>
      </div>

      {/* Nội dung Tab */}
      <div className="tab-content" style={{ flexGrow: 1 }}>
        <div className="tab-pane fade show active">
          {activeTab === "activities" && <div><StatisticActivityPage/></div>}
          {activeTab === "questions" && <div><StatisticQuestionPage/></div>}
          {activeTab === "users" && <div><StatisticUserPage /></div>}
          {activeTab === "tags" && <div><StatisticTopicPage /></div>}
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;
