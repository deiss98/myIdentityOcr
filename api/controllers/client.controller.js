// const Client = require("../models/client.model.js");
const {Client, db} = require("../models/client.model.js");

// Create and Save a new Client
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var dataBody = JSON.parse(req.body.data);
  // Create a Client
  const client = new Client({
    nom: dataBody.nom,
    email: dataBody.nom,
    motDePasse: dataBody.motDePasse,
    telephone: dataBody.telephone,
    role: dataBody.role
  });

  // Save Client in the database
  Client.create(client, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client."
      });
    else res.send(data);
  });
};

// Retrieve all clients from the database.
exports.findAll = (req, res) => {
    Client.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving clients."
          });
        else res.send(data);
    });
};

// Find a single Client with a clientId
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
  if (!req.body.data) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  var dataBody = JSON.parse(req.body.data);
  Client.updateById(
    req.params.clientId,
    new Client(dataBody),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Client with id ${req.params.clientId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Client with id " + req.params.clientId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Client with the specified clientId in the request
exports.delete = (req, res) => {
  Client.remove(req.params.clientId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Client with id ${req.params.clientId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Client with id " + req.params.clientId
        });
      }
    } else res.send({ message: `Client was deleted successfully!` });
  });
};

// Delete all clients from the database.
exports.deleteAll = (req, res) => {
  
};