import axios from 'axios';


const api = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL,
  headers: {
    'token': localStorage.getItem("token") 
  }
});

export const updateLastLogin = async()=>{
    try {
        let resp = await api.get("/");
        console.log(resp?.data);
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async()=>{
    try {
        let resp = await api.get("/user/allUsers");
        return resp;
    } catch (error) {
        console.log(error);
    }
}

export const verifyToken = async(token)=>{
    try {
        let resp = await api.post("/user/verifyToken", {token});
        return resp;
    } catch (error) {
        console.log(error);
    }
}

export const userLogin = async (data)=>{
    try {
        let resp = await api.post("user/login", data);
        console.log("login data", resp);
        return resp;
    } catch (error) {
        console.log(error);
    }
}

export const userSignUp = async (data)=>{
    try {
        let resp = await api.post("user/userRegister", data);
        return resp;
    } catch (error) {
        console.log(error);
    }
}

export const updateCart = async (data)=>{
    try {
        let resp = await api.post("/cart/makePayment", {email:data});
        return resp;
    } catch (error) {
        console.log(error);
    }
}

