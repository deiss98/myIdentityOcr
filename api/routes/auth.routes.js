const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {

  var routesVersioning = require('express-routes-versioning')();

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateEmail,
    ],
     routesVersioning({
        "1.0.0": controller.signup
     }, Nomatch)
  );

  app.post("/api/auth/signin",
  routesVersioning({
     "1.0.0": controller.signin
  }, Nomatch));
};

function Nomatch(req, res, next) {
    res.status(401).send({message: "no matching api version"});
   }