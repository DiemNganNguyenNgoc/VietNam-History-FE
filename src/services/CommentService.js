import axios from "axios";
export const axiosJWT = axios.create();

export const addComment = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL_BACKEND}/comment/create-comment`,
    data
  );
  return res.data;
};

export const getAllComment = async (Quesid) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL_BACKEND}/comment/get-all-comment/${Quesid}`,
    
  );
  return res.data;
};

export const getDetailsComment = async (id) => {
  try {
    const res = await axiosJWT.get(
      `${process.env.REACT_APP_API_URL_BACKEND}/comment/get-detail-comment/${id}`
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

export const getCommentAns = async (AnsID) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/comment/${AnsID}`,
      );
      return res.data;
    
  };