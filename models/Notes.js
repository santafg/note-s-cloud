const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    details:{
        type:String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

const Note = new mongoose.model("Note" , noteSchema);

module.exports = Note;