import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

import {FiUploadCloud } from "react-icons/fi";
// import Logo from "../Pictures/logo.png";

const Nav = (props) => {
  const { state } = useContext(UserContext);
  return (
    <>
      <div className="ul">
        <NavLink onClick={()=>props.closeMobile()} className="links home" exact to="/">
          <figure>
            <h1>Note's</h1>
            <FiUploadCloud/>
          </figure>
        </NavLink>
        <div className='switch'>
          {!state && (
            <>
              <NavLink onClick={()=>props.closeMobile()} className="links" to="/login">
                Sign in
              </NavLink>
              <NavLink onClick={()=>props.closeMobile()} className="links" to="/register">
                Sign up
              </NavLink>
            </>
          )}
          {state && (
            <>
              <NavLink onClick={()=>props.closeMobile()} className="links" to="/notes">
                Notes
              </NavLink>
              <NavLink onClick={()=>props.closeMobile()} className="links" to="/profile">
                Profile
              </NavLink>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
