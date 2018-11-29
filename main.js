const hostname="0.0.0.0"
const port="3001"

const express = require("express");
const app = express();
const http = require("http");
const mysql = require("mysql");
const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "todtod2018",
	database: "inha"
});
con.connect(function(err) {
	if(err) throw err;
	console.log('정상적으로 MYSQL에 연결되었음');
});
app.use(express.static('static'));
app.get("/",function(req, res) {
	console.log("home");
	res.render('./static/index');
});

const server = app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
