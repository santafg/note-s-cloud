import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Update = () => {
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
        alert("Fill all the fields");
      } else {
        if (password !== cpassword) {
          alert("Paswords are not matching");
        } else {
          await axios.patch("/user/update", user);
          alert("Updated Succesfully");
          history.push("/profile");
        }
      }
    } catch (error) {
      alert("Some error occurd");
    }
  };

  const getUser = async () => {
    try {
      const theuser = await axios.get(`/user/get`);
      console.log(theuser);
      const { name, email } = theuser.data;
      setuser({ name, email });
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="updateUserContainer">
        <div className="formDiv">
            <h1>Update Details</h1>
          

          <form onSubmit={fromSubmit}>
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
              placeholder="new password / same password"
              value={user.password}
              name="password"
            />
            <input
              type="cpassword"
              onChange={userInput}
              placeholder="confirm password"
              value={user.cpassword}
              name="cpassword"
            />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Update;
