import axios from "axios"
export const loginUser = async(email:string,password:string)=>{
    const res = await axios.post("/user/signin",{email, password})
    if(res.status!=200) throw new Error("Unable to login")
    const data = res.data
    return data
}

export const signupUser = async(name:string, email:string,password:string)=>{
    const res = await axios.post("/user/signup",{name, email, password})
    if(res.status!==201) throw new Error("Unable to Signup")
    const data = res.data
    return data
}

export const checkAuthStatus = async()=>{
    const res = await axios.get("/user/auth-status")
    if(res.status!==200) return { message : 'notFound' }
    const data = await res.data
    return data
}

export const sendChatRequest = async(message:string)=>{
    const res = await axios.post("/chats/new", {message})
    if(res.status!==200) throw new Error("Unable to send chat")
    const data =await res.data
    return data
}

export const getUserChats = async()=>{
    const res = await axios.get("/chats/all-chats")
    if(res.status!==200) throw new Error("Unable to fetch chats")
    const data = await res.data
    return data
}

export const deleteChats = async()=>{
    const res = await axios.delete("/chats/delete")
    if(res.status!==200) throw new Error("Unable to delete chats")
    const data = await res.data
    return data
}

export const logoutUser = async()=>{
    const res = await axios.get("/user/logout")
    if(res.status!==200) throw new Error("Unable to logout")
    const data = await res.data
    return data
}