// use the path of your model
const Users = require('./models/userAuthModel');
const Jobs = require('./models/jobs');
const Reports = require('./models/reports');
// const Notices = require('./models/notice');
const mongoose = require('mongoose');

// use the new name of the database
const url = 'mongodb://localhost:27017/JobHubTesting';

beforeAll(async() => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async() => {
    await mongoose.connection.close();
});




describe('User Schema Test', () => {
    // Testing User registration
    it('Add user testing', () => {
        const users = {
            'firstname': 'piyush',
            'lastname': 'sah',
            'email': 'piyush@sah.com',
            'contact' : '9814302011',
            'usertype': 'user',
            'username':'piyush',
            'password':'password',
            'imageName': 'image'
        };

        return Users.create(users)
            .then((output) => {
                expect(output.email).toEqual('piyush@sah.com');
            });
    });
});


describe('login Schema test', () => {
    // the code below is for insert testing
    it('User Login test ', () => {
        const login = {
            'username': 'piyush',
            'password': 'password',
        };

        return Users.create(login)
            .then((login) => {
                expect(login.username).toEqual('piyush');
            });
    });
});



describe('password update test ', () => {
    it('to test the update', async () => {
        return Users.findOneAndUpdate({_id :Object('5d23092011f5444230f6f6bc')},
       {$set : {password:'pwd'}})
        .then((pp)=>{
        expect(pp.firstname).toEqual('piyush')
        })
       
       });
       
});



describe('user delete test ', () => {
    it('user  delete ', async() => {
        const User = await Users.deleteOne({
            _id: '5d23095458e82714b872a4d2'
        }).then(function(res) {
            expect(res.deletedCount).toBe(0)
        })

    });

});



describe('job Schema Test', () => {
    // Testing User registration
    it('Add job testing', () => {
        const jobs = {
            'post': 'engineer',
            'companyname': 'IT solutions',
            'experience': 'piyush@sah.com',
            'description' : 'jpt',
            'email': 'piyush@sah.com',
            'contact':'9814302011',
            'userId': '5d230c72a05a0a2f90a74959'
        };

        return Jobs.create(jobs)
            .then((output) => {
                expect(output.post).toEqual('engineer');
            });
    });
});



describe('job delete test ', () => {
    it('job  delete ', async() => {
        const Job = await Jobs.deleteOne({
            _id: '5d230c72a05a0a2f90a74959'
        }).then(function(res) {
            expect(res.deletedCount).toBe(0)
        })

    });
});


describe('Report Schema Test', () => {
    // Testing User registration
    it('Add report testing', () => {
        const report = {
            'reporttitle': 'something',
            'report': 'nothing',
            'userId': '5d23092011f5444230f6f6bc',
           
        };

        return Reports.create(report)
            .then((output) => {
                expect(output.report).toEqual('nothing');
            });
    });
});









