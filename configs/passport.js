
const passport = require('passport');

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated())res.locals.user = req.user;

    next();
}



module.exports = passport