import React, { useState } from 'react'
import '../../css/ProfilePage.css'
import ProfileReputation from '../../components/ProfileReputation/ProfileReputation';

const ActivityTab = () => {
  const [activeTab, setActiveTab] = useState("questions");

  const dataReputation={
    totalPoints: 100,
    date: '2024-11-18',
    details: [
      { type: 'add', points: 20, description: 'Điểm thưởng' },
      { type: 'subtract', points: 10, description: 'Điểm trừ vì vi phạm' },
      { type: 'add', points: 30, description: 'Điểm thưởng do hoàn thành nhiệm vụ' },
    ]
  }

  const reputationContent =(
    <>
    <h3 className="title-profile" style={{marginLeft:'12px', marginBottom:'20px'}}>Reputation 280</h3>
    {[...Array(5)].map((_, index) => (
                    <ProfileReputation 
                    key={index}
                    totalPoints={dataReputation.totalPoints}
                    date={dataReputation.date}
                    details={dataReputation.details}
                  />
                ))}
    
    </>
  )

  return (
    <div className="d-flex">
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
          {activeTab === "reputation" && <div>{reputationContent}</div>}
          {activeTab === "voted" && <div>Voted Content</div>}
        </div>
      </div>
    </div>
  )
}

export default ActivityTab;
