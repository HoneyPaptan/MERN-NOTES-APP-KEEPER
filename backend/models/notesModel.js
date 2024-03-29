const mongoose = require("mongoose")


const Schema = mongoose.Schema

const notesSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    content:{
        type:String,
        required:true
    }

},{timestamps:true})


module.exports = mongoose.model("Note", notesSchema)