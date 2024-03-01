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
    id_User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default mongoose.model('Publication', PublicationSchema);