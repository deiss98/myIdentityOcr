const {Application} = require("../models/app.model.js");
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
      
      //Create a Application 
      const application = new Application({
        nom_application: dataBody.nom_application,
        description: dataBody.description,
        client_id: req.client_id,
      });
  // Save Client in the database
  Application.create(application, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Application."
      });  
          else{   
              var id = hat();
              const cle = new Cle({
                kew: id,
                description_cle: dataBody.description_cle,
                application_id:data.id,
              });

              Cle.create(cle, (err, data1) => {
                if (err)
                  res.status(500).send({
                    message:
                      err.message || "Some error occurred while creating the Application_Societe."
                  });
                 
                  else{
                    res.send({
                      application: data,
                      cle:data1,
                    })

                  }
              });
             
            }
        });
};
exports.findOne = (req, res) => {
    Client.findById(req.params.clientId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Client with id ${req.params.clientId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Client with id " + req.params.clientId
            });
          }
        } else res.send(data);
      });
};
// Update a Client identified by the clientId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.params.appId);
  var dataBody = req.body;
  Application.updateById(
    req.params.appId,
    new Application(dataBody),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Client with id ${req.params.appId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Client with id " + req.params.appId
          });
        }
      } else res.send(data);
    }
  );
};

// Find an app by Id
exports.findOne = (req, res) => {
  Application.findById(req.params.appId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Client with id ${req.params.appId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Client with id " + req.params.appId
          });
        }
      } else res.send(data);
    });
};

// Find all app
exports.findAll = (req, res) => {
  Application.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving clients."
        });
      else res.send(data);
  });
};

// exports.signin = (req, res) => {
//   var dataBody = req.body;

//     Client.findByEmail(dataBody.email, (err, data) => {
//         if (err) {
//           if (err.kind === "not_found") {
//             res.status(404).send({
//               status:false,
//               code: 404,
//               message: `Not found Client with email ${dataBody.email}.`
//             });
//           } else {
//             res.status(500).send({
//               status:false,
//               code: 500,
//               message: "Error retrieving Client with email " + dataBody.email
//             });
//           }
//         } else {
//             var passwordIsValid = bcrypt.compareSync(
//                 dataBody.password,
//                 data.password
//               );
        
//               if (!passwordIsValid) {
//                 return res.status(401).send({
//                     status:false,
//                     code:401,
//                     accessToken: null,
//                     message: "Invalid Password!"
//                 });
//               }
        
//               var token = jwt.sign({ id: data.id }, config.secret, {
//                 expiresIn: 86400 // 24 hours
//               });

//                 res.status(200).send({
//                     status:true,
//                     code:200,
//                     id: data.id,
//                     nom: data.nom,
//                     prenom: data.prenom,
//                     email: data.email,
//                     role: data.role,
//                     accessToken: token
//                 });
//         }
//       });

// };