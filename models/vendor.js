const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Vendors schema and model
const VendorSchema = new Schema({
    company: String,
    companyContactName: String,
    companyEmail: String,
    address: String,
    internalContact: String,
    sector: String,
    status: {type: String, default: "active"},
    lastUpdated: Date,
    dateCreated: Date
});

const Vendor = mongoose.model('vendor', VendorSchema);

module.exports = Vendor;


//******ROUGHWORK **********/

// //create Vendors schema and model
// const VendorSchema = new Schema({
//     company: {type:String, required: [true, 'company field is required']},
//     companyContactName: {type:String, required: [true, 'company contact name field is required']},
//     companyEmail: {type:String, required: [true, 'company email field is required']},
//     address: {type:String, required: [true, 'address field is required']},
//     internalContact: {type:String, required: [true, 'internal contact field is required']},
//     sector: String,
//     lastUpdated: {type:String, required: [true, 'Last updated field is required']},
//     dateCreated: {type:String, required: [true, 'Date created field is required']}
// });

//could add in additional fields later such as "active", "Type", "size" etc 