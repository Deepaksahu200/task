const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    userType: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
