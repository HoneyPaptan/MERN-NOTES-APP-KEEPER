const express = require("express")
const app = express()
const {allNotesController,addingNotesController,noteController,updateNoteController, deleteNoteController}  = require("../controllers/notesController")
const router  = express.Router()
// getting all notes route
router.get("/", allNotesController)


// getting a single note route
router.get("/:id", noteController)


// posting a note route
router.post("/", addingNotesController)

//deleting a particualar note
router.delete("/:id", deleteNoteController)


// updating a note route
router.patch("/:id", updateNoteController)

module.exports = router