import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Notes = () => {
  const [notes, setnotes] = useState([]);

  const getNotes = async () => {
    try {
      const res = await axios.get("/note/get");
      setnotes(res.data.notes.reverse());
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/note/delete/${id}`);
      getNotes();
      
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <div className="notesContainer">
        <div className="noteHead">
          <h1>My Notes</h1>
          <Link to="/addnotes">
            <button className="addButton">Add a note</button>
          </Link>
        </div>

        {notes.length === 0 ? (
          <div className="noNotes" >
            <h1>No Notes are added till Now </h1>
            <h2>Please Click on <span>Add a note </span> to create your first note !</h2>
          </div>
        ) : (
          <div className="notesDiv">
            {notes.map((note) => {
              return (
                <div className="anote" key={note._id}>
                  <h1>{note.title}</h1>
                  <p>{note.details}</p>
                  <div className="noteBtns">
                    <Link to={`note/view/${note._id}`}>
                      <button className="view">
                        <FaEye />
                      </button>
                    </Link>
                    <Link to={`note/edit/${note._id}`}>
                      <button className="edit">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      className="delete"
                      onClick={() => deleteNote(note._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
