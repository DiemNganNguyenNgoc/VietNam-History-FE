import React, { useState } from 'react';
import '../../css/ProfilePage.css';
import ReputationSubTab from './ReputationSubTab';

const ActivityTab = () => {
  const [activeTab, setActiveTab] = useState("questions");

  return (
    <div className="d-flex" >
      {/* Tabs dọc */}
      <div className="nav flex-column nav-pills me-3" style={{ width: '200px' }}>
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
          className={`nav-link ${activeTab === "tabs" ? "active" : ""}`}
          onClick={() => setActiveTab("tabs")}
        >
          Tabs
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
          {activeTab === "questions" && <div>Questions Content</div>}
          {activeTab === "answers" && <div>Answers Content</div>}
          {activeTab === "responses" && <div>Responses Content</div>}
          {activeTab === "tabs" && <div>Tabs Content</div>}
          {activeTab === "saved" && <div>Saved Content</div>}
          {activeTab === "followers" && <div>Followers Content</div>}
          {activeTab === "following" && <div>Following Content</div>}
          {activeTab === "reputation" && <ReputationSubTab/>}
          {activeTab === "voted" && <div>Voted Content</div>}
        </div>
      </div>
    </div>
  )
}

export default ActivityTab;
