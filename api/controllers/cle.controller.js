const {Cle} = require("../models/cle.model.js");
const config = require("../config/auth.config");
var hat = require('hat');


exports.create = (req, res) => {
      // Validate request
      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      var dataBody = req.body;

      var id = hat();
       const cle = new Cle({
         cle: id,
         description_cle: req.body.description_cle,
         application_id:req.params.appId,
      });
      console.log(req.body.description_cle);
      Cle.create(cle, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Application."
          });
         
          else{
           res.send({
             cle: data,
           })
          }
      });

  // Save Cle in the database
  // Application_Societe.create(cle, (err, data1) => {
  //   if (err)
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the Application."
  //     });
  //     else{
  //     // Create a Cle 
  //     var id = hat();
  //     const cle = new Cle({
  //       cle: id,
  //       description: dataBody.description,
  //       application_id:req.abonnement_id ,
  //     });
                
  //       Cle.create(cle, (err, data) => {
  //         if (err)
  //           res.status(500).send({
  //             message:
  //               err.message || "Some error occurred while creating the Application."
  //           });
           
  //           else{
              
  //            res.send({
  //              application_societe: data1,
  //              cle: data
  //            })
  //           }
  //       });
  //     }
  // });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.params.cleId);
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
  
