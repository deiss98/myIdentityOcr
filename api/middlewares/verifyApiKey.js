const { Cle } = require("../models/cle.model.js");

checkkeyExist = (req, res, next) => {
  let authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send({
      message: "No Api key provided!"
    });
  }

  const apikey = authHeader.split(' ')[1];

  Cle.findKey(apikey, (err, data) => {
    if (err) {
        res.status(400).send({
          status:false,
          code:400,
          message: "Echec! l'email is already in use!"
        });
       // console.log(data);
        return;
    }
    
    next();
  });

};

// // const authenticateEnt = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//  // console.log("authHeader :",authHeader);
//   if (authHeader) {
//       const apikey = authHeader.split(' ')[1];
//       connection.connect( function () {
//         connection.query(`SELECT nom_entreprise FROM entreprises WHERE apikey = ?`, [apikey], function(error, entreprise) {
//           if (error) {
//             return res.sendStatus(403);
//           } 
//         //  console.log('entreprise[0] :',entreprise[0]);
//           req.entreprise = entreprise[0];
//           next();
//         });
//       });
      
//   } else {
//       res.sendStatus(401);
//   }
// };


// need to add content-type as application/json
// checkkeyExist = (req, res, next) => {
//     Cle.findByKew(req.body.cle, (err, data) => {
//         if (data) {
//             res.status(400).send({
//               status:false,
//               code:400,
//               message: "Echec! l'email is already in use!"
//             });
//             return;
//         }
//         next();
//     }); 
// };


  
  const verifyApiKey = {
    checkkeyExist: checkkeyExist,
  };
  
  module.exports = verifyApiKey;