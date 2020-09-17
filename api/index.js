/*jshint esversion: 9 */ 
// "use strict";
 /*jshint sub:true*/
 const express = require("express");
 const bodyParser = require("body-parser");
 
 const app = express();
 
 
 // parse requests of content-type: application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: true }));
 // parse requests of content-type: application/json
 app.use(bodyParser.json());
 // app.set('json spaces', '\t'); //if you want formatted output.
 //app.use(cors(corsOptions));
 app.use(function (req,res,next) {//"http://localhost:8100"
   res.header("Access-Control-Allow-Origin","*");
   res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
   res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Authorization, X-XSRF-TOKEN, Accept");
   res.header("Access-Control-Allow-Credentials","true");
   next();
 
 });
 
 // simple route
 app.get("/", (req, res) => {
   res.json({ message: "Welcome to my application." });
 });

//ici les routes 
 require('./routes/auth.routes')(app);

 
 // set port, listen for requests
 app.listen(3100, () => {
   console.log("Server is running on port 3100.");
 });