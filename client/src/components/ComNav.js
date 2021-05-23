import React, { useState } from "react";
import Nav from "./Nav";
const ComNav = () => {
  
  const [state, setstate] = useState(null);
  const closeMobile = () => setstate(null)
  return (
    <>
      <nav className="comNav">
      <Nav closeMobile={closeMobile} />
      </nav>
    </>
  );
};

export default ComNav;
