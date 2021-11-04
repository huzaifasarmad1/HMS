const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const login_schema = new Schema({
    id: String,
    token: String,

});
module.exports = mongoose.model("login_schema", login_schema);