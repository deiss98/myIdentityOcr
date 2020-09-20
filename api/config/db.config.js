var mysql      = require('mysql');
var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "misteradmin",
    password: "carlos97",
    database: "myIdentityOcr",
    socketPath: "/opt/lampp/var/mysql/mysql.sock",
    dateStrings: 'date',
    multipleStatements: true
  });
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;
