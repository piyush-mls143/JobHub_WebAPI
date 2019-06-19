require('./database/connect');
const job = require('./models/job');
const User= require('./models/user')
const multer = require('multer');
const path = require('path');
const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));



app.post("/signup", (req, res) => {
    var myData = new User(req.body);
    myData.save().then(function(){
   res.send('fine');
   
    }).catch(function(e){
    res.send(e)
    });
    });

app.post("/productreg",(req,res) =>{
    var myData= new Product(req.body);
    myData.save().then(function(){
        
    })
})






//login api
// app.post("/userauth", (req, res) => {
//     User.findOne({ "username": req.body.username, "password": req.body.password }).count((err, user) => {
//         if (user) {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json({ success: true, message: "welcome" + req.body.username })
//         }
//         else {
//             res.json({ err: "user doesn't exists" })
//         }
//     }).catch((err) => {
//         res.send(err);
//     })
// });




app.listen(3000);