const mongoose = require("mongoose");

const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'basic', enum: ["basic","admin"]},
    accessToken: String,
    mobile: String,
    company: String,
    status: {type: String, default: "active", enum: ["active","inactive"]},
    lastUpdated: Date,
    dateCreated: Date,
    lastLogin: Date,
    documents: {type: Array}
});

module.exports = mongoose.model("users", schema);


//******ROUGHWORK **********/


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