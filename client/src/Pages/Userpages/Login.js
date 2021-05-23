import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../../App";
import Logpic from "../../Pictures/log.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { getInfo } = useContext(UserContext);
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const formSub = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.warning("Please Fill all the fields");
      } else {
        const res = await axios.post("/user/login", { email, password });
        if (res) {
          alert("Login Successfull");
          history.push("/notes");
          getInfo();
        }
      }
    } catch (error) {
      console.log(error);
      toast.warning("Invalid Credentials");
    }
  };

  return (
    <>
      <div className="note_container">
        <div className="note_box">
          <div className="picDiv">
            <figure>
              <img
                src={Logpic}
                alt="Loginpic"
                className="loginPic picAnimation"
              />
            </figure>
          </div>
          <div className="formDiv">
            <h1 className="logHead">Sign In</h1>
            <form className="logForm" onSubmit={formSub}>
              <input
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="text"
              />
              <input
                placeholder="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type="password"
              />
              <div className="buttonDiv">
                <button type="submit">Login</button>
              </div>
            </form>
            <h4>Don't have an Account ? </h4>
            <Link to="/register">
              <p>Click here to Register</p>
            </Link>
          </div>
        </div>
        <ToastContainer autoClose={2500} position="top-center"/>
      </div>
    </>
  );
};

export default Login;
