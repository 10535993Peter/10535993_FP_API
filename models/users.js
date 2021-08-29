const mongoose = require("mongoose");

const schema = mongoose.Schema({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    mobile: String,
    company: String,
    lastUpdated: Date,
    dateCreated: Date,
    lastLogin: Date
});

module.exports = mongoose.model("users", schema);

// const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

// const userSchema = mongoose.Schema({
//     id: String,
//     firstName: {type: String, required: true},
//     lastName: {type: String, required: true},
//     email: {type: String, required: true},
//     password: {type: String, required: true},
//     mobile: {type: String, required: true},
//     lastUpdated: {type: Date, required: true},
//     dateCreated: {type: Date, required: true},
//     lastLogin: {type: Date, required: true}
// });

// userSchema.plugin(uniqueValidator);

// module.exports = mongoose.model("users", schema);