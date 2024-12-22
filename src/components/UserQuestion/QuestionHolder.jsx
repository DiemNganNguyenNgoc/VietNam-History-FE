import React, { useEffect, useState } from 'react';
import QuestionBox from '../../components/UserQuestion/QuestionBox';
import * as QuestionService from "../../services/QuestionService";
import { useSelector } from "react-redux";// Giả sử bạn đã tạo một service để gọi API

const QuestionHolder = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);

  // Hàm để lấy câu hỏi từ API
  const fetchQuestions = async () => {
    try {
      setLoading(true); // Bắt đầu tải dữ liệu
      const response = await QuestionService.getQuestionsByUserId(user.id); // Gọi API
      if (response.status === 'OK') {
        setQuestions(response.data); // Cập nhật danh sách câu hỏi
      } else {
        setError('Không thể tải câu hỏi');
      }
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi khi tải câu hỏi');
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  };

  // Gọi hàm fetch khi userId thay đổi
  useEffect(() => {
    if (user.id) {
      fetchQuestions();
    }
  }, [user.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {questions.map((question) => (
        <QuestionBox
          key={question._id} // Sử dụng _id từ API
          title={question.title}
          tags={"question.tags"}
          date={new Date(question.createdAt).toLocaleString()}
          views={question.view}
          answers={question.answerCount}
          likes={question.upVoteCount} // Có thể cần điều chỉnh nếu API trả về khác
        />
      ))}
    </div>
  );
};

export default QuestionHolder;
