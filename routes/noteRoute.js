const express = require("express");

const router = new express.Router();
const User = require("../models/User");
const Note = require("../models/Notes");
const auth = require("../middlewares/auth");

var cookieParser = require("cookie-parser");

router.use(cookieParser());

// creating a note

router.post("/add", auth, async (req, res) => {
  try {
    // find the user
    const _id = req.user;
    const theuser = await User.findById(_id);
    // create note
    const note = new Note(req.body);
    const creatednote = await note.save();
    // add the note to the user
    theuser.notes.push(creatednote);
    await theuser.save();
    res.status(201).json({ msg: "Note created" });
  } catch (error) {
    console.log(error);
    res.status(501).json({ msg: "Failed to create Note " });
  }
});

// get all notes
router.get("/get", auth, async (req, res) => {
  try {
    // get the user and populate the notes
    const _id = req.user;
    const userwithmsgs = await User.findById(_id).populate("notes");
    res.status(200).json(userwithmsgs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to get Notes" });
  }
});
// get a note
router.get("/get/:id", auth, async (req, res) => {
  try {
    const note_id = req.params.id;
    const note = await Note.findById({_id : note_id});
    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to get Note" });
  }
});
router.patch("/update/:id", auth, async (req, res) => {
  try {
    const note_id = req.params.id;
    const note = await Note.findByIdAndUpdate({_id : note_id} , req.body , {new : true});
    res.status(200).json(note);
  } catch (error) {
    console.log(error);
    res.status(501).json({ msg: "Failed to update Note" });
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const note_id = req.params.id;
    const note = await Note.findByIdAndDelete({_id : note_id});
    res.status(200).json({ msg: "Note deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed to delete Note" });
  }
});

module.exports = router;
