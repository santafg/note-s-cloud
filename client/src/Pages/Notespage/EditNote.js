import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { FaHandPointDown } from 'react-icons/fa';

const EditNote = () => {
  const { id } = useParams();
  const history = useHistory();
  const [title, settitle] = useState("");
  const [details, setdetails] = useState("");

  const formSub = async (e) => {
    e.preventDefault();
    try {
      if (!title || !details) {
        alert("Fill all the fields");
      } else {
        const res = await axios.patch(`/note/update/${id}`, { title, details });
  
        if (res) {
          alert("Note Updated");
          history.push("/notes");
        } else {
          window.alert("Some error occured ");
        }
      }
      
    } catch (error) {
      console.log(error);
    }

  };

  const getNote = async () => {
    try {
      const note = await axios.get(`/note/get/${id}`);
      settitle(note.data.title);
      setdetails(note.data.details);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNote();
  }, []);

  return (
    <>
    <div className="addNoteContainer">
        <div className="addNoteBox">
      <h1>Edit The Note</h1>
      <form onSubmit={formSub}>
        <input
              placeholder='Title of the Note'
          value={title}
          onChange={(e) => settitle(e.target.value)}
          type="text"
        />
        <h2>Edit your note here</h2>
            <FaHandPointDown className='hand'/>
        <textarea
          placeholder="Write your note"
          value={details}
          onChange={(e) => setdetails(e.target.value)}
          cols="30"
          rows="10"
        ></textarea>
        <button type="submit">Save Changes</button>
      </form>
      </div>
      </div>
    </>
  );
};

export default EditNote;
