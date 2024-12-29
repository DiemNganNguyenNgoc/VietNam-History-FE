import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TagAdmin from "../TagAdmin/TagAdmin";
import UsersAdmin from "../UsersAdmin/UsersAdmin";
import QuestionAdmin from "../QuestionAdmin/QuestionAdmin";
import { useSelector } from "react-redux";
import StatisticPage from "../../pages/StatisticPage/StatisticPage";

function ManageSystem() {
  const admin = useSelector((state) => state.admin);
  const [activeTab, setActiveTab] = useState("question");

  return (
    <div className="container mt-4">
      {/* Tabs */}
      <div className="row mt-4">
        <div className="col-12">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "question" ? "active" : ""}`}
                onClick={() => setActiveTab("question")}
              >
                Questions
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "tag" ? "active" : ""}`}
                onClick={() => setActiveTab("tag")}
              >
                Tags
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "user" ? "active" : ""}`}
                onClick={() => setActiveTab("user")}
              >
                Users
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "statistic" ? "active" : ""}`}
                onClick={() => setActiveTab("statistic")}
              >
                Statistic
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Nội dung Tab */}
      <div className="row mt-4">
        <div className="col-12">
          {activeTab === "question" && <QuestionAdmin />}
          {activeTab === "tag" && <TagAdmin />}
          {activeTab === "user" && <UsersAdmin />}
          {activeTab === "statistic" && <StatisticPage />}
        </div>
      </div>
    </div>
  );
}

export default ManageSystem;
