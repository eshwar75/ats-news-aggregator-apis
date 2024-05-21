const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "first name not provided "],
    },
    lastName: {
        type: String,
        required: [true, "last name not provided "],
    },
    fullName: {
        type: String,
        required: [true, "full name not provided "],
    },
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "{VALUE} is not a valid email!",
        },
    },
    password: {
        type: String,
        required: true,
    },
    preferences: {
        type: Object,
    },
});

module.exports = mongoose.model("users", userSchema);
