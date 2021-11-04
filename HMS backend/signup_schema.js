const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ids = require('short-id');
const signup = new Schema({
    user_id: { type: String, default: ids.generate() },
    first_name: { type: String, required: true },
    second_name: { type: String, required: true },
    password: String,
    email: { type: String, required: true, unique: true },
    role: String,
    activeaccount:Boolean,
   });
module.exports = mongoose.model('signup', signup);

