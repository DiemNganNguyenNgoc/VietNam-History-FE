import axios from "axios"

export const addAns=async(data)=>{
    const res =await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/answer/create-answer`, data)
    return res.data
}

export const getAllAns=async(id)=>{
    const res =await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/answer/get-all/${id}`)
    return res.data
}


