import axios from "axios"

export const axiosJWT = axios.create()

export const addTag = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/tag/create`, data)
  return res.data
}

export const getAllTag = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/tag/get-all`);
    console.log('Raw getAllTag response:', res);
    
    // If response is an array directly, return it
    if (Array.isArray(res.data)) {
      return res.data;
    } 
    // If response has a data property with an array
    else if (res.data && res.data.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    // If normal structure with status and data (default case)
    else if (res.data && res.data.status === "OK") {
      return res.data;
    }
    // Just return whatever we got
    return res.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error; 
  }
};


export const getAllTagByUser = async (userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/tag/get-all?userTag=${userId}`);
    return response;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};


export const getDetailsTag = async (tagId) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/tag/get-detail-tag/${tagId}`);
    console.log('Tag data for ID', tagId, ':', res.data);
    
    // If response has the expected structure
    if (res.data && res.data.status === "OK" && res.data.data) {
      return res.data; 
    }
    return res.data;
  } catch (error) {
    console.error(`Error fetching tag ${tagId}:`, error);
    return null;
  }
};

export const deleteTag = async (tagId) => {
  const res = await axios.delete(`${process.env.REACT_APP_API_URL_BACKEND}/tag/delete/${tagId}`
  );
  return res.data;
};

export const updateTag = async (tagId, data) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL_BACKEND}/tag/update/${tagId}`,
    data
  );
  return res.data;
};


