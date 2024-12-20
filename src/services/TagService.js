import axios from "axios"

export const addTag=async(data)=>{
    const res =await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/tag/create`, data)
    return res.data
}

export const getAllTag = async(data)=>{
    const res =await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/tag/get-all`, data)
    return res.data
}


export const getDetailsTag = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/tag/get-detail-tag/${id}`
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