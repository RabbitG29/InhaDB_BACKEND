const express = require('express');
const con = require('../connection');
const router = express.Router();

router.get("/", function(req, res, next) {
	console.log("login");
	//TODO : login
	var id = req.query.id,
	    password = req.query.password;
	var sql = 'select password from Test where id=?';
	con.query(sql, id, function(err, result, fields) {
		if(err) throw err;
		if(result[0].password==password) { // login 성공
			res.send({status: "success"});
		}
		else {
			res.send({status: "error"});
		}
	});
});

module.exports = router;
