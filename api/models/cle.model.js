const sql = require("../config/db.config.js");

// constructor
const Cle = function(cle) {
  this.kew = cle.kew;
  this.description_cle = cle.description_cle;
  this.application_id = cle.application_id;
};

//=====>Start Cle function

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

Cle.findKey = (kew, result) => {
  sql.query(`SELECT * FROM cle WHERE kew = ?`, [kew], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
     // console.log("found cle: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Cle with the id
    result({ kind: "not_found" }, null);
  });
};



Cle.findById = (id, result) => {
  sql.query(`SELECT * FROM cle WHERE id = ?`, [id], (err, res) => {
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




Cle.updateById = (id, cle, result) => {
  var updateTime = Date.now();
  sql.query(
    "UPDATE cle SET  description_cle = ?, date_modification = ? WHERE id = ?",
    [cle.description_cle, cle.date_modification],
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

Cle.removeAll = result => {
  sql.query("DELETE FROM cle", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cles`);
    result(null, res);
  });
};

//=====>End Cle function


module.exports = {
    Cle: Cle,
}