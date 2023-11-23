const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 30
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;