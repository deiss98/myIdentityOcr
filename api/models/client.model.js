// Import sql db.config.js 
const sql = require("../config/db.config.js");

// constructor
const Client = function(client) {
  this.nom = client.nom;
  this.email = client.email;
  this.contact = client.contact;
  this.mot_de_passe = client.mot_de_passe;
  this.photo = client.photo;
  this.date_modification = client.date_modification;
  this.date_creation = client.date_creation;
};

Client.create = (newClient, result) => {
  sql.query("INSERT INTO client SET ?", newClient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created client: ", { id: res.insertId, ...newClient });
    result(null, { id: res.insertId, ...newClient });
  });
};

//findKey
Client.findById = (userId, result) => {
  sql.query(`SELECT * FROM client WHERE id = ?`, [userId], (err, res) => {
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
  sql.query(`SELECT * FROM client WHERE email = ?`, [userEmail], (err, res) => {
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

// Display dev list for only user where role is admin
Client.getAll = result => {
  sql.query("SELECT * FROM client", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("clients: ", res);
    result(null, res);
  });
};

// Updated client by Email
Client.updateById = (id, client, result) => {
  console.log(id);
  sql.query(
    "UPDATE client SET nom = ?, email = ?, contact = ?, mot_de_passe = ?, photo = ?,WHERE id = ?",
    [client.nom, client.email, client.contact, client.mot_de_passe, client.photo,client.date_modification, id],
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

// delete client by id only for admin
Client.remove = (id, result) => {
  sql.query("DELETE FROM client WHERE id = ?", id, (err, res) => {
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

module.exports = {
    Client: Client,
};