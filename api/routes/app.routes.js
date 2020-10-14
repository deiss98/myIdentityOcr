const { verifyToken } = require("../middlewares/authJwt");
const controller = require("../controllers/app.controller.js");
const {authJwt} = require("../middlewares");
module.exports = function(app) {

  var routesVersioning = require('express-routes-versioning')();

  app.post(
    "/api/apps/",
    [
      authJwt.verifyToken
    ],
     routesVersioning({
        "1.0.0": controller.create,
     }, Nomatch)
  );
  // Get an app
  app.put(
    "/api/apps/:appId",
    [
      authJwt.verifyToken, authJwt.isAdmin
    ],
     routesVersioning({
        "1.0.0": controller.update
     }, Nomatch)
  );

  // Get detail of an application

  app.get(
    "/api/apps/:appId",
    [
      authJwt.verifyToken, authJwt.isAdmin
    ],
     routesVersioning({
        "1.0.0": controller.findOne
     }, Nomatch)
  );

  // Get all apps
  app.get(
    "/api/apps",
    [
      authJwt.verifyToken, authJwt.isAdmin
    ],
     routesVersioning({
        "1.0.0": controller.findAll
     }, Nomatch)
  );

};



function Nomatch(req, res, next) {
    res.status(401).send({message: "no matching api version"});
   }