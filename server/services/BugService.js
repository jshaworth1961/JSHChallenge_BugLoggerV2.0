import mongoose from "mongoose";
import Bug from "../models/Bug";
import noteService from "./NoteService";

//NOTE the repository is the connection to your DB at that collection
const _repository = mongoose.model("Bug", Bug);
class BugService {
    async getAll() {
        // let data = await _repository.find({});
        // return data
        return await _repository.find({});
    }



    async findById(id) //finds bug by its Id
    {
        return await _repository.findById(id);
    }

    async create(rawData)  //creates a new bug
    {
        return await _repository.create(rawData);
    }

    async createNoteByBugId(id, rawData) //given bug Id creates a new note if the bug is still open
    {
        let bug = await _repository.findById(id)
        {
            if (bug.closed == false) {
                return await noteService.create(rawData);
            }
            else {
                return "The case is closed. No additional notes can be added."
            }
        }

    }

    async update(id, update) //if bug is still open allows the bug to be edited
    {
        //NOTE {new: true} insures I get the changed object back after the change

        let bug = await _repository.findById(id);

        if (bug.closed === false) {
            return await _repository.findByIdAndUpdate(id, update, { new: true });
        }
        else {
            return "The bug case file has been closed. It cannot be edited or deleted";
        }

    }

    async editNoteByBugIdAndNoteId(id, noteId, update) //given bugId and noteId allows note to be edited if the bug is still open
    {
        let bug = await _repository.findById(id)

        if (bug.closed == false) {
            return await noteService.update(noteId, update);
        }
        else {
            return "The case is closed. The bug can no longer be edited."
        }
    }

    //deletes bug but program never calls it
    async delete(id) {

        //let bug = await _repository.findById(id);

        if (!bug) {
            return "There are no bugs"
        }

        else {
            return "You can only change a bug. You cannot delete a bug.";
        }

    }
    //checks to see if bug is open: if open sends noteId to have it deleted
    async deleteNoteFromBugId(id, noteId) {
        let bug = await _repository.findById(id)
        {
            if (bug.closed == false) {
                return await noteService.delete(noteId);
            }
            else {
                return 'You cannot delete the note. The bug case is closed.'
            }
        }
    }

}

const bugService = new BugService();
export default bugService;

