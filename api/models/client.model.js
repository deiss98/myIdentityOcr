const sql = require("../config/db.config.js");

// constructor
const Client = function(client) {
  this.nom = client.nom;
  this.email = client.email;
  this.motDepasse = client.motDePasse;
  this.telephone = client.telephone;
  this.role = client.role;
};
const db = {};

Client.create = (newUser, result) => {
  sql.query("INSERT INTO clients SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created client: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};



Client.findById = (userId, result) => {
  sql.query(`SELECT * FROM clients WHERE id = ?`, [userId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found client: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Client with the id
    result({ kind: "not_found" }, null);
  });
};

Client.findByEmail = (userEmail, result) => {
  sql.query(`SELECT * FROM clients WHERE email = ?`, [userEmail], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found client: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Client with the id
    result({ kind: "not_found" }, null);
  });
};

Client.getAll = result => {
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

Client.updateById = (id, client, result) => {
  sql.query(
    "UPDATE clients SET nom = ?, prenom = ?, email = ?, password = ?, telephone = ?, role = ? WHERE id = ?",
    [client.nom, client.prenom, client.email, client.password, client.telephone, client.role, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Client with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated client: ", { id: id, ...client });
      result(null, { id: id, ...client });
    }
  );
};

Client.remove = (id, result) => {
  sql.query("DELETE FROM clients WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Client with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted client with id: ", id);
    result(null, res);
  });
};

// Client.removeAll = result => {
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

db.ROLES = ["client", "admin"];
module.exports = {
    Client: Client,
    db: db,
};