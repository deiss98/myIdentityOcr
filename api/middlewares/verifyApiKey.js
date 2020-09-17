const {User, db} = require("../models/user.model.js");

const ROLES = db.ROLES;

// need to add content-type as application/json
checkDuplicateEmail = (req, res, next) => {
    User.findByEmail(req.body.email, (err, data) => {
        if (data) {
            res.status(400).send({
              message: "Failed! Email is already in use!"
            });
            return;
        }
        next();
    }); 
};


checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    
    next();
  };
  
  const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkRolesExisted: checkRolesExisted
  };
  
  module.exports = verifySignUp;