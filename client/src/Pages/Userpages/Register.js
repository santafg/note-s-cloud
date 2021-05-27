import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import Regpic from "../../Pictures/reg.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const history = useHistory();
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const userInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setuser({
      ...user,
      [name]: value,
    });
  };

  const fromSubmit = async (e) => {
    e.preventDefault();

    try {
      const { name, email, password, cpassword } = user;
      if (!name || !email || !password || !cpassword) {
        toast.warning("Please Fill all the fields");
      } else {
        if (password !== cpassword) {
          toast.warning("Paswords are not matching");
        } else {
          const res = await axios.post("/user/register", user);
          alert(res.data);
          history.push("/login");
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="regNoteContainer">
        <div className="regNoteBox">
          <div className="picDiv">
            <figure>
              <img
                src={Regpic}
                alt="Loginpic"
                className="regPic picAnimation1"
              />
            </figure>
          </div>

          <div className="formDiv">
            <h1 className='regHead'>Signup</h1>
            <form className="regForm" onSubmit={fromSubmit}>
              <input
                type="text"
                onChange={userInput}
                placeholder="name"
                value={user.name}
                name="name"
              />
              <input
                type="email"
                onChange={userInput}
                placeholder="example@gmail.com"
                value={user.email}
                name="email"
              />
              <input
                type="password"
                onChange={userInput}
                placeholder="password"
                value={user.password}
                name="password"
              />
              <input
                type="password"
                onChange={userInput}
                placeholder="confirm password"
                value={user.cpassword}
                name="cpassword"
              />
              <div className="buttonDiv">
                <button type="submit">Register</button>
              </div>
            </form>
            <h4>Already Registered ! </h4>
            <Link to="/login">
              <p>Click here to Login</p>
            </Link>
          </div>
        </div>
        <ToastContainer autoClose={2500} position="top-center"/>
      </div>
    </>
  );
};

export default Register;
