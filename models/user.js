const mongoose = require('mongoose');
const User = mongoose.model('user', {
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    mobile: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = User;