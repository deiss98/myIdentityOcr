const controller = require("../controllers/ocr.controller.js");
module.exports = function(app) {
  const { verifyApiKey } = require("../middlewares");

  var routesVersioning = require('express-routes-versioning')();

  app.post(
    "/api/ocr/processImage",
    [
      verifyApiKey.checkkeyExist
    ],
     routesVersioning({
        "1.0.0": controller.proccess
     }, Nomatch)
  );
};

function Nomatch(req, res, next) {
    res.status(401).send({message: "no matching api version"});
   }