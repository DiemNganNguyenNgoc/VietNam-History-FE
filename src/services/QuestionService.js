import axios from "axios"

export const addQues=async(data)=>{
    const res =await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/question/create-queston`, data)
    return res.data
}

export const getAllQues=async(data)=>{
    const res =await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/tag/get-all`, data)
    return res.data
}
