import express from "express";
import bugService from "../services/BugService";
import noteService from "../services/NoteService";


export default class BugController {
  constructor() {
    this.router = express
      .Router()
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/notes", this.getNotesByBugId)
      .get("/:id/notes/:noteId",this.getNoteByBugIdAndNoteId)
      .post("", this.create)
      .post("/:id/notes", this.createNoteByBugId)
      .put("/:id", this.edit)
      .put("/:id/notes/:noteId",this.editNoteByBugIdAndNoteId)

      .delete("/:id", this.delete)
      .delete("/:id/notes/:noteId", this.deleteNoteFromBugId)
  }

  async getAll(req, res, next) {
    try {
      let data = await bugService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await bugService.findById(req.params.id);
      return res.send(data); //added return
    } catch (error) {
      next(error);
    }
  }

  async getNotesByBugId(req, res, next) {

    try {
      let data = await noteService.getNotesByBugId(req.params.id);
      res.send(data)

    }
    catch (error) {
      next(error);
    }

  }

  async getNoteByBugIdAndNoteId(req,res,next)
  {
    try
    {
      let data = await noteService.getNoteByBugIdAndNoteId(req.params.id,req.params.noteId);
      res.send(data);
    }
    catch(error)
    {
      console.error(error)
    }
  }

  async edit(req, res, next) {
    try {

      let data = await bugService.update(req.params.id, req.body);
      //res.status(202).send(data);
      return res.send(data);
    }
    catch (error) {
      next(error);
    }
  }

  async editNoteByBugIdAndNoteId(req,res,next)
  {
    try
    {
      let data = await bugService.editNoteByBugIdAndNoteId(req.params.id,req.params.noteId,req.body)
      return res.send(data);
    }
    catch(error)
    {

      console.error(error);

    }
  }

  async create(req, res, next) {
    try {
      let data = await bugService.create(req.body);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async createNoteByBugId(req,res,next)
  {
    try
    {
      let data = await bugService.createNoteByBugId(req.params.id,req.body);
        res.send(data);
    }
    catch(error)
    {
        console.error(error);

    }
  }



  //in final version deleting of bugs is prohibited
  async delete(req, res, next) {
    try {
      //await bugService.delete(req.params.id);
      res.send("You cannot delete bugs")
    } catch (error) {
      next(error);
    }
  }

  async deleteNoteFromBugId(req, res, next) {
    try {
      await noteService.deleteNoteFromBugId(req.params.id, req.params.noteId);
      res.send("Note attached to bug deleted")
    }
    catch (error) {
      next(error);
    }
  }
}
