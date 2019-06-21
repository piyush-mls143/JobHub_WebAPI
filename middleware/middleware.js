const auth = function(req, res, next){
console.log("Middleware checkings ");
next();
}
module.exports = auth