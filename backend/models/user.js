const mongoose = require('mongoose');
const { default: passportLocalMongoose } = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User' , userSchema);