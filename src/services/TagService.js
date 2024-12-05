import axios from "axios"

export const addTag=async(data)=>{
    const res =await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/tag/create`, data)
    return res.data
}
