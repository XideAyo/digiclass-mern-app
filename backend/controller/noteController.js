const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler")

const getNotes = asyncHandler(async(req, res) => {
    const notes = await Note.find({user: req.user._id})

    res.json(notes)
})

const createNote = asyncHandler(async(req, res) => {
    const {title, content} = req.body

    if(!title || ! content) {
        res.status(400)
        throw new Error("Please fill all fields")
    }else{
        const note = new Note({user: req.user._id, title, content});

        const createdNote = await note.save();

        res.status(201).json(createdNote)
    }
})

const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if(note){
        res.json(note);
    }else{
        res.status(404).json({message: "Note Not Found"})
    }
})

const updateNoteById = asyncHandler(async(req, res) => {
    const note = await Note.findById(req.params.id);

    const {title, content} = req.body

    if(note.user.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error("You cannot perform this action")
    }
    
    if(note){
        note.title = title,
        note.content = content

        const updatedNote = await note.save()
        res.json(updatedNote)
    }else{
        res.status(404);
        throw new Error("Note not found")
    }
})

const deleteNoteById = asyncHandler(async(req, res) => {
    const note = await Note.findById(req.params.id);

    
    if(note.user.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error("You cannot perform this action")
    }

    if(note){
        await note.remove();

        res.json({message: "Note Removed"})
    }else{
        res.status(404);
        throw new Error("Note not found")
    }
})

module.exports = {getNotes, createNote, getNoteById, updateNoteById, deleteNoteById}