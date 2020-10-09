const {Client} = require("../models/client.model.js");
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); 

exports.signup = (req, res) => {
      // Validate request
      if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      var dataBody = req.body;
      
      // Create an Client
      const client = new Client({
        nom: dataBody.nom,
        email: dataBody.email,
        contact: dataBody.contact,
        mot_de_passe: bcrypt.hashSync(dataBody.mot_de_passe,8),
        photo: dataBody.photo, 
      });
  // Save application in the database
  Client.create(client, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client."
      });
    else res.send(data);
  });
};


exports.signin = (req, res) => {
    var dataBody = req.body;
  
      Client.findByEmail(dataBody.email, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found User with email ${dataBody.email}.`
              });
            } else {
              res.status(500).send({
                message: "Error retrieving User with email " + dataBody.email
              });
            }
          } else {
              var passwordIsValid = bcrypt.compareSync(
                  dataBody.mot_de_passe,
                  data.mot_de_passe
                );
          
                if (!passwordIsValid) {
                  return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                  });
                }
          
                var token = jwt.sign({ id: data.id, role:data.role }, config.secret, {
                  expiresIn: 86400 // 24 hours
                });
                   
                  res.status(200).send({
                    id: data.id,
                    nom: data.nom,
                    email: data.email,
                    role: data.role,
                    accessToken: token
                  });
          }
        });
  
  };