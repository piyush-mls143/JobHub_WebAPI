const jwt = require('jsonwebtoken')
const User = require('../models/userAuthModel')
const auth = async (req, res, next) => {
 try {
    console.log("kkkkkk")

 const token = req.header('Authorization').replace('Bearer ', '')
 console.log(token)

 const decoded = jwt.verify(token, 'thisismynewcourse')
 const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
 console.log(user,' nfndg nfdjgdf')

// console.log(token);
// console.log("check");
// console.log(user);

 if (!user) {
 throw new Error()
 }
 req.token = token
 req.user = user
 next()
 } catch (e) {
 res.status(401).send({ error: 'Please authenticate.' })
 }
}
module.exports = auth