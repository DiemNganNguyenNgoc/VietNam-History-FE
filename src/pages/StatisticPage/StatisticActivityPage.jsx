import React, { useEffect, useState } from "react";
import "../../css/StatisticActivityPage.css";
import PieChart from "../../components/PieChartComponent/PieChartComponent";
import DropdownComponent from "../../components/DropdownComponent/DropdownComponent";

function StatisticActivityPage() {
  const [dataActivity, setDataActivity] = useState([
    { uid: 111111, userName: "NNN", post: 30, answer: 10, vote: 24 },
    { uid: 222222, userName: "AAA", post: 50, answer: 15, vote: 34 },
    { uid: 333333, userName: "BBB", post: 20, answer: 5, vote: 14 },
    { uid: 444444, userName: "CCC", post: 60, answer: 18, vote: 44 },
    { uid: 555555, userName: "DDD", post: 40, answer: 12, vote: 30 },
    { uid: 666666, userName: "EEE", post: 25, answer: 8, vote: 20 },
    { uid: 777777, userName: "FFF", post: 35, answer: 10, vote: 25 },
    { uid: 888888, userName: "GGG", post: 45, answer: 11, vote: 32 },
    { uid: 999999, userName: "HHH", post: 70, answer: 20, vote: 50 },
    { uid: 101010, userName: "III", post: 15, answer: 7, vote: 10 },
  ]);

  // Tính tổng dữ liệu
  const totalPost = dataActivity.reduce((sum, user) => sum + user.post, 0);
  const totalAnswer = dataActivity.reduce((sum, user) => sum + user.answer, 0);
  const totalVote = dataActivity.reduce((sum, user) => sum + user.vote, 0);

  const calculateTopPercentage = (field) => {
    const sortedData = [...dataActivity].sort((a, b) => b[field] - a[field]);
    const top9 = sortedData.slice(0, 9);
    const top9Sum = top9.reduce((sum, user) => sum + user[field], 0);
    const remaining = totalPost - top9Sum;

    const data = [
      ...top9.map((user) => user[field]),
      remaining > 0 ? remaining : 0,
    ];
    const labels = [
      ...top9.map((user) => user.userName),
      remaining > 0 ? "Others" : null,
    ].filter(Boolean);

    const colors = Array.from({ length: labels.length }, () =>
      generateRandomColor()
    );

    return { data, labels, colors };
  };

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const pieChartPost = calculateTopPercentage("post");
  const pieChartAnswer = calculateTopPercentage("answer");
  const pieChartVote = calculateTopPercentage("vote");

  return (
    <div>
      <div className="container">
        <h1 className="title-page">Statistic Activity</h1>
        {/* Dropdown */}
        <div className="row text-center d-flex ">
          <div className="col">
            <DropdownComponent>Type</DropdownComponent>
          </div>
          <div className="col">
            <DropdownComponent>Month</DropdownComponent>
          </div>
          <div className="col">
            <DropdownComponent>Year</DropdownComponent>
          </div>
        </div>
        {/* Tổng dữ liệu */}
        <div className="total">
          <section className="section__total-question">
            <label className="total__title">Total post</label>
            <h2 className="total__number">{totalPost}</h2>
          </section>
          <section className="section__total-question">
            <label className="total__title">Total answer</label>
            <h2 className="total__number">{totalAnswer}</h2>
          </section>
          <section className="section__total-question">
            <label className="total__title">Total vote</label>
            <h2 className="total__number">{totalVote}</h2>
          </section>
        </div>
        {/* Biểu đồ Pie Chart */}
        <div className="pie-chart">
          <h2>Top Users by Post</h2>
          <PieChart
            data={pieChartPost.data}
            labels={pieChartPost.labels}
            colors={pieChartPost.colors}
          />
          <h2>Top Users by Answer</h2>
          <PieChart
            data={pieChartAnswer.data}
            labels={pieChartAnswer.labels}
            colors={pieChartAnswer.colors}
          />
          <h2>Top Users by Vote</h2>
          <PieChart
            data={pieChartVote.data}
            labels={pieChartVote.labels}
            colors={pieChartVote.colors}
          />
        </div>
        {/* Bảng dữ liệu */}
        <div className="dashboard">
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
}

export default StatisticActivityPage;
