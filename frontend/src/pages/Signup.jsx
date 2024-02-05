import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userSignUp } from '../apis/api';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = async()=>{
    if(!email || !password){
      alert("Please provide both email and password");
      return;
    }
    let resp = await userSignUp({name,email,password});
    if(resp?.data?.result === 1){
      localStorage.setItem("token", resp?.data?.data?.token);
      localStorage.setItem("email", resp?.data?.data?.email); // we should use redux but for now i am saving in local storage
      navigate("/");

    }
    else{
      alert("something went wrong");
    }
  }


  return (
    <div className="w-full flex flex-col justify-center items-center mt-4">
      <div>
      <label htmlFor="name" className="mr-5">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-slate-300 bg-slate-100 mb-3 px-2"
      />
    </div>
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
      <button onClick={onSignup} className="bg-black text-white px-7 py-1">Signup</button>
    </div>
  </div>
  )
}

export default Signup