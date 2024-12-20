import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import QuestionFilter from '../../components/QuestionFilter/QuestionFilter';
import SortBtn from '../../components/SortBtn/SortBtn';
import QuestionBox from '../../components/QuestionBox/QuestionBox';
import * as QuestionService from "../../services/QuestionService";
import * as UserService from "../../services/UserService";
import { useQuery } from '@tanstack/react-query';

const QuestionPage = () => {
  const [filters, setFilters] = useState({
    no_answers: false,
    no_accepted_answer: false,
    has_bounty: false,
    newest: false,
    recent_activity: false,
    highest_score: false,
    most_frequent: false,
    bounty_ending_soon: false,
    the_following_tags: false,
  });

  const [userInfo, setUserInfo] = useState({}); // Khởi tạo userInfo là đối tượng rỗng thay vì mảng

  const navigate = useNavigate();

  // Lấy danh sách câu hỏi từ API
  const getAllQues = async () => {
    const res = await QuestionService.getAllQues();
    return res.data;
  };

  const getUserInfo = async (userQuesId) => {
    if (!userQuesId) {
      throw new Error("ID người dùng không hợp lệ.");
    }
    const res = await UserService.getDetailsUser(userQuesId); // Hàm này cần được định nghĩa trong UserService
    return res.data;
  };

  const { isLoading: isLoadingQues, data: questions, error } = useQuery({
    queryKey: ['questions'],
    queryFn: getAllQues,
  });

  useEffect(() => {
    if (Array.isArray(questions) && questions.length > 0) {
      const fetchUserInfo = async () => {
        const userInfos = await Promise.all(
          questions.map(async (question) => {
            const userQuesId = question.userQues; // ID người dùng
  
            // Kiểm tra ID người dùng trước khi gọi API
            if (!userQuesId) {
              console.error(`Lỗi: ID người dùng không hợp lệ cho câu hỏi ${question._id}`);
              return { username: "Unknown", reputation: 0, followers: 0, questionId: question._id }; // Trả về dữ liệu mặc định
            }
  
            try {
              const userData = await getUserInfo(userQuesId); // Lấy thông tin người dùng
              return { ...userData, questionId: question._id }; // Lưu trữ thông tin người dùng
            } catch (error) {
              console.error("Lỗi khi lấy thông tin người dùng:", error.message);
              return { username: "Unknown", reputation: 0, followers: 0, questionId: question._id }; // Trả về dữ liệu mặc định khi lỗi
            }
          })
        );
  
        const userInfoMap = {}; // Đối tượng để lưu trữ dữ liệu người dùng theo ID câu hỏi
        userInfos.forEach((user) => {
          userInfoMap[user.questionId] = user; // Gán thông tin người dùng vào userInfoMap
        });
        setUserInfo(userInfoMap); // Cập nhật lại state userInfo
      };
      fetchUserInfo();
    }
  }, [questions]);
  

  if (isLoadingQues) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading questions: {error.message}</div>;
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters({
      ...filters,
      [name]: checked,
    });
  };

  const handleAskQuestionClick = () => {
    navigate('/askquestion');
  };

  return (
    <div className="container">
      <div
        style={{
          color: '#023E73',
          marginTop: '20px',
          marginLeft: '20px',
          height: 'auto',
          paddingRight: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '30px',
              marginLeft: '20px',
              marginTop: '20px',
            }}
          >
            All Questions
          </h1>
          <ButtonComponent textButton="Ask question" onClick={handleAskQuestionClick} />
        </div>
        <p
          style={{
            color: '#323538',
            marginTop: '10px',
            marginLeft: '20px',
            fontSize: '20px',
            fontWeight: '600',
          }}
        >
          2,535,460 questions
        </p>
        <br />
        <SortBtn />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', width: '100%' }}>
          <QuestionFilter filters={filters} onCheckboxChange={handleCheckboxChange} />
        </div>
        {/* Render các câu hỏi */}
        <div style={{ marginTop: '20px' }}>
          {Array.isArray(questions) && questions.length > 0 ? (
            questions.map((question) => {
              const user = userInfo[question._id] || {}; // Tránh truy cập vào undefined

              return (
                <QuestionBox
                  key={question._id}
                  username={user?.username || "Unknown"}
                  reputation={user?.reputation || 0}
                  followers={user?.followers || 0}
                  title={question.title}
                  tags={question.tags || []} 
                  date={question.updatedAt}
                  views={question.view}
                  answers={question.answerCount}
                  likes={question.upVoteCount}
                />
              );
            })
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
