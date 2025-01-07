import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import QuestionBoxAdmin from '../../components/QuestionBoxAdmin/QuestionBoxAdmin';
import QuestionFilter from '../../components/QuestionFilter/QuestionFilter';
import SortBtnAdmin from '../../components/SortBtnAdmin/SortBtnAdmin';
import * as QuestionService from "../../services/QuestionService";
import * as TagService from "../../services/TagService";
import * as UserService from "../../services/UserService";

const QuestionAdmin = () => {

  // Danh sách câu hỏi để filter
    const [filters, setFilters] = useState({
      no_answers: false,
      no_accepted_answer: false,
      tag: "",
      sort_by: "", // Lưu giá trị của "Sorted by"
      the_following_tags: false,
    });

  const [users, setUsers] = useState({});
  const [tags, setTags] = useState({});
  const [questions, setQuestions] = useState([]);
  const [filterOption, setFilterOption] = useState(null); // "New" hoặc "Popular"

  const navigate = useNavigate();

  const getAllQues = async () => {
    const res = await QuestionService.getAllQues();
    return res.data;
  };

  const {
    isLoading: isLoadingQues,
    data: fetchedQuestions,
    error,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: getAllQues,
  });

  const handleApplyFilters = (updatedFilters) => {
    console.log("Filters nhận được từ QuestionFilter:", updatedFilters);
    // Kiểm tra các trường hợp dữ liệu trống hoặc không hợp lệ

    if (!updatedFilters || typeof updatedFilters !== "object") {
      console.error("Filters không hợp lệ:", updatedFilters);
      return;
    }

    const safeFilters = {
      ...updatedFilters,
    };

    console.log("Filters đã áp dụng:", safeFilters);
    setFilters(safeFilters); // Cập nhật state với bộ lọc an toàn
  };

  const getFilteredQuestion = () => {
    let filteredQuestions = questions;

    // Sắp xếp theo "New" hoặc "Active"
    if (filterOption === "Newest") {
      filteredQuestions = filteredQuestions.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
    } else if (filterOption === "Reported") {
      filteredQuestions = filteredQuestions.sort(
        (a, b) => b.reportCount - a.reportCount
      );
    } else if (filterOption === "Unanswered") {
      filteredQuestions = filteredQuestions.filter(
        (question) => question.answerCount === 0
      ); // Chỉ hiển thị câu hỏi chưa có câu trả lời
    }

    // Lọc theo các filter
    if (filters.no_answers) {
      filteredQuestions = filteredQuestions.filter((q) => q.answerCount === 0);
    }

    if (filters.no_accepted_answer) {
      filteredQuestions = filteredQuestions.filter((q) => !q.acceptedAnswer);
    }

    if (filters.sort_by) {
      if (filters.sort_by === "newest") {
        filteredQuestions = filteredQuestions.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
      } else if (filters.sort_by === "recent_activity") {
        filteredQuestions = filteredQuestions.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
      } else if (filters.sort_by === "highest_score") {
        filteredQuestions = filteredQuestions.sort(
          (a, b) => b.upVoteCount - a.upVoteCount
        );
      } else if (filters.sort_by === "most_frequent") {
        filteredQuestions = filteredQuestions.sort(
          (a, b) => b.answerCount - a.answerCount
        );
      }
    }

    // Lọc theo tag
    if (filters.tag) {
      const searchTag = filters.tag?.trim().toLowerCase(); // Đảm bảo filters.tag hợp lệ
      filteredQuestions = filteredQuestions.filter((q) =>
        q.tags?.some((t) => {
          const tagName = tags[t]?.name || ""; // Giá trị mặc định
          return tagName.toLowerCase() === searchTag;
        })
      );
    }

    return filteredQuestions;
  };

  const getUserDetails = async (userId) => {
    if (!userId) return null;
    const res = await UserService.getDetailsUser(userId);
    return res.data;
  };

  const getTagDetails = async (tagId) => {
    const res = await TagService.getDetailsTag(tagId);
    return res.data;
  };

  useEffect(() => {
    const fetchUsersAndTags = async () => {
      const userMap = {};
      const tagMap = {};

      if (Array.isArray(fetchedQuestions)) {
        for (let question of fetchedQuestions) {
          if (question.userQues) {
            const user = await getUserDetails(question.userQues);
            userMap[question.userQues] = user;
          }
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
      setQuestions(fetchedQuestions);
    };

    if (fetchedQuestions) {
      fetchUsersAndTags();
    }
  }, [fetchedQuestions]);

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

  const handleQuestionClick = (questionId) => {
    navigate(`/admin/question-detail/${questionId}`);
  };

  const handleOnDelete = async (quesId, event) => {
    event.stopPropagation(); // Ngừng sự kiện lan truyền

    const isConfirmed = window.confirm("Are you sure you want to delete this question?");
    if (isConfirmed) {
      try {
        await QuestionService.deleteQuestion(quesId);
        setQuestions(questions.filter(question => question._id !== quesId));
        alert("Question deleted successfully!");
        navigate(-1);
      } catch (error) {
        console.error("Error deleting question: ", error);
        alert("Error deleting question.");
      }
    }
  };





  return (
    <div className="container">
      <h1 className='title'>MANAGEMENT QUESTIONS</h1>
      <p style={{ color: "#323538", marginTop: "10px", marginLeft: "20px", fontSize: "20px", fontWeight: "600" }}>
        {questions.length} questions
      </p>
      <br />
      <SortBtnAdmin setFilterOption={setFilterOption}/>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" }}>
        <QuestionFilter onApplyFilters={handleApplyFilters} />
      </div>
      {/* Render các câu hỏi */}
      <div style={{ marginTop: "20px" }}>
        {isLoadingQues ? (
          <LoadingComponent isLoading={isLoadingQues} />
        ) :
          Array.isArray(questions) && questions.length > 0 ? (
            getFilteredQuestion().map((question) => {
              const user = users[question.userQues];
              return (
                <div key={question._id} onClick={() => handleQuestionClick(question._id)}>
                  <QuestionBoxAdmin
                    img={user?.img || ""}
                    username={user?.name || "Unknown"}
                    reputation={user?.reputation || 0}
                    followers={user?.followerCount || 0}
                    title={question.title}
                    tags={question.tags ? question.tags.map(tagId => tags[tagId]?.name || tagId) : []}
                    date={new Date(question.updatedAt).toLocaleString()}
                    views={question.view}
                    answers={question.answerCount}
                    likes={question.upVoteCount}
                    onDelete={(event) => handleOnDelete(question._id, event)} // Truyền event vào handleOnDelete
                  />

                </div>
              );
            })
          ) : (
            <LoadingComponent isLoading={isLoadingQues} />
          )}
      </div>
    </div>
  );
};

export default QuestionAdmin;
