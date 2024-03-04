import mongoose, { mongo } from "mongoose";

const CommentSchema = mongoose.Schema({
    commentary: {
        type: String,
        required: [true, "Commentary is requerid"]
    },
    postBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication', required: true
    },
    creatorBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    }, state: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model('Comment', CommentSchema);