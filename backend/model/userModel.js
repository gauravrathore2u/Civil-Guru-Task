const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Id is required for a user"],
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true,         
        maxlength: [20,  "Name should be less than 20 characters"],
        minlength: [5, "Name should be greater than 5 characters"],
    },

    email:{
        type: String,
        lowercase: true,     
        required: [true, "please provide email for signup"],
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    password:{
        type:String
    },
    lastLogin: {
        type: Date
    },
    token: {
        type: String
    }
})


const userModel = mongoose.model('users', userSchema);


module.exports = userModel;