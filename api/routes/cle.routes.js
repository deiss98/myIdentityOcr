const { verifyToken } = require("../middlewares/authJwt");
const controller = require("../controllers/cle.controller.js");
const {authJwt} = require("../middlewares");
module.exports = function(cle) {

  var routesVersioning = require('express-routes-versioning')();

  cle.post(
    "/api/apps/:appId/cles",
    [
      authJwt.verifyToken,
    ],
     routesVersioning({
        "1.0.0": controller.create
     }, Nomatch)
  );

  cle.put(
    "api/cles/:cleId",
    [
      authJwt.verifyToken,
    ],
     routesVersioning({
        "1.0.0": controller.update
     }, Nomatch)
  );

  cle.put(
    "api/cles/:cleId/revoke",
    [
      authJwt.verifyToken,
    ],
     routesVersioning({
        "1.0.0": controller.revoke
     }, Nomatch)
  );



};

function Nomatch(req, res, next) {
    res.status(401).send({message: "no matching api version"});
   }