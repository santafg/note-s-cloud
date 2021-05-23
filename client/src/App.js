import React, { createContext, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./Pages/Userpages/Home";
import Login from "./Pages/Userpages/Login";
import Register from "./Pages/Userpages/Register";
import Notes from "./Pages/Userpages/Notes";
import Profile from "./Pages/Userpages/Profile";
import Update from "./Pages/Userpages/Update";
import AddNote from "./Pages/Notespage/AddNote";
import EditNote from "./Pages/Notespage/EditNote";
import ViewNote from "./Pages/Notespage/ViewNote";
import Test from "./Pages/Notespage/Test";
import axios from "axios";

import './App.css'



export const UserContext = createContext();

const App = () => {
  const [state, setstate] = useState(null);

  const getInfo = async () => {
    const res = await axios.get("/user/loggedIn");
    setstate(res.data);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
    <div className='pageContainer'>
      <div className="content-warp">
      <UserContext.Provider value={{ state, getInfo }}>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/notes" component={Notes} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/profile/update" component={Update} />
          <Route exact path="/note/view/:id" component={ViewNote} />
          <Route exact path="/note/edit/:id" component={EditNote} />
          <Route exact path="/edit/:id" component={EditNote} />
          <Route exact path="/addnotes" component={AddNote} />
          <Route path="*" component={Test} />
        </Switch>
      </UserContext.Provider>
      </div>
        <Footer/>
      </div>
    </>
  );
};

export default App;
