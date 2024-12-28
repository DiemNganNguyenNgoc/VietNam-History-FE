import axios from "axios"

export const axiosJWT = axios.create()

export const addTag = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/tag/create`, data)
  return res.data
}

export const getAllTag = async (data) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/tag/get-all`, data)
  return res
}

// export const getAllTagByUser = async (userId) => {
//   const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/tag/get-all?userTag=${userId}`)
//   return res.data
// }

// Giả sử trong services/TagService.js
export const getAllTagByUser = async (userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/tag/get-all?userTag=${userId}`);
    return response; // Phải trả về đối tượng có thuộc tính 'data'
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};


export const getDetailsTag = async (tagId) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/tag/get-detail-tag/${tagId}`
  );
  return res.data;
};

export const deleteTag = async (tagId) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_URL_BACKEND}/tag/delete/${tagId}`
  );
  return res.data;
};



// export const getDetailsTag = async (tagId) => {
//   try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL_BACKEND}/tag/get-detail-tag/${tagId}`); // Đường dẫn API
//       if (!response.ok) {
//           throw new Error('Failed to fetch tag details');
//       }
//       const data = await response.json();
//       return data;
//   } catch (error) {
//       console.error('Error in getDetailsTag:', error);
//       throw error;
//   }
// };
