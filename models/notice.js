const mongoose = require('mongoose');

const Noticeschema=new mongoose.Schema({
    noticetitle: {
        type: String
    },
    notice: {
        type: String
    },

})

const Notices=mongoose.model('Notices',Noticeschema);
module.exports = Notices;