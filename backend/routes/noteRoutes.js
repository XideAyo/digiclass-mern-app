const express = require("express")
const { getNotes, createNote , getNoteById, updateNoteById, deleteNoteById} = require("../controller/noteController")
const router = express.Router()
const {protect} = require("../middleware/authMiddleware")
const path      = require("path") 
const fs      = require("fs") 
const currentPath       = __dirname 
const directoryName     = path.dirname(currentPath) 

const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(directoryName, '/public/uploads/'))
    },
    filename : (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const upload = multer({storage: storage})


router.route("/").get(protect, getNotes)
router.route("/create").post(protect, upload.single("file"), createNote)
router.route("/:id")
    .get(protect, getNoteById)
    .put(protect, updateNoteById)
    .delete(protect, deleteNoteById)

module.exports = router