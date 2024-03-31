import axios from "axios"
export const loginUser = async(email:string,password:string)=>{
    const res = await axios.post("/user/signin",{email, password})
    if(res.status!=200) throw new Error("Unable to login")
    const data = res.data
    return data
}

export const checkAuthStatus = async()=>{
    const res = await axios.get("/user/auth-status")
    if(res.status!=200) throw new Error("Unable to authenticate")
    const data = res.data
    return data
}