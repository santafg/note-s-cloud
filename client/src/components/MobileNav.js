import React, { useState } from "react";
import Nav from "./Nav";
import { FaBars } from "react-icons/fa";

import { FiUploadCloud } from "react-icons/fi";
import { Link } from "react-router-dom";

const MobileNav = () => {
  const [state, setstate] = useState(false);
  const closeMobile = () => setstate(false);
  return (
    <>
      <nav className="mobileNav">
        <FaBars className="bar" onClick={() => setstate(!state)} />
        <div className="mnav">
          <Link to="/">
            <figure>
              <h1>Note's</h1>
              <FiUploadCloud />
            </figure>
          </Link>
        </div>
        {state && <Nav closeMobile={closeMobile} />}
      </nav>
    </>
  );
};

export default MobileNav;
