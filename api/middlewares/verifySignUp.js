const {Client} = require("../models/client.model.js");

// need to add content-type as application/json
checkDuplicateEmail = (req, res, next) => {
    Client.findByEmail(req.body.email, (err, data) => {
        if (data) {
            res.status(400).send({
              status:false,
              code:400,
              message: "Echec! l'email is already in use!"
            });
            return;
        }
        next();
    }); 
};


  
  const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
  };
  
  module.exports = verifySignUp;