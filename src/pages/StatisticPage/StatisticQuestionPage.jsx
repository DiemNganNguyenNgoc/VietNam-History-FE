import React, { useEffect, useState } from "react";
import "../../css/StatisticQuestionPage.css";
import PieChart from "../../components/PieChartComponent/PieChartComponent";
import DropdownComponent from "../../components/DropdownComponent/DropdownComponent";

const StatisticQuestionPage = (total, rating) => {
  total = 200;
  rating = 4.1;

  const [dataQuestion, setDataQuestion] = useState([
    { topic: "Java", quantity: 50, notAnswered: 10, rate: 4.2 },
    { topic: "React", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "Python", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "C++", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "C", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "C#", quantity: 50, notAnswered: 10, rate: 4.3 },
    { topic: "JavaScript", quantity: 50, notAnswered: 10, rate: 4.3 },
  ]);

  const [dataTopic, setDataTopic] = useState([]); // Dữ liệu phần trăm
  const [labels, setLabels] = useState([]); // Nhãn của biểu đồ
  const [colors, setColors] = useState([]); // Màu sắc ngẫu nhiên

  useEffect(() => {
    // Tính tổng quantity của tất cả các topic
    const totalQuantity = dataQuestion.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Tính phần trăm cho từng topic
    const newDataTopic = dataQuestion.map((item) => {
      return (item.quantity / totalQuantity) * 100;
    });

    // Lấy nhãn từ topic
    const newLabels = dataQuestion.map((item) => item.topic);

    // Sinh màu sắc ngẫu nhiên cho mỗi topic
    const generateRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    const newColors = dataQuestion.map(() => generateRandomColor());

    // Cập nhật state
    setDataTopic(newDataTopic);
    setLabels(newLabels);
    setColors(newColors);
  }, [dataQuestion]);

  return (
    <div>
      <div className="container">
        <h1 className="title-page">Question</h1>
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
        {/* top */}
        <div className="total">
          <section className="section__total-question">
            <label className="total__title">Total question</label>
            <h2 className="total__number">{total}</h2>
          </section>
          <section className="section__total-question">
            <label className="total__title">Average Rating</label>
            <h2 className="total__number">{rating}</h2>
          </section>
        </div>
        {/* pie chart */}
        <div className="pie-chart">
          {/* pie chart topic */}
          <PieChart data={dataTopic} labels={labels} colors={colors} />
          {/* pie chart answer */}
          <PieChart data={dataTopic} labels={labels} colors={colors} />
          {/* pie chart rating */}
          <PieChart data={dataTopic} labels={labels} colors={colors} />
        </div>
        {/* table */}
        <div className="dashboard">
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
      </div>
    </div>
  );
};

export default StatisticQuestionPage;
