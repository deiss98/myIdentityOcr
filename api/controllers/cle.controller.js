const {Cle} = require("../models/cle.model.js");
const config = require("../config/auth.config");
var hat = require('hat');

// Create an key
exports.create = (req, res) => {
      // Validate request
      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      var dataBody = req.body;

      var id = hat();
      console.log(id);
       const cle = new Cle({
        kew: id,
         description_cle: dataBody.description_cle,
         application_id:req.params.appId,
      });
      Cle.create(cle, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while generate the key."
          });
         
          else{
           res.send({
             cle: data,
           })
          }
      });
};

// Update an key
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    var dataBody = req.body;
    Cle.updateById(
      req.params.cleId,
      new Cle(dataBody),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Cle with id ${req.params.cleId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Cle with id " + req.params.cleId
            });
          }
        } else res.send(data);
      }
    );
  };





// Revoke an key 
exports.revoke = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var dataBody = req.body;
  console.log(req.params.cleId);
  Cle.revokebyId(
    req.params.cleId,
    new Cle(dataBody),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cle with id ${req.params.cleId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Cle with id " + req.params.cleId
          });
        }
      } else res.send(data);
    }
  );
};
  
