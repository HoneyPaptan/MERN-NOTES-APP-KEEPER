require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
notesRoutes = require("./routes/notesRoutes")

// middleware
app.use(express.json())
app.use((req,res,next) =>{
    console.log(req.path, req.method)
    next()
})




//routes
app.use("/api/notes", notesRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log("Server is running on port and connected to db")
        })
    })
    .catch((error)=>{
        console.log(error)
    })














