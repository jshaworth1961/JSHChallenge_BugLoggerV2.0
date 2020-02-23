import mongoose from "mongoose"
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Note = new Schema(
    {
        content: {type:String, default:"Put content here"},
        reportedBy: { type: String, default:"developer" },
        bug: { type: ObjectId, ref: "Bug",required:true} //this is bugId I changed it for the tester
    },

    { timestamps: true, toJSON: { virtuals: true } }

);

export default Note;