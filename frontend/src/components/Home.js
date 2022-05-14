import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";

export default function Home() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded_token = jwtDecode(token);
      const urlEmail = window.location.pathname.split("/")[2];
      const tokenEmail = decoded_token.email;
      if (urlEmail === tokenEmail) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    }
  }, []);

  return (
    <div>
      {auth && (
        <div>
          <Navbar />
          <Outlet />
        </div>
      )}
      {!auth && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            fontSize: "xx-large",
            fontWeight: "700",
          }}
        >
          Please{" "}
          <Link
            to="/login"
            style={{ textDecoration: "none", marginLeft: "10px" }}
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
}
