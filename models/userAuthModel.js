const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


//initaila authentication model
// const UserAuthModel = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     },
//     email:{
//         type:String
//     },
//     address:{
//         type:String
//     }
// });
const userSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: Number
    },
    usertype: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    imageName: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});



userSchema.statics.checkCrediantialsDb = async (user22, pass) => {

    const user1 = await User.findOne({ username: user22, password: pass })
    return user1;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    console.log(token);
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return token
}

// userSchema.statics.myFirst = function(user,pass){

// if(user=="admin"&&pass=="password"){
//     console.log("welcome")
// }else{
//     console.log(user)
//     console.log(pass)
// }
//     }
const User = mongoose.model('User', userSchema);
module.exports = User;
