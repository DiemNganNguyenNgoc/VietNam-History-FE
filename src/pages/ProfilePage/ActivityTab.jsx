import React, { useState } from "react";
import "../../css/ProfilePage.css";
import ReputationSubTab from "./ReputationSubTab";
import FollowerSubTab from "./FollowerSubTab";
import FollowingSubTab from "./FollowingSubTab";
import QuestionSubTab from "./QuestionSubTab";
import AnswerSubTab from "./AnswerSubTab";
import TagSubTab from "./TagSubTab";

const ActivityTab = () => {
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
          className={`nav-link ${activeTab === "answers" ? "active" : ""}`}
          onClick={() => setActiveTab("answers")}
        >
          Answers
        </button>
        <button
          className={`nav-link ${activeTab === "responses" ? "active" : ""}`}
          onClick={() => setActiveTab("responses")}
        >
          Responses
        </button>
        <button
          className={`nav-link ${activeTab === "tags" ? "active" : ""}`}
          onClick={() => setActiveTab("tags")}
        >
          Tags
        </button>
        <button
          className={`nav-link ${activeTab === "saved" ? "active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          Saved
        </button>
        <button
          className={`nav-link ${activeTab === "followers" ? "active" : ""}`}
          onClick={() => setActiveTab("followers")}
        >
          Followers
        </button>
        <button
          className={`nav-link ${activeTab === "following" ? "active" : ""}`}
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
        <button
          className={`nav-link ${activeTab === "reputation" ? "active" : ""}`}
          onClick={() => setActiveTab("reputation")}
        >
          Reputation
        </button>
        <button
          className={`nav-link ${activeTab === "voted" ? "active" : ""}`}
          onClick={() => setActiveTab("voted")}
        >
          Voted
        </button>
      </div>

      {/* Nội dung Tab */}
      <div className="tab-content" style={{ flexGrow: 1 }}>
        <div className="tab-pane fade show active">
          {activeTab === "questions" && <QuestionSubTab />}
          {activeTab === "answers" && <AnswerSubTab />}
          {activeTab === "responses" && <div>Responses Content</div>}
          {activeTab === "tags" && <TagSubTab />}
          {activeTab === "saved" && <div>Saved Content</div>}
          {activeTab === "followers" && <FollowerSubTab />}
          {activeTab === "following" && <FollowingSubTab />}
          {activeTab === "reputation" && <ReputationSubTab />}
          {activeTab === "voted" && <div>Voted Content</div>}
        </div>
      </div>
    </div>
  );
};

export default ActivityTab;
