const mongoose = require('mongoose');


const Product = mongoose.model('Products', {
    pname: {
        type: String
    },
    type: {
        type: String
    },
    price: {
        type: Number
    },
    sold_to: {
        type: String
    },
    userId: {
        type: String
    }

});

module.exports = Product