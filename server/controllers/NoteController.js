import express from "express";
import noteService from "../services/NoteService";


export default class NoteController {
    constructor() {
        this.router = express
            .Router()
            .get("", this.getAll) //get all notes
            .get("/:id", this.getById) //get a note by its Id
            .post("", this.create) //create  new note
            .put("/:id", this.edit)//edits a note

            .delete("/:id", this.delete); //deletes a note
    }

    async getAll(req, res, next) {
        try {
            let data = await noteService.getAll();
            return res.send(data);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            let data = await noteService.findById(req.params.id);
            res.send(data);
        } catch (error) {
            next(error);
        }
    }

    
    async edit(req, res, next) {
        try {
            let data = await noteService.update(req.params.id, req.body);
            //res.status(202).send(data);
            return res.send(data);
        }
        catch (error) {
            next(error);
        }


    }


    
     


    async create(req, res, next) {
        try {
            let data = await noteService.create(req.body);
            res.send(data);
        } catch (error) {
            next(error);
        }
    }



    //in final version deleting of bugs is prohibited
    async delete(req, res, next) {
        try {
            await noteService.delete(req.params.id);
            res.send("Note deleted");
        } catch (error) {
            next(error);
        }
    }
}
