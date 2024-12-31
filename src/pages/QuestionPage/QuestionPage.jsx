import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import QuestionBox from "../../components/QuestionBox/QuestionBox";
import QuestionFilter from "../../components/QuestionFilter/QuestionFilter";
import SortBtn from "../../components/SortBtn/SortBtn";
import { setAllSaved } from "../../redux/slides/savedSlide";
import * as QuestionService from "../../services/QuestionService";
import * as SavedService from "../../services/SavedService";
import * as TagService from "../../services/TagService";
import * as UserService from "../../services/UserService";

const QuestionPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [savedList, setSavedList] = useState([]); // Danh sách câu hỏi đã lưu
  const [likeCounts, setLikeCounts] = useState({}); // Lưu số lượt like của mỗi câu hỏi
  // console.log("user", user);
  // Lấy `allSaved` từ Redux state
  const allSaved = useSelector((state) => state.saved.allSaved);

  const navigate = useNavigate();

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




  // Lấy danh sách câu hỏi từ API
  const getAllQuesByActive = async () => {
    const res = await QuestionService.getAllQuestionByActive(true); // Truyền active = true
    return res.data;
  };
  
  const {
    isLoading: isLoadingQues,
    data: questions,
    error,
  } = useQuery({
    queryKey: ["questions", true], // Thêm true vào queryKey để phản ánh tham số
    queryFn: getAllQuesByActive,
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

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("allSaved")) || [];
    setSavedList(savedData.map((item) => item.question));
    dispatch(setAllSaved(savedData));
  }, [dispatch]);


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

  //xử lí like

  const handleSaved = async (questionId, userQues) => {
    // e.stopPropagation();
    try {
      if (savedList.includes(questionId)) {
        console.log("Question already saved");
        return;
      }

      const savedResponse = await SavedService.createSaved({
        question: questionId,
        user: userQues,
      });

      console.log("Saved response:", savedResponse);

      setSavedList((prev) => [...prev, questionId]);

      // Lưu vào Redux (nếu cần)
      const updatedSavedList = [...allSaved, savedResponse.data]; // allSaved là state hiện tại
      dispatch(setAllSaved(updatedSavedList));
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  const handleUnsave = async (savedId) => {
    try {
      await SavedService.deleteSaved(savedId); // API xóa bài đã lưu

      const updatedSavedList = allSaved.filter(
        (saved) => saved._id !== savedId
      );

      // Cập nhật Redux và localStorage
      dispatch(setAllSaved(updatedSavedList));
      localStorage.setItem("allSaved", JSON.stringify(updatedSavedList));
    } catch (error) {
      console.error("Error unsaving question:", error);
    }
  };

  const handleNavToSavedPage = () => {
    navigate("/saved-list");
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
          <ButtonComponent
            textButton="Saved questions"
            onClick={handleNavToSavedPage}
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
        {isLoadingQues ? (
          <LoadingComponent isLoading={isLoadingQues} />
        ) :
          Array.isArray(questions) && questions.length > 0 ? (
            questions.map((question) => {

              // console.log("question", question);

              const user = users[question.userQues]; // Lấy thông tin người dùng từ state
              return (
                <div
                  key={question._id}
                  onClick={() => handleQuestionClick(question._id)}
                >
                  <QuestionBox

                    id={question._id}
                    userQues={question.userQues}

                    img={user?.img || ""}

                    username={user?.name || "Unknown"}
                    reputation={user?.reputation || 0}
                    followers={user?.followerCount || 0}
                    title={question.title}

                    // tags={
                    //   question.tags
                    //     ? question.tags.map(
                    //       (tagId) => tags[tagId]?.name || tagId
                    //     )
                    //     : []
                    // } // Lấy tên tag từ tags map
                    tags={question.tags ? question.tags.map(tagId => tags[tagId]?.name || tagId) : []} // Lấy tên tag từ tags map

                    date={new Date(question.updatedAt).toLocaleString()}
                    views={question.view}
                    answers={question.answerCount}
                    likes={question.upVoteCount}

                    isLiked={savedList.includes(question._id)}
                    isSaved={allSaved.some(
                      (saved) => saved.question === question._id
                    )}
                    // onLike={(e) =>
                    //   handleSaved(e, question._id, question.userQues)
                    // }
                    onSave={() => handleSaved(question._id, question.userQues)}
                    onUnsave={() => {
                      const savedItem = allSaved.find(
                        (saved) => saved.question === question._id
                      );
                      if (savedItem) handleUnsave(savedItem._id); // Truyền `_id` của bài đã lưu
                    }}

                  />
                </div>
              );
            })
          ) : (
            <LoadingComponent isLoading={isLoadingQues} />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
