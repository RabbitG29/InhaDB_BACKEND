const express = require('express');
const con = require('../connection');
const router = express.Router();

router.get("/", function(req, res, next) {
	console.log("login");
	var id = req.query.id,
	    password = req.query.password;
	// token 발급 안하고 단순하게 처리
	var sql = 'select 비밀번호 from 학생 where 학번=?';
	con.query(sql, id, function(err, result, fields) {
		if(result==null) {
			res.send({status: "error"});
		}
		if(err) throw err; // error 발생
		if(result[0].비밀번호==password) { // login 성공
			res.send({status: "success"});
		}
		else { // login  실패
			res.send({status: "error"});
		}
	});
});

module.exports = router;
