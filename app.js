// const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const bodyParser = require('body-parser');
require('./db/mongoos');
const Users = require('./models/userAuthModel');
const Jobs = require('./models/jobs');
const Reports = require('./models/reports');
const Notices = require('./models/notice');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
app.use(cors());
const middleware = require('./middleware/middleware');


app.use(express.static('./images'))
app.use(express.json());


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

var storage = multer.diskStorage(
    {
        destination: "images",
        filename: (req, file, callback) => {
            let ext = path.extname(file.originalname);
            callback(null, file.fieldname + "-" + Date.now() + ext);
        }
    });

var imageFileFilter = (req, file, cb) => {
    if
        (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) { return cb(newError("You can upload only image files!"), false); }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 1000000
    }
});




var storage = multer.diskStorage({
    destination: "images",
    filename: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        callback(null, "ram" + Date.now() + ext);
    }

});

var upload = multer({ storage: storage });








app.post("/login", async function (req, res) {

    const user = await Users.checkCrediantialsDb(req.body.username, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ token: token, usertype: user.usertype, _id: user._id });
})

app.get("/test99", auth, function (req, res) {

})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send({ Filename: req.file.filename });
    console.log(req.file.filename)
})


app.post("/signup", (req, res) => {
    console.log("here")
    var myData = new Users(req.body);
    myData.save().then(function () {
        res.send('fine');
    }).catch(function (e) {
        res.send(e)
    });
});

app.get('/get_users', function (req, res) {
    var mysort = { _id: -1 };
    Users.find()
        .sort(mysort).then(function (user) {
            res.send(user);
        }).catch(function (e) {
            res.send(e);
        })
})




app.post('/addjobs', function (req, res) {
    var post = req.body.post;
    var companyname = req.body.companyname;
    var experience = req.body.experience;
    var description = req.body.description;
    var email = req.body.email;
    var contact = req.body.contact;
    var userId = req.body.userId;
    console.log(req.body);

    var JobData = new Jobs({
        post: post,
        companyname: companyname,
        experience: experience,
        description: description,
        email: email,
        contact: contact,
        userId: userId
    })
    JobData.save().then(function () {
        res.json({ msg: "Job_added" })
    })
        .catch(function (e) {
            res.send(e);
        })
})





app.get('/get-job', function (req, res) {
    var mysort = { _id: -1 };
    Jobs.find()
        .sort(mysort).then(function (job) {
            res.send(job);
        }).catch(function (e) {
            res.send(e);
        })
})

app.get('/get-job_id', auth, function (req, res) {
    console.log(req.user._id)
    Jobs.find({ userId: req.user._id }).then(function (job) {
        console.log(job)
        res.send(job);
    }).catch(function (e) {
        res.send(e);
    })


    //var mysort = { _id: -1 };
    // console.log(req.user._id)
    // Jobs.findOne({userId:req.user._id})
    //     .then(function (job) {
    //         res.send(job);
    //         console.log(job)
    //     }).catch(function (e) {
    //         res.send(e);
    //     })

})




app.post('/addreports', function (req, res) {
    var reporttitle = req.body.reporttitle;
    var report = req.body.report;
    var userId = req.body.userId;
    console.log(req.body);

    var ReportData = new Reports({
        reporttitle: reporttitle,
        report: report,
        userId: userId
    })
    ReportData.save().then(function () {
        res.json({ msg: "Report_added" })
    })
        .catch(function (e) {
            res.send(e);
        })
})

//it is getmessage part
app.get('/getreport', function (req, res) {
    var mysort = { _id: -1 };
    Reports.find()
        .sort(mysort).then(function (report) {
            res.send(report);
        }).catch(function (e) {
            res.send(e);
        })
})



app.get('/getnotice', function (req, res) {
    var mysort = { _id: -1 };
    Notices.find()
        .sort(mysort).then(function (notice) {
            res.send(notice);
        }).catch(function (e) {
            res.send(e);
        })
})


//delete vacancies
app.delete('/delete_jobs/:id', function (req, res) {
    Jobs.findByIdAndDelete(req.params.id).then(function () {
        res.json({ msg: "Jobs_deleted" })
    }).catch(function (e) {
        res.send(e);
    })
})


app.delete('/delete_user/:id', function (req, res) {
    Users.findByIdAndDelete(req.params.id).then(function () {
        res.json({ msg: "User_deleted" })
    }).catch(function (e) {
        res.send(e);
    })
})


app.put('/update_password', auth, function (req, res) {
    Users.findByIdAndUpdate(req.user._id, req.body, { new: true }, function (params) {
        res.send(true)
    });
})






app.post('/addnotices', function (req, res) {
    var noticetitle = req.body.noticetitle;
    var notice = req.body.notice;

    console.log(req.body);

    var NoticeData = new Notices({
        noticetitle: noticetitle,
        notice: notice,

    })
    NoticeData.save().then(function () {
        res.json({ msg: "Notice_added" })
    })
        .catch(function (e) {
            res.send(e);
        })
});


app.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


app.listen(90);