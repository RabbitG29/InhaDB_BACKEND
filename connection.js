const mysql = require("mysql");
const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "todtod2018",
	database: "inha"
});

module.exports = con;
