const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const {Client} = require("../models/client.model.js");

verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

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



isAdmin = (req, res, next) => {

    User.findById(req.userId, (err, data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].role === "admin") {
              next();
              return;
            }
        }
        res.status(403).send({
            message: "Require Admin Role!"
          });
          return;
    });

};

isDeveloper = (req, res, next) => {

    User.findById(req.userId, (err, data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].role === "professeur") {
              next();
              return;
            }
        }
        res.status(403).send({
            message: "Require Professeur Role!"
          });
          return;
    });
  
};

isAdminOrDeveloper = (req, res, next) => {
    User.findById(req.userId, (err, data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].role === "professeur") {
              next();
              return;
            }

            if (data[i].role === "etudiant") {
                next();
                return;
              }
        }
        res.status(403).send({
            message: "Require Professeur Or Etudiant Role!"
          });
          return;
    });

};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isDeveloper: isDeveloper,
  isAdminOrDeveloper: isAdminOrDeveloper
};
module.exports = authJwt;