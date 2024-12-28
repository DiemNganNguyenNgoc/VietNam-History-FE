import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import QuestionFilter from "../../components/QuestionFilter/QuestionFilter";
import SortBtn from "../../components/SortBtn/SortBtn";
import QuestionBox from "../../components/QuestionBox/QuestionBox";
import * as QuestionService from "../../services/QuestionService";
import * as UserService from "../../services/UserService";
import { useQuery } from "@tanstack/react-query";
import * as TagService from "../../services/TagService";

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

  //const [userInfo, setUserInfo] = useState({});
      const [users, setUsers] = useState({});
      const [tags, setTags] = useState({});

  const navigate = useNavigate();

  // Lấy danh sách câu hỏi từ API
  const getAllQues = async () => {
    const res = await QuestionService.getAllQues();
    return res.data;
  };

  // const getUserInfo = async (userQuesId) => {
  //   if (!userQuesId) {
  //     throw new Error("ID người dùng không hợp lệ.");
  //   }
  //   const res = await UserService.getDetailsUser(userQuesId); // Hàm này cần được định nghĩa trong UserService
  //   return res.data;
  // };

  const {
    isLoading: isLoadingQues,
    data: questions,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: getAllQues,
  });

  // useEffect(() => {
  //   if (Array.isArray(questions) && questions.length > 0) {
  //     const fetchUserInfo = async () => {
  //       const userInfos = await Promise.all(
  //         questions.map(async (question) => {
  //           const userQuesId = question.userQues; // ID người dùng

  //           // Kiểm tra ID người dùng trước khi gọi API
  //           if (!userQuesId) {
  //             console.error(
  //               `Lỗi: ID người dùng không hợp lệ cho câu hỏi ${question._id}`
  //             );
  //             return {
  //               username: "Unknown",
  //               reputation: 0,
  //               followers: 0,
  //               questionId: question._id,
  //             }; // Trả về dữ liệu mặc định
  //           }

  //           try {
  //             const userData = await getUserInfo(userQuesId); // Lấy thông tin người dùng
  //             return { ...userData, questionId: question._id }; // Lưu trữ thông tin người dùng
  //           } catch (error) {
  //             console.error("Lỗi khi lấy thông tin người dùng:", error.message);
  //             return {
  //               username: "Unknown",
  //               reputation: 0,
  //               followers: 0,
  //               questionId: question._id,
  //             }; // Trả về dữ liệu mặc định khi lỗi
  //           }
  //         })
  //       );

  //       const userInfoMap = {}; 
  //       userInfos.forEach((user) => {
  //         userInfoMap[user.questionId] = user;
  //       });
  //       setUserInfo(userInfoMap); 
  //     };
  //     fetchUserInfo();
  //   }
  // }, [questions]);
   // Lấy thông tin người dùng dựa trên userId từ câu hỏi
      const getUserDetails = async (userId) => {
          if (!userId) return null; 
          const res = await UserService.getDetailsUser(userId);
          return res.data; 
      };
  
      // Lấy thông tin tag dựa trên tagId
      const getTagDetails = async (tagId) => {
          const res = await TagService.getDetailsTag(tagId);
          return res.data;
      };
  
      useEffect(() => {
          const fetchUsersAndTags = async () => {
              const userMap = {};
              const tagMap = {};
  
              if (Array.isArray(questions)) {
                  for (let question of questions) {
                      // Lấy thông tin người dùng từ userId
                      if (question.userQues) {
                          const user = await getUserDetails(question.userQues);
                          userMap[question.userQues] = user;
                      }
  
                      // Lấy thông tin tag từ tagId
                      if (question.tags) {
                          for (let tagId of question.tags) {
                              if (!tagMap[tagId]) {
                                  const tag = await getTagDetails(tagId);
                                  tagMap[tagId] = tag;
                              }
                          }
                      }
                  }
              }
  
              setUsers(userMap);
              setTags(tagMap);
          };
  
          if (questions) {
              fetchUsersAndTags();
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
    navigate("/askquestion");
  };

  const handleQuestionClick = (questionId) => {
    navigate(`/question-detail/${questionId}`); // Chuyển hướng đến trang chi tiết câu hỏi
  };

  return (
    <div className="container">
      <div
        style={{
          color: "#023E73",
          marginTop: "20px",
          marginLeft: "20px",
          height: "auto",
          paddingRight: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              marginLeft: "20px",
              marginTop: "20px",
            }}
          >
            All Questions
          </h1>
          <ButtonComponent
            textButton="Ask question"
            onClick={handleAskQuestionClick}
          />
        </div>
        <p
          style={{
            color: "#323538",
            marginTop: "10px",
            marginLeft: "20px",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          2,535,460 questions
        </p>
        <br />
        <SortBtn />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            width: "100%",
          }}
        >
          <QuestionFilter
            filters={filters}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>
        {/* Render các câu hỏi */}
        <div style={{ marginTop: "20px" }}>
        {Array.isArray(questions) && questions.length > 0 ? (
                    questions.map((question) => {
                        const user = users[question.userQues]; // Lấy thông tin người dùng từ state
                        return (
                            <div
                                key={question._id}
                                onClick={() => handleQuestionClick(question._id)}
                            >
                                <QuestionBox
                                    username={user?.name || "Unknown"}
                                    reputation={user?.reputation || 0}
                                    followers={user?.followerCount || 0}
                                    title={question.title}
                                    tags={question.tags ? question.tags.map(tagId => tags[tagId]?.name || tagId) : []} // Lấy tên tag từ tags map
                                    date={question.updatedAt}
                                    views={question.view}
                                    answers={question.answerCount}
                                    likes={question.upVoteCount}
                                />
                            </div>
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
