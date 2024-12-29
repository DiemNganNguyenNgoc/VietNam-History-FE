import axios from "axios";
export const axiosJWT = axios.create();

export const addQues = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/question/create-question`,
    data
  );
  return res.data;
};

export const getAllQues = async (data) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/question/get-all-question`,
    data
  );
  return res.data;
};

export const getAllQuesByTag = async (tagId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/question/get-all-question?tag=${tagId}`);
  return res.data;
};

export const toggleActiceQues = async (quesId) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/question/toggle-active/${quesId}`);
  return res.data;
};

export const getDetailsQuestion = async (id) => {
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/question/get-detail-question/${id}`
    );
    return res.data;
  } catch (error) {
    if (error.response) {
      throw {
        // status: error.response.data?.status || "ERR",
        message: error.response.data?.message || "Đã xảy ra lỗi.",
      };
    } else {
      throw { status: 500, message: "Không thể kết nối đến máy chủ." };
    }
  }
};

export const updateQuestion = async (id, data) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/question/update-question/${id}`, data
  );
  return res.data;
};

export const deleteQuestion = async (quesId) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL_BACKEND}/question/delete-question/${quesId}`);
  return res.data;
};



export const getQuestionsByUserId = async (userId) => {
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/question/user/${userId}`
    );
    return res.data;
  } catch (error) {
    if (error.response) {
      throw {
        message: error.response.data?.message || "Đã xảy ra lỗi.",
      };
    } else {
      throw { status: 500, message: "Không thể kết nối đến máy chủ." };
    }
  }
};

export const updateAnswerCount = async (questionId, newAnswerCount) => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL_BACKEND}/question/update-answer-count/${questionId}`, {
    answerCount: newAnswerCount,
  });
  console.log("ID")
  return response.data;
};

export const getStatisticQuestion = async (userQues, year, month) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/question/get-by-statistic?userQues=${userQues}&&year=${year}&&month=${month}`);
  return response.data;
};


// export const updateAnswerCount = async (id, data) => {
//   try {
//     const res = await axiosJWT.put(
//       `${process.env.REACT_APP_API_URL_BACKEND}/user/update-answercount/${id}`,
//       data,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           //token: `Bearer ${access_token}`,
//         },
//       }
//     );
//     return res.data; // Trả dữ liệu nếu thành công
//   } catch (error) {
//     // Nếu API trả về lỗi, ném lỗi với thông tin chi tiết
//     if (error.response) {
//       // API trả về response
//       throw {
//         // status: error.response.data?.status || "ERR",
//         message: error.response.data?.message || "Đã xảy ra lỗi.",
//       };
//     } else {
//       // Lỗi không có response (ví dụ lỗi mạng)
//       throw { status: 500, message: "Không thể kết nối đến máy chủ." };
//     }
//   }
// };

