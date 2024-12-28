import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllSaved } from "../../redux/slides/savedSlide";
import QuestionBox from "../../components/QuestionBox/QuestionBox";
import * as UserService from "../../services/UserService";
import * as QuestionService from "../../services/QuestionService";
import * as SavedService from "../../services/SavedService";

const SavedPage = () => {
  const dispatch = useDispatch();
  const allSaved = useSelector((state) => state.saved.allSaved);
  const [enrichedSavedData, setEnrichedSavedData] = useState([]);

  // Hàm lấy thông tin người dùng
  const getUserDetails = async (userId) => {
    if (!userId) return null;
    const res = await UserService.getDetailsUser(userId);
    return res.data;
  };

  // Hàm lấy thông tin câu hỏi
  const getQuestionDetails = async (questionId) => {
    if (!questionId) return null;
    const res = await QuestionService.getDetailsQuestion(questionId);
    return res.data;
  };

  // Hàm kết hợp dữ liệu từ allSaved
  const fetchSavedDetails = async (savedList) => {
    const enrichedData = await Promise.all(
      savedList.map(async (saved) => {
        const user = await getUserDetails(saved.user); // Lấy thông tin người dùng
        const question = await getQuestionDetails(saved.question); // Lấy thông tin câu hỏi

        return {
          ...saved,
          user,
          question,
        };
      })
    );
    return enrichedData;
  };

  // Hàm xử lý bỏ lưu câu hỏi (Unsave)
  const handleUnsave = async (savedId) => {
    try {
      // Gửi yêu cầu xóa bài lưu
      await SavedService.deleteSaved(savedId);

      // Cập nhật danh sách bài lưu trong Redux và local state
      const updatedSavedList = enrichedSavedData.filter(
        (saved) => saved._id !== savedId
      );
      setEnrichedSavedData(updatedSavedList);

      // Lưu vào Redux
      const savedIds = updatedSavedList.map((saved) => ({
        question: saved.question._id,
        user: saved.user._id,
      }));
      dispatch(setAllSaved(savedIds));

      // Đồng bộ với localStorage
      localStorage.setItem("allSaved", JSON.stringify(savedIds));
    } catch (error) {
      console.error("Error unsaving question:", error);
    }
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("allSaved")) || [];
    dispatch(setAllSaved(savedData)); // Đồng bộ từ localStorage

    const fetchData = async () => {
      const enrichedData = await fetchSavedDetails(savedData); // Lấy thông tin chi tiết
      setEnrichedSavedData(enrichedData);
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Saved Questions</h1>
      {enrichedSavedData.length > 0 ? (
        enrichedSavedData.map((saved) => (
          <QuestionBox
            key={saved._id}
            id={saved.question._id}
            img={saved.question.img}
            username={saved.user.username}
            reputation={saved.user.reputation}
            followers={saved.user.followers}
            title={saved.question.title}
            tags={saved.question.tags}
            date={saved.createdAt}
            views={saved.question.views}
            answers={saved.question.answers}
            likes={saved.question.upVoteCount}
            isSaved={true}
            onUnsave={() => handleUnsave(saved._id)} // Gọi handleUnsave
          />
        ))
      ) : (
        <p>No saved questions yet.</p>
      )}
    </div>
  );
};

export default SavedPage;
