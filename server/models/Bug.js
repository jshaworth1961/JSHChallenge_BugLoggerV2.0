import mongoose from "mongoose"
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Bug = new Schema(
    {
        closed: { type: Boolean, default: false },
        description: { type: String, default: "problem" },
        title: { type: String, default: "BUG" },
        reportedBy: { type: String, default: "developer" },
        closedDate: { type: Date, default: Date.now }
    },

    { timestamps: true, toJSON: { virtuals: true } }

);

export default Bug;