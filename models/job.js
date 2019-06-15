const mongoose = require('mongoose');
const Items = mongoose.model('jobs', {
    title: {
        type: String
    },
    salary: {
        type: String
    },
    experience: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = Items