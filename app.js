// const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db/mongoos');
const Users = require('./models/userAuthModel');
const Jobs = require('./models/jobs');
const Reports=require('./models/reports');

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




app.post('/addjobs',function (req, res) {
   var post=req.body.post;
   var companyname=req.body.companyname;
   var experience=req.body.experience;
   var description=req.body.description;
   var email=req.body.email;
   var contact=req.body.contact;
   var userId=req.body.userId;
   console.log(req.body);

   var JobData=new Jobs({
    post:post,
    companyname:companyname,
    experience:experience,
    description:description,
    email:email,
    contact:contact,
    userId:userId
   })
   JobData.save().then(function(){
       res.json({msg: "Job_added"})
   })
   .catch(function(e){
       res.send(e);
   })
})





 app.get('/get-job', function(req,res){
     var mysort = {_id: -1};
     Jobs.find()
     .sort(mysort).then(function(job){
         res.send(job);
     }).catch(function(e){
         res.send(e);
     })
 })




 app.post('/addreports',function (req, res) {
    var reporttitle=req.body.reporttitle;
    var report=req.body.report;
    var userId=req.body.userId;
    console.log(req.body);
 
    var ReportData=new Reports({
        reporttitle:reporttitle,
        report:report,
     userId:userId
    })
    ReportData.save().then(function(){
        res.json({msg: "Report_added"})
    })
    .catch(function(e){
        res.send(e);
    })
 })

//it is getmessage part
 app.get('/getreport', function(req,res){
    var mysort = {_id: -1};
    Reports.find()
    .sort(mysort).then(function(report){
        res.send(report);
    }).catch(function(e){
        res.send(e);
    })
})



 //delete vacancies
 app.delete('/delete_jobs/:id', function (req,res){
     Jobs.findByIdAndDelete(req.params.id).then(function (){
         res.json({msg: "Jobs_deleted"})
     }).catch(function (e){
         res.send(e);
     })
 })





// function generateToken(){
//     const token =jwt.sign({_id:"userid"},"mysecretwordsd");
//     console.log(token);
// }
//generateTokens();

app.listen(90);