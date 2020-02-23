import mongoose from "mongoose";
import Note from "../models/Note";
//import Bug from "../models/Bug"

//NOTE the repository is the connection to your DB at that collection
const _repository = mongoose.model("Note", Note);
class NoteService {
    async getAll() {
        // let data = await _repository.find({});
        // return data
        return await _repository.find({})
    }




    async findById(id) {
        return await _repository.findById(id)
    }

    //this is called from the BugController
    async getNotesByBugId(id) {

        return await _repository.find({ bug: id })//bugId
    }

    //this is called from the BugController
    async getNoteByBugIdAndNoteId(id, noteId) {
        return await _repository.findById(noteId);
    }

    //this is a dead method: it is not being called
    /*
    async editNoteByBugIdAndNoteId(bugId,noteId, update) //edit note
    {
        try
        {
            let bug = _repository.findById(bugId);
            console.log(bugId);

            if(bug.closed === false)
            {
                return await _repository.findByIdAndUpdate(noteId, update, { new: true });
            }
            else {
                return "The bug case file has been closed. It cannot be edited or deleted";
            }

        }
        catch
        {

        }

    }
*/

    async create(rawData) //create note
    {
        return await _repository.create(rawData);
    }



    async update(id, update) //edit note
    {
        //NOTE {new: true} insures I get the object back after the change
        return await _repository.findByIdAndUpdate(id, update, { new: true });
    }

    async delete(id) //delete note
    {
        await _repository.findByIdAndDelete(id);
    }


}

const noteService = new NoteService();
export default noteService;

