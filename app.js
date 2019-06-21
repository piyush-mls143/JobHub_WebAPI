// const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db/mongoos');
const Users = require('./models/userAuthModel');
const Product = require('./models/product');

//const UserInfo = require('./models/userinfo');

// const path = require('path');
// const publicDirectry = path.join(__dirname, 'public')
// const viewPath = path.join(__dirname, 'resources');
// app.set('views', viewPath);
const cors = require('cors');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
app.use(cors());
const middleware = require('./middleware/middleware');


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/mytest', auth, function () {
    res.send("this is my private page")
})

// app.post('/login', function (req, res) {

//     const username=req.body.username;
//     const password=req.body.password;

// const User=Users.myFirst(username,password);

// });
// app.get('/test11',middleware,function(){
//     console.log("middlewarer infff")
// })
app.get('/users/me', auth, function (req, res) {
    res.send(req.user);
   
})
app.post("/login", async function (req, res) {

    const user = await Users.checkCrediantialsDb(req.body.username, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ token });
})

app.get("/test99", auth, function (req, res) {

})

app.post("/signup", (req, res) => {
    var myData = new Users(req.body);
    myData.save().then(function () {
        res.send('fine');
    }).catch(function (e) {
        res.send(e)
    });


});
app.post('/addproduct', auth, function (req, res) {
    console.log(req.body);

    const productData = new Product({ ...req.body, userId: req.user._id });
    console.log(productData);

    productData.save().then(function () {
        res.json('fine');
        
    }).catch(function (e) {
        res.send(e)
    })
})


// function generateToken(){
//     const token =jwt.sign({_id:"userid"},"mysecretwordsd");
//     console.log(token);
// }
//generateTokens();

app.listen(90);