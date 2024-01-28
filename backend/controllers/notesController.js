//custom model



const Note = require("../models/notesModel")
const mongoose = require("mongoose")

// getting all notes
const allNotesController =  async(req,res) => {
    const notes  = await Note.find({}).sort({createdAt: -1})
    if(notes){
        return res.status(200).json(notes)

    }
    return res.status(400).json({"mssg": "Notes not found"})

    
}

// // getting a single notes
// function noteController(req,res) {
//     return res.json({"mssg": "Getting a note"})
// }
const noteController = async (req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such note found"})
    }
    const notes = await Note.findById(id)
    if(!notes){
        return res.status(404).json({error: "No such note found"})


    }
    else{
        return res.status(200).json(notes)

    }


}

// // posting a note
// function addingNotesController(req,res) {
//     return res.json({"mssg": "posting a notes"})
// }
const addingNotesController = async (req,res) =>{
    const {title, content} = req.body

    try {
        const notes = await Note.create({title,content})
        return res.status(200).json(notes)
        
    } catch (error) {
        return res.status(400).json({"error": error})
        
    }
}
// // deleting note
// function deleteNoteController(req,res) {
//     return res.json({"mssg": "deleting  notes"})
// }

const deleteNoteController = async(req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such note found"})
    }
    const notes = await Note.findOneAndDelete({_id:id})
    if(!notes){
        return res.status(404).json({error: "No such note found so no deletion is done"})


    }
    else{
        return res.status(200).json(notes)

    }
}
// // updating note
// function updateNoteController (req,res) {
//     return res.json({"mssg": "updating  notes"})
// }

const updateNoteController = async(req,res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such note found"})
    }
    const notes = await Note.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!notes){
        return res.status(404).json({error: "No such note found so no updation is done"})


    }
    else{
        return res.status(200).json(notes)

    }
}

module.exports = {
    allNotesController,
    noteController,
    updateNoteController,
    deleteNoteController,
    
    addingNotesController,
    
    
}