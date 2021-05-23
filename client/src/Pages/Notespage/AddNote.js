import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { FaHandPointDown } from 'react-icons/fa';

const AddNote = () => {
  const history = useHistory();
  const [title, settitle] = useState("");
  const [details, setdetails] = useState("");

  const formSub = async (e) => {
    e.preventDefault();
    try {
      if (!title || !details) {
        alert("Fill all the fields");
      } else {
        const res = await axios.post("/note/add", { title, details });
        if (res) {
          alert("Note Added");
          history.push("/notes");
        } else {
          window.alert("Some error occured ");
        }
      }
      
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <div className="addNoteContainer">
        <div className="addNoteBox">
          <h1>Add a note</h1>
          <form onSubmit={formSub}>
            <input
              value={title}
              placeholder='Title of the Note'
              onChange={(e) => settitle(e.target.value)}
              type="text"
            />
            <h1>Write your note here</h1>
            <FaHandPointDown className='hand'/>
            <textarea
              value={details}
              onChange={(e) => setdetails(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddNote;
