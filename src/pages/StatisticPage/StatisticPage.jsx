import React, { useState } from "react";
import "../../css/StatisticPage.css";
import DropdownComponent from "../../components/DropdownComponent/DropdownComponent";

const StatisticPage = () => {
  const [dataQuestion, setDataQuestion] = useState([
    { topic: "Java", quantity: 50, notAnswered: 10, rate: 4.2 },
    { topic: "React", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "React", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "React", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "React", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "React", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "React", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "React", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "React", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "React", quantity: 50, notAnswered: 10, rate: 4.3 },
  ]);

  const [dataUser, setDataUser] = useState([
    { uid: 2211000, userName: "NAB", reputation: 100 },
    { uid: 2211001, userName: "NTD", reputation: 100 },
    { uid: 2211001, userName: "NTD", reputation: 100 },
    { uid: 2211001, userName: "NTD", reputation: 100 },
    { uid: 2211001, userName: "NTD", reputation: 100 },
    { uid: 2211001, userName: "NTD", reputation: 100 },
    { uid: 2211001, userName: "NTD", reputation: 100 },
    { uid: 2211001, userName: "NTD", reputation: 100 },
    { uid: 2211001, userName: "NTD", reputation: 100 },
  ]);

  const [dataInfringe, setDataInfringe] = useState([
    { uid: 2211000, userName: "NAB", infringe: 2, infringeName: "Dark" },
    { uid: 2211000, userName: "NAB", infringe: 2, infringeName: "Dark" },
    { uid: 2211000, userName: "NAB", infringe: 2, infringeName: "Dark" },
    { uid: 2211000, userName: "NAB", infringe: 2, infringeName: "Dark" },
    { uid: 2211000, userName: "NAB", infringe: 2, infringeName: "Dark" },
    { uid: 2211000, userName: "NAB", infringe: 2, infringeName: "Dark" },
    { uid: 2211000, userName: "NAB", infringe: 2, infringeName: "Dark" },
    { uid: 2211000, userName: "NAB", infringe: 2, infringeName: "Dark" },
  ]);

  const [dataTopic, setDataTopic] = useState([
    { topicId: 111111, topicName: "Java", topicQuantity: 300 },
    { topicId: 111111, topicName: "Java", topicQuantity: 300 },
    { topicId: 111111, topicName: "Java", topicQuantity: 300 },
    { topicId: 111111, topicName: "Java", topicQuantity: 300 },
    { topicId: 111111, topicName: "Java", topicQuantity: 300 },
    { topicId: 111111, topicName: "Java", topicQuantity: 300 },
    { topicId: 111111, topicName: "Java", topicQuantity: 300 },
    { topicId: 111111, topicName: "Java", topicQuantity: 300 },
  ]);

  const [dataActivity, setDataActivity] = useState([
    { uid: 111111, userName: "NNN", post: 30, answer: 10, vote: 24 },
    { uid: 111111, userName: "NNN", post: 30, answer: 10, vote: 24 },
    { uid: 111111, userName: "NNN", post: 30, answer: 10, vote: 24 },
    { uid: 111111, userName: "NNN", post: 30, answer: 10, vote: 24 },
    { uid: 111111, userName: "NNN", post: 30, answer: 10, vote: 24 },
    { uid: 111111, userName: "NNN", post: 30, answer: 10, vote: 24 },
    { uid: 111111, userName: "NNN", post: 30, answer: 10, vote: 24 },
    { uid: 111111, userName: "NNN", post: 30, answer: 10, vote: 24 },
  ]);

  return (
    <div>
      <div className="container mt-4">
        <h1 className="title">STATISTIC</h1>
        {/* drop down */}
        <div className="row text-center d-flex ">
          <div className="col ">
            <DropdownComponent>Type</DropdownComponent>
          </div>
          <div className="col">
            <DropdownComponent>Month</DropdownComponent>
          </div>
          <div className="col">
            <DropdownComponent>Year</DropdownComponent>
          </div>
        </div>
        {/* table question */}
        <h2 className="sub-title">Question</h2>
        <div className="dashboard">
          <div className="detail-btn-container">
            <button className="detail-btn">Detail</button>
          </div>
          <div className="table-container">
            {/* Table header (thead) */}
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Topic</th>
                  <th>Quantity</th>
                  <th>Not Answer</th>
                  <th>Rate</th>
                </tr>
              </thead>
            </table>
            {/* Table body (tbody) */}
            <div className="table-body-scroll">
              <table className="data-table">
                <tbody>
                  {dataQuestion.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.topic}</td>
                      <td>{row.quantity}</td>
                      <td>{row.notAnswered}</td>
                      <td>{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* table user */}
        <h2 className="sub-title">User</h2>
        <div className="dashboard">
          <div className="detail-btn-container">
            <button className="detail-btn">Detail</button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>UID</th>
                  <th>Name</th>
                  <th>Reputation</th>
                </tr>
              </thead>
            </table>
            <div className="table-body-scroll">
              <table className="data-table">
                <tbody>
                  {dataUser.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.uid}</td>
                      <td>{row.userName}</td>
                      <td>{row.reputation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* table infringe */}
        <div className="dashboard">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>UID</th>
                  <th>Name</th>
                  <th>Infringe</th>
                  <th>Name of infringe</th>
                </tr>
              </thead>
            </table>
            <div className="table-body-scroll">
              <table className="data-table">
                <tbody>
                  {dataInfringe.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.uid}</td>
                      <td>{row.userName}</td>
                      <td>{row.infringe}</td>
                      <td>{row.infringeName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* table topic */}
        <h2 className="sub-title">Topic</h2>
        <div className="dashboard">
          <div className="detail-btn-container">
            <button className="detail-btn">Detail</button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Topic ID</th>
                  <th>Topic Name</th>
                  <th>Quantity Used</th>
                </tr>
              </thead>
            </table>
            <div className="table-body-scroll">
              <table className="data-table">
                <tbody>
                  {dataTopic.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.topicId}</td>
                      <td>{row.topicName}</td>
                      <td>{row.topicQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* table activity */}
        <h2 className="sub-title">Activity</h2>
        <div className="dashboard">
          <div className="detail-btn-container">
            <button className="detail-btn">Detail</button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>UID</th>
                  <th>User Name</th>
                  <th>Post</th>
                  <th>Answer</th>
                  <th>Vote</th>
                </tr>
              </thead>
            </table>
            <div className="table-body-scroll">
              <table className="data-table">
                <tbody>
                  {dataActivity.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.uid}</td>
                      <td>{row.userName}</td>
                      <td>{row.post}</td>
                      <td>{row.answer}</td>
                      <td>{row.vote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;
