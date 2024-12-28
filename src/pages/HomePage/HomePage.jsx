import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import slider1 from '../../assets/image/slider1.webp';
import slider2 from '../../assets/image/slider2.webp';
import slider3 from '../../assets/image/slider3.webp';
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import SortBtnHome from '../../components/SortBtnHome/SortBtnHome';
import QuestionBox from "../../components/QuestionBox/QuestionBox";
import * as QuestionService from "../../services/QuestionService";
import * as UserService from "../../services/UserService";
import { useQuery } from "@tanstack/react-query";
import * as TagService from "../../services/TagService";

function HomePage() {
  const [activeTab, setActiveTab] = useState("interesting");

  const navigate = useNavigate();

  //const [userInfo, setUserInfo] = useState({});
  const [users, setUsers] = useState({});
  const [tags, setTags] = useState({});

  // Lấy danh sách câu hỏi từ API
  const getAllQues = async () => {
    const res = await QuestionService.getAllQues();
    return res.data;
  };


  const {
    isLoading: isLoadingQues,
    data: questions,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: getAllQues,
  });

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

  const handleAskQuestionClick = () => {
    navigate("/askquestion");
  };

  const handleQuestionClick = (questionId) => {
    navigate(`/question-detail/${questionId}`); // Chuyển hướng đến trang chi tiết câu hỏi
  };
  return (
    <div className="container mt-4" >
      <div>
        <SliderComponent arrImg={[slider1, slider2, slider3]} />
      </div>
      <br></br>
      <div className="row">
        <div className="col">
          <span className='title'>TOP QUESTION MAY INTEREST YOU</span>
        </div>
        <div className="col-2" style={{ marginTop: '10px' }}>
          <ButtonComponent
            textButton="Ask question"
            onClick={handleAskQuestionClick} />
        </div>
      </div>
      <SortBtnHome></SortBtnHome>
      <div className="row mt-4">
        <div className="col-12">
          {Array.isArray(questions) && questions.length > 0 ? (
            questions.map((question) => {
              const user = users[question.userQues]; // Lấy thông tin người dùng từ state
              return (
                <div
                  key={question._id}
                  onClick={() => handleQuestionClick(question._id)}
                >
                  <QuestionBox
                    img={user?.img || ""}
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
            <LoadingComponent isLoading={isLoadingQues}/>
          )}
        </div>
      </div>
    </div>

  )
}

export default HomePage