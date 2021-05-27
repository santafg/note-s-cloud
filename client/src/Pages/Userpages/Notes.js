import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notes = () => {
  const [search, setsearch] = useState("");
  const [searhResult, setsearhResult] = useState([]);
  const [notes, setnotes] = useState([]);

  const getNotes = async () => {
    try {
      const res = await axios.get("/note/get");
      setnotes(res.data.notes.reverse());
      setsearhResult(res.data.notes.reverse());
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
      toast.error("Note deleted");
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = () => {
    if (search !== "") {
      const newNotesList = notes.filter((note) => {
        return Object.values(note)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setsearhResult(newNotesList);
    } else {
      setsearhResult(notes);
    }
  };
  useEffect(() => {
    searchHandler();
  }, [search]);

  return (
    <>
      <div className="notesContainer">
        <ToastContainer autoClose={2000} position="top-center"/>
        <div className="noteHead">
          <h1>My Notes</h1>
          <div className="noteActions">
            <div className="searchInput">
              <input
                type="text"
                placeholder="search a note..."
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              <FaSearch className='searchIcon' />
            </div>
            <Link to="/addnotes">
              <button className="addButton">Add a note</button>
            </Link>
            <Link to="/addnotes">
              <BsFillPlusCircleFill className='addButtonMobile'/>
            </Link>
          </div>
        </div>

        {searhResult.length === 0 ? (
          <div className="noNotes">
            <h1>No notes are added till Now </h1>
            <h2>
              Please Click on <span>Add button </span> to create your first note
              !
            </h2>
          </div>
        ) : (
          <div className="notesDiv">
            {searhResult.map((note) => {
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
