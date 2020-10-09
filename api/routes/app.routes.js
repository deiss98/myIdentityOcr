const { verifyToken } = require("../middlewares/authJwt");
const controller = require("../controllers/app.controller.js");
//const authJwt = require("../middlewares/authJwt");
const {authJwt} = require("../middlewares");
module.exports = function(app) {

  var routesVersioning = require('express-routes-versioning')();

  app.post(
    "/api/apps/",
    [
      authJwt.verifyToken,
    ],
     routesVersioning({
        "1.0.0": controller.create
     }, Nomatch)
  );
};

function Nomatch(req, res, next) {
    res.status(401).send({message: "no matching api version"});
   }