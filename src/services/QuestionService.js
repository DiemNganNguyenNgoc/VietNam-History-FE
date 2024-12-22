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
