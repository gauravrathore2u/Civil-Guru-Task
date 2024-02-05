import React, { useState } from "react";
import { userLogin } from "../apis/api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = async () => {
    if(!email || !password){
      alert("Please provide both email and password");
      return;
    }
    let resp = await userLogin({email,password});
    if(resp?.data?.result === 1){
      localStorage.setItem("token", resp?.data?.data?.token);
      localStorage.setItem("email", resp?.data?.data?.email);   // we should use redux but for now i am saving in local storage
      navigate("/");

    }
    else if(resp?.data?.result === -1){
      alert("Emil or password is wrong");
    }
    else{
      alert("something went wrong");
    }

  };
  return (
    <div className="w-full flex flex-col justify-center items-center mt-4">
      <div>
        <label htmlFor="email" className="mr-5">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-slate-300 bg-slate-100 mb-3 px-2"
        />
      </div>
      <div>
        <label htmlFor="password" className="mr-5">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-slate-300 bg-slate-100 mb-4 px-2"
        />
      </div>
      <div>
        <button onClick={onLogin} className="bg-black text-white px-7 py-1">Login</button>
      </div>
      <div>
        <p>Not Registered <Link to="/signup" className="text-blue-500">Signup</Link></p>
      </div>
    </div>
  );
};

export default Login;
