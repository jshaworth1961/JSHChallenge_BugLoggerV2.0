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


    async findById(id) {
        return await _repository.findById(id);
    }
    async create(rawData) {
        return await _repository.create(rawData);
    }

    async createNoteByBugId(id, rawData)
    {
        let bug = await _repository.findById(id)
        {
            if(bug.closed == false)
            {
                return await noteService.create(rawData);
            }
            else
            {
                return "The case is closed. No additional notes can be added."
            }
        }

    }

    async update(id, update) {
        //NOTE {new: true} insures I get the changed object back after the change

        let bug = await _repository.findById(id);

        if(bug.closed === false)
        {
            return await _repository.findByIdAndUpdate(id, update, { new: true });
        }
        else
        {
            return "The bug case file has been closed. It cannot be edited or deleted";
        }

    }

    async editNoteByBugIdAndNoteId(id,noteId, update)
    {
        let bug = await _repository.findById(id)

        if(bug.closed == false)
        {
            return await noteService.update(noteId,update);
        }
        else
        {
            return "The case is closed. The bug can no longer be edited."
        }
    }

    async delete(id) {

        //let bug = await _repository.findById(id);

        if(!bug)
        {
            return "There are no bugs"
        }

        else
        {
            return "You can only change a bug. You cannot delete a bug.";
        }

        return "You can only change a bug. You cannot delete a bug.";
        //await _repository.findByIdAndDelete(id);
    }
}

const bugService = new BugService();
export default bugService;

