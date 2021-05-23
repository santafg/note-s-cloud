import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams ,useHistory ,Link } from "react-router-dom";
import {  FaEdit , FaTrash } from 'react-icons/fa';

const ViewNote = () => {
  const history = useHistory();
  const { id } = useParams();
  console.log(id);
  const [title, settitle] = useState("");
  const [details, setdetails] = useState("");

  const getNote = async () => {
    try {
      const note = await axios.get(`/note/get/${id}`);
      console.log(note);
      settitle(note.data.title);
      setdetails(note.data.details);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNote();
  }, []);
  const deleteNote = async () => {
    try {
      await axios.delete(`/note/delete/${id}`);
      alert("Note Deleted")
      history.push('/notes')
      
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <div className="viewNoteContainer">
        <div className="viewNoteBox">
          <h1>{title}</h1>
          <p>{details}</p>
          <div className="noteBtns">
            <Link to={`/edit/${id}`}>
              <button className="edit">
                <FaEdit />
              </button>
            </Link>
            <button className="delete" onClick={() => deleteNote()}>
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewNote;
