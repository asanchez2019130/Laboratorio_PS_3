import mongoose from "mongoose";

const PublicationSchema = mongoose.Schema({
    titule: {
        type: String,
        required: [true, "Title is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    creatorBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    commentBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        },
    ],
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Publication', PublicationSchema);