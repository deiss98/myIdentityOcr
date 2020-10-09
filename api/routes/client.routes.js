const { verifyToken } = require("../middlewares/authJwt.js");
const authJwt = require("../middlewares/authJwt.js");

module.exports = app => {
    const client = require("../controllers/client.controller.js");
    const {verifySignUp} = require("../middlewares");
    // Create a new Client
    app.post("/api/clients", [verifySignUp.checkDuplicateEmail],client.create);
  
    // Retrieve all Client
    app.get("/api/clients", client.findAll);
  
    // Retrieve a single Client with clientId
    app.get("/api/clients/:clientId", client.findOne);
  
    // Update a Client with clientId
    app.put("/api/clients/:clientId", [authJwt.verifyToken, authJwt.isAdmin],client.update);
  
    // Delete a Client with customerId
    app.delete("/api/clients/:clientId", client.delete);
  
    // Create a new Customer
    app.delete("/api/clients", client.deleteAll);
  };
