const mongoose = require('mongoose');

const Jobschema=new mongoose.Schema({
    post: {
        type: String
    },
    companyname: {
        type: String
    },
    experience: {
        type: String
    },
    description: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: String
    },
    userId: {
        type: String
    }
})

const Jobs=mongoose.model('Jobs',Jobschema);
module.exports = Jobs;