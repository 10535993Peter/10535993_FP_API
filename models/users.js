const mongoose = require("mongoose");

const schema = mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    lastUpdated: Date,
    dateCreated: Date,
    emailaddress: String,
    lastLogin: Date
});

module.exports = mongoose.model("users", schema);