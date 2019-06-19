const mongoose = require('mongoose');
const User = mongoose.model('user', {
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: String
    },

    username:{
        type:String
    },
    
    password: {
        type: String
    }
});

module.exports = User;