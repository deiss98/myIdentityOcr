const sql = require("../config/db.config.js");

// constructor
const Cle = function(cle) {
  this.cle = cle.nom;
  this.email = cle.email;
  this.contact = cle.contact;
  this.mot_de_passe = cle.mot_de_passe;
  this.photo = cle.photo;
  this.date_creation = cle.date_creation;
  this.date_modification = cle.date_modification;
};

Cle.create = (newCle, result) => {
  sql.query("INSERT INTO cle SET ?", newCle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cle: ", { id: res.insertId, ...newCle });
    result(null, { id: res.insertId, ...newCle });
  });
};

//findKey

Cle.findById = (userId, result) => {
  sql.query(`SELECT * FROM cle WHERE id = ?`, [userId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cle: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Cle with the id
    result({ kind: "not_found" }, null);
  });
};

Cle.findByEmail = (userEmail, result) => {
  sql.query(`SELECT * FROM cle WHERE email = ?`, [userEmail], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cle: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Cle with the id
    result({ kind: "not_found" }, null);
  });
};

Cle.getAll = result => {
  sql.query("SELECT * FROM clients", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("clients: ", res);
    result(null, res);
  });
};
Cle.updateById = (id, cle, result) => {
  sql.query(
    "UPDATE cle SET nom = ?, email = ?, contact = ?, mot_de_passe = ?, photo = ? WHERE id = ?",
    [cle.nom, cle.email, cle.contact, cle.mot_de_passe, cle.photo, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Cle with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cle: ", { id: id, ...cle });
      result(null, { id: id, ...cle });
    }
  );
};

Cle.remove = (id, result) => {
  sql.query("DELETE FROM cle WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Cle with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cle with id: ", id);
    result(null, res);
  });
};

// Cle.removeAll = result => {
//   sql.query("DELETE FROM clients", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} clients`);
//     result(null, res);
//   });
// };

module.exports = {
    Cle: Cle,
};