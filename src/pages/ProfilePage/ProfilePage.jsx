import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ActivityTab from "./ActivityTab";
import ProfileTab from "./ProfileTab";



function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mt-4">
      {/* Avatar và Tên */}
      <div className="row ">
        <div className="col-3">
          <img
            src="https://via.placeholder.com/150"
            alt="Avatar"
            className="rounded-circle"
          />
          </div>
          <div className="col-9">
            <div className="row">
          <h2 className="mt-3">Nguyễn Văn A</h2>
          </div>
          <div className="row">
            <div className="col">
          <i class="bi bi-calendar"></i>
          <p>Member for 10 days</p>
          </div>
          <div className="col">
          <i class="bi bi-clock-history"></i>
          <p>Recent access history: 01/01/2024</p>
          </div>
          </div>
          </div>
      </div>

      {/* Tabs */}
      <div className="row mt-4">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "activity" ? "active" : ""}`}
                onClick={() => setActiveTab("activity")}
              >
                Activity
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Nội dung Tab */}
      <div className="row mt-4">
        <div className="col-12">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "activity" && <ActivityTab />}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
