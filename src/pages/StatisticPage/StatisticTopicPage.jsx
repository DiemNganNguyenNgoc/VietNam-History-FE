import React, { useEffect, useState } from "react";
import "../../css/StatisticTopicPage.css";
import PieChart from "../../components/PieChartComponent/PieChartComponent";
import DropdownComponent from "../../components/DropdownComponent/DropdownComponent";

const StatisticTopicPage = ({ totalTopic }) => {
  const [dataTopic, setDataTopic] = useState([
    { topicId: 111111, topicName: "Java", topicQuantity: 301 },
    { topicId: 111112, topicName: "React", topicQuantity: 200 },
    { topicId: 111113, topicName: "Python", topicQuantity: 150 },
    { topicId: 111114, topicName: "C++", topicQuantity: 100 },
    { topicId: 111115, topicName: "C#", topicQuantity: 250 },
  ]);

  const lastIndex = dataTopic.length;
  totalTopic = Number(lastIndex);

  const [dataQuantity, setDataQuantity] = useState([]); // Dữ liệu phần trăm
  const [labels, setLabels] = useState([]); // Nhãn của biểu đồ
  const [colors, setColors] = useState([]); // Màu sắc ngẫu nhiên

  useEffect(() => {
    // Tính tổng quantity của tất cả các topic
    const totalQuantity = dataTopic.reduce(
      (total, item) => total + item.topicQuantity,
      0
    );

    // Tính phần trăm cho từng topic
    const newDataQuantity = dataTopic.map((item) => {
      return (item.topicQuantity / totalQuantity) * 100;
    });

    // Lấy nhãn từ topicName
    const newLabels = dataTopic.map((item) => item.topicName);

    // Sinh màu sắc ngẫu nhiên cho mỗi topic
    const generateRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    const newColors = dataTopic.map(() => generateRandomColor());

    // Cập nhật state
    setDataQuantity(newDataQuantity);
    setLabels(newLabels);
    setColors(newColors);
  }, [dataTopic]);

  const totalQuantity = dataTopic.reduce(
    (total, item) => total + item.topicQuantity,
    0
  );

  return (
    <div>
      <div className="container">
        <h1 className="title-page">Topic</h1>
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
            <label className="total__title">Total topic</label>
            <h2 className="total__number">{totalTopic}</h2>
          </section>
          <section className="section__total-question">
            <label className="total__title">Total quantity topic</label>
            <h2 className="total__number">{totalQuantity}</h2>
          </section>
        </div>
        {/* pie chart */}
        <div className="pie-chart">
          {/* pie chart topic */}
          <PieChart data={dataQuantity} labels={labels} colors={colors} />
        </div>
        {/* table */}
        <div className="dashboard">
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
      </div>
    </div>
  );
};

export default StatisticTopicPage;
