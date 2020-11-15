const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        min: 6,
        max: 255
    },
    email: {
        type:String,
        required:true,
        max:255
    },
    password: {
        type: String,
        required:true,
        max: 1024,
        min: 6
    },
    date : {
        type: Date,
        default: Date.now
    },
    secret: {
        type: {
            ascii: String,
            hex: String,
            otpauth_url: String
        }
    }

});

module.exports = mongoose.model('User',userSchema);