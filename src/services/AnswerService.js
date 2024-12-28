import axios from "axios";

// Thêm câu trả lời
export const addAns = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/answer/create-answer`, data);
    return res.data;
};

// Lấy tất cả câu trả lời theo ID câu hỏi
export const getAllAns = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/answer/get-all/${id}`);
    return res.data;
};

// Lấy câu trả lời theo ID câu hỏi
export const getAnswersByQuestionId = async (questionId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/answer/get-by-question/${questionId}`);
    return res.data;
};

// Lấy câu trả lời theo ID câu hỏi
export const getAnswersByQuestionIdAdmin = async (questionId) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/answer/admin/get-by-question/${questionId}`);
    return res.data;
};

export const updateAnswerStatus = async (answerId, isActive) => {
    return await axios.put(`${process.env.REACT_APP_API_URL_BACKEND}/answer/toggle-active/${answerId}`,{ active: isActive });
  };
  