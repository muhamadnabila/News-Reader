const { verify } = require('../helpers/jwt');
const { User } = require('../models');

module.exports = {
  authenticate: function(req, res, next) {
    let token = req.headers.token;
    if (!token) {
      throw({code : 401, message: 'Unauthorized' })
    } else {
      let decoded = verify(token);
      User
       .findOne({
         email: decoded.email
       })
       .then(user => {
         if(user) {
           req.user = user;
           next();
         } else {
           throw({code : 401, message: 'Unauthorized'})
         }
       })
       .catch(next)
    }
  }
}