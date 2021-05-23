import React from "react";
import ComNav from "./ComNav";
import MobileNav from "./MobileNav";

const NavBar = () => {
  return (
    <>
      <div className="navBar">
        <ComNav />
        <MobileNav />
      </div>
    </>
  );
};

export default NavBar;
