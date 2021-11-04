const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const appointments = new Schema({
    patient:String,
    doctor: { type: String, required: true },
    time: { type: String, required: true },
    active:{type:Boolean}
  });
module.exports = mongoose.model('appointments', appointments);

