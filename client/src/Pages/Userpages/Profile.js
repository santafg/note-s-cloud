import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../App";

const Profile = () => {
  const { getInfo } = useContext(UserContext);
  const history = useHistory();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const getUser = async () => {
    try {
      const theUser = await axios.get("/user/get");
      setname(theUser.data.name);
      setemail(theUser.data.email);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const signOut = async () => {
    try {
      await axios.get("/user/logout");
      history.push("/login");
      getInfo();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="profileContainer">
        <div className="profileBox">
          <div className="profileHeader">
            <h1>
              <FaUserCircle />
            </h1>
            <div className="userBtns">
              <Link to="/profile/update">
                <button>Update Account</button>
              </Link>

              <button onClick={signOut}>Signout</button>
            </div>
          </div>
          <div className="userDetails">
            <h3>Name : {name}</h3>
            <h5>Email : {email}</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
