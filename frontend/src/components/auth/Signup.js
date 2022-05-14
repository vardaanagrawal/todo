import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { signup, login } from "../../api/api";


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(name, email, password);
    console.log(res);
    if (res.data.status === 200) {
      const loginres = await login(email, password);
      localStorage.setItem("token",loginres.data.token);
      navigate(`/home/${email}/dashboard`)
    }
    else{
      alert(res.data.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-head">Sign Up</div>
        <div className="auth-body">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            ></input>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            ></input>
            <input type="submit" value={"Signup"}></input>
            <Link to="/login">
              <input type="button" value={"Already a User? Login"}></input>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
