const { verifyToken } = require("../middlewares/authJwt.js");
const authJwt = require("../middlewares/authJwt.js");

module.exports = app => {
    const client = require("../controllers/client.controller.js");
    const {verifySignUp} = require("../middlewares");  
    // Retrieve all Client
    app.get("/api/clients", [authJwt.verifyToken, authJwt.isAdmin] ,client.findAll);
  
    // Retrieve a single Client with clientId
    app.get("/api/clients/:clientId", [authJwt.verifyToken, authJwt.isAdmin] ,client.findOne);
  
    // Update a Client with clientId
    app.put("/api/clients/:clientId", [authJwt.verifyToken],client.update);
  
    // Delete a Client with customerId
    app.delete("/api/clients/:clientId", [authJwt.verifyToken, authJwt.isAdmin] ,client.delete);
  
    // Create a new Customer
    app.delete("/api/clients", [authJwt.verifyToken, authJwt.isAdmin], client.deleteAll);
  };
