const mongoose = require('mongoose');

const Reportschema=new mongoose.Schema({
    reporttitle: {
        type: String
    },
    report: {
        type: String
    },
    userId: {
        type: String
    }
})

const Reports=mongoose.model('Reports',Reportschema);
module.exports = Reports;