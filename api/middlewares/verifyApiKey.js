const {Client} = require("../models/client.model.js");

verifyToken = (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send({
      message: "No Api key provided!"
    });
  }

  const apikey = authHeader.split(' ')[1];

  Client.findKey(req.body.email, (err, data) => {
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

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authenticateEnt = (req, res, next) => {
  const authHeader = req.headers.authorization;
 // console.log("authHeader :",authHeader);
  if (authHeader) {
      const apikey = authHeader.split(' ')[1];
      connection.connect( function () {
        connection.query(`SELECT nom_entreprise FROM entreprises WHERE apikey = ?`, [apikey], function(error, entreprise) {
          if (error) {
            return res.sendStatus(403);
          } 
        //  console.log('entreprise[0] :',entreprise[0]);
          req.entreprise = entreprise[0];
          next();
        });
      });
      
  } else {
      res.sendStatus(401);
  }
};


// need to add content-type as application/json
checkkeyExist = (req, res, next) => {
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


  
  const verifyApiKey = {
    checkkeyExist: checkkeyExist,
  };
  
  module.exports = verifyApiKey;