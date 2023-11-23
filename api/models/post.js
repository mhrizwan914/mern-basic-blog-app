const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    excerpt: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
})

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;