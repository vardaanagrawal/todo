import React, { useEffect, useState } from "react";
import "./profile.css";
import { getInfo, updatePassword } from "../../api/api";
import jwtDecode from "jwt-decode";
import { updateUserName, deleteAccount } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const tokenEmail = decodedToken.email;

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [name2, setName2] = useState("");
  const [email2, setEmail2] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userNameUpdate, setUserNameUpdate] = useState(false);

  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    const res = await getInfo(tokenEmail);
    setName(res.data.name);
    setEmail(res.data.email);
    setName2(res.data.name);
    setEmail2(res.data.email);
    setId(res.data._id);
  }
  const handleUpdatePassword = async () => {
    if (curPassword && newPassword) {
      const res = await updatePassword(email, curPassword, newPassword);
      alert(res.data.message);
    }
  };

  const enableUserNameUpdate = () => {
    setUserNameUpdate(true);
    document.querySelector(".user-name-input").readOnly = false;
  };

  const handleUserNameUpdate = async () => {
    setUserNameUpdate(false);
    document.querySelector(".user-name-input").readOnly = true;
    const res = await updateUserName(email, name);
    alert(res.data.message);
    setName2(name);
  };

  const handleAccountDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      const res = await deleteAccount(id,email);
      alert(res.data);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="profile">
      <div className="profile-box">
        <div style={{display: "flex",justifyContent: "space-between"}}>
        <div className="user-name-label">Name:</div>
        <input
          type="text"
          className="user-name-input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          readOnly={true}
        ></input>
        </div>
        {!userNameUpdate && (
          <button
            className="user-name-update"
            onClick={enableUserNameUpdate}
            style={{
              backgroundColor: "rgb(139, 78, 251)",
              border: "solid 3px rgb(139, 78, 251)",
              color: "white",
              fontSize: "large",
              borderRadius: "5px",
              height: "35px"
            }}
          >
            <i className="fa-solid fa-pen"></i>
          </button>
        )}
        {userNameUpdate && (
          <div className="user-name-update">
            <button
              onClick={handleUserNameUpdate}
              style={{
                height: "35px",
                width: "45%",
                backgroundColor: "rgb(139, 78, 251)",
                border: "solid 3px rgb(139, 78, 251)",
                color: "white",
                fontSize: "large",
                borderRadius: "5px",
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                setUserNameUpdate(false);
                document.querySelector(".user-name-input").readOnly = true;
              }}
              style={{
                height: "100%",
                width: "45%",
                backgroundColor: "white",
                border: "solid 3px rgb(139, 78, 251)",
                color: "rgb(139, 78, 251)",
                fontSize: "large",
                borderRadius: "5px",
                marginLeft: "10%",
              }}
            >
              Cancel
            </button>
          </div>
        )}
        <div style={{display: "flex", justifyContent: "space-between", margin: "10px 0px"}}>
        <div className="user-email-label">Email:</div>
        <input
          type="email"
          className="user-email-input"
          value={email}
          readOnly
        ></input>
        </div>

        <button
          onClick={() => {
            setChangingPassword(true);
          }}
          className="change-password-btn"
        >
          Change Password
        </button>
        {changingPassword && (
          <input
            type="text"
            placeholder="Current Password"
            className="current-password-input"
            value={curPassword}
            onChange={(e) => {
              setCurPassword(e.target.value);
            }}
          ></input>
        )}
        {changingPassword && (
          <input
            type="text"
            placeholder="New Password"
            className="new-password-input"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          ></input>
        )}
        {changingPassword && (
          <div className="password-cancel-btn">
            <button
              onClick={handleUpdatePassword}
              style={{
                height: "35px",
                width: "45%",
                backgroundColor: "rgb(139, 78, 251)",
                border: "solid 3px rgb(139, 78, 251)",
                color: "white",
                fontSize: "large",
                borderRadius: "5px",
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                setChangingPassword(false);
              }}
              style={{
                height: "35px",
                width: "45%",
                backgroundColor: "white",
                border: "solid 3px rgb(139, 78, 251)",
                color: "rgb(139, 78, 251)",
                fontSize: "large",
                borderRadius: "5px",
                marginLeft: "10%",
              }}
            >
              Cancel
            </button>
          </div>
        )}
        <button
          className="dlt-account-btn"
          onClick={handleAccountDelete}
          style={{
            backgroundColor: "red",
            border: "solid 3px red",
            color: "white",
            fontSize: "large",
            borderRadius: "5px",
            marginLeft: "10%",
            position: "absolute",
            bottom: "20px",
            right: "20px",
            height: "35px",
            width: "calc(100% - 40px)",
          }}
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
}
