import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login } from "../../api/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.data.status === 200) {
      localStorage.setItem("token", res.data.token);
      navigate(`/home/${email}/dashboard`);
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-head">Login</div>
        <div className="auth-body">
          <form onSubmit={handleSubmit}>
            <div style={{ height: "35px" }}></div>
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
            <input type="submit" value={"Login"}></input>
            <Link to="/signup">
              <input
                type="button"
                value={"Dont have an account? Signup"}
              ></input>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
