const express = require("express")
const {NoteModel} = require("../modul/note.model")

const noteRouter = express.Router()

noteRouter.get("/",async (req,res)=>{
    const query = req.query
    try {
        const note = await NoteModel.find(query)
        res.send(note)
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

noteRouter.post("/create",async (req,res)=>{
    const payload = req.body
    try {
        const new_note = new NoteModel(payload)
        await new_note.save()
        res.send("created the notes")
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

noteRouter.patch("/update/:id",async (req,res)=>{
    const id = req.params.id
    const payload = req.body
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note = note.userID
    const userID_making_req = req.body.userID
    try {
        if(userID_making_req !== userID_in_note){
            res.send({"msg":"Your not authorized"})
        }else{
            await NoteModel.findByIdAndUpdate({_id:id},payload)
            res.send("updated the notes")
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

noteRouter.delete("/delete/:id",async (req,res)=>{
    const id = req.params.id
    const note = await NoteModel.findOne({"_id":id})
    const userID_in_note = note.userID
    const userID_making_req = req.body.userID
    try {
        if(userID_making_req !== userID_in_note){
            res.send({"msg":"Your not authorized"})
        }else{
            await NoteModel.findByIdAndDelete({_id:id})
            res.send("Deleted the notes")
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

module.exports = {noteRouter}