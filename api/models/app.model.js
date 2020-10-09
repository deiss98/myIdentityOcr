const sql = require("../config/db.config.js");

//constructor
// constructor for application
const Application = function(application) {
  this.nom_application   = application.nom_application;
  this.description       = application.description;
  this.client_id         = application.client_id;
  this.date_creation     = application.date_creation;
  this.date_modification = application.date_modification;
};

// create
Application.create = (newApplication, result) => {
  sql.query("INSERT INTO application SET ?", newApplication, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created application: ", { id: res.insertId, ...newApplication });
    result(null, { id: res.insertId, ...newApplication });
  });
};

//findKey admin access
Application.findById = (application_id, result) => {
  sql.query(`SELECT * FROM application WHERE id = ?`, [application_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found application: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found application with the id
    result({ kind: "not_found" }, null);
  });
};

// get all app admin acess
Application.getAll = result => {
  sql.query("SELECT * FROM application", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("application: ", res);
    result(null, res);
  });
};


Application.updateById = (id, application, result) => {
  sql.query(
    "UPDATE application SET nom_application = ?, desciption = ?, date_modification = ?, WHERE id = ?",
    [application.nom_application, application.description, application.date_modification, id],
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

      console.log("updated application: ", { id: id, ...application });
      result(null, { id: id, ...application });
    }
  );
};

Application.remove = (id, result) => {
  sql.query("DELETE FROM application WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found application with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted application with id: ", id);
    result(null, res);
  });
};

module.exports = {
  Application: Application,  
};