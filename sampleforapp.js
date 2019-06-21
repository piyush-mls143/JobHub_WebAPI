// const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db/mongoos');
const UserInfo = require('./models/userinfo');
const Product = require('./models/product');
// const path = require('path');
// const publicDirectry = path.join(__dirname, 'public')
// const viewPath = path.join(__dirname, 'resources');
// app.set('views', viewPath);
const cors = require('cors');
app.use(cors());



app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/productf', function (req, res) {

//     Product.find().then(function (product) {
//         res.send(product)
//         console.log("data")
//     }).catch(function () {
//         console.log('errot');
//     })

// });
// app.get('/users', function (req, res) {

//     User.find().then(function (user) {
//         res.send(user)
//         console.log("data")
//     }).catch(function () {
//         console.log('errot');
//     })

// });
// app.get('/users/remove/:tagid', function (req, res) {
//     var id = req.params.tagid;
//     User.deleteOne({ _id: id }).then(del => {
//         res.send(del);
//     }).catch(function () {
//         console.log('errot');
//     })

// });



app.post("/register", (req, res) => {
    var myData = new UserInfo(req.body);
    myData.save().then(function () {
        res.send('fine');
    }).catch(function (e) {
        res.send(e)
    });


});


// app.get('/getproduct/:id', function (req, res) {

//     id = req.params.id;

//     Product.findOne({ _id: id }).then(function (product) {
//         res.send(product);
//         console.log(product);
//     }).catch(function () {
//         console.log('errot');
//     })

// });
// app.post("/updateproduct:id", (req, res) => {
//     // var myData = new Product(req.body);

// console.log(req.body);
// Product.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((user)=>{
//     res.send("updated"+user);
// })
//     // var id = req.body.id;
//     // var pname=req.body.pname;
//     // var type=req.body.type;
//     // var price=req.body.price;
//     // var sold_to=req.body.sold_to;



//     // Product.updateOne({_id:id},{$set:{pname:pname,type:type,price:price,sold_to:sold_to}}).then(function (datas) {
//     //     res.send('product updated');
//     //     console.log(datas)
//     // }).catch(function (e) {
//     //     res.send(e)
//     // });

// });


// app.post("/uploadproduct", (req, res) => {
//     var myData = new Product(req.body);
//     myData.save().then(function () {
//         res.send('product added');
//     }).catch(function (e) {
//         res.send(e)
//     });


// });
// app.delete("/deleteproduct/:id", (req, res) => {
//     var id = req.params.id;
//     Product.findByIdAndDelete(req.params.id).then(function (del) {
//         res.send(del);

//     }).catch(function (e) {
//         res.send(e)
//     })
// })

app.listen(90);