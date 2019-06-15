var mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/jobhubdb';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

connect.then((db) => {
    console.log("Connected to mongodb server" + db);
}, (err) => { console.log(err); });