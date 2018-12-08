const hostname="0.0.0.0"
const port="3001"

const express = require("express");
const app = express();
const http = require("http");
const cors = require('cors');
const mysql = require("mysql");
const con = require('./connection.js'); 
con.connect(function(err) {
	if(err) throw err;
	console.log('정상적으로 MYSQL에 연결되었음');
});
//Routers
const loginRouter = require('./routes/login');
app.use(cors());
app.use(express.static('static'));
app.get("/",function(req, res) {
	console.log("home");
	res.render('./static/index');
});

const server = app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
//using router
app.use('/login', loginRouter);
