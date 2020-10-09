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
    req.client_id = decoded.id;
    req.client_role = decoded.role;
    next();
  });
};

isAdmin = (req, res, next) => {

  if (req.client_role === "admin") {
      next();
      return;
  }

      res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
};

isDeveloper = (req, res, next) => {

  if (req.client_role === "dev") {
      next();
      return;
  }
  
   res.status(403).send({
          message: "Require Developer Role!"
        });
        return;
};


const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isDeveloper: isDeveloper,
  // isAdminOrDeveloper: isAdminOrDeveloper
};
module.exports = authJwt;