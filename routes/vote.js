const express = require('express');
const con = require('../connection');
const router = express.Router();
const candInfo = require('./vote/candInfo');
//투표 목록 조회
router.get("/", function(req, res, next) {
	console.log("vote list");
	var sql = "SELECT * from 선거정보";
	con.query(sql,function(err,result,fields) {
		if(err) throw err;
		else {
			console.log(result);
			res.send({
				status: "success",
				result: JSON.stringify(result)
			});
		}
	});
});
//투표 정보 조회
router.get("/:voteid", function(req, res, next) {
	var voteid = req.params.voteid;
	console.log("vote"+voteid);
	var sql = "SELECT * from 선거정보 where 선거회차=?";
	con.query(sql,voteid,function(err,result,fields) {
		if(err) throw err;
		else {
			console.log(result);
			res.send({
				status: "success",
				result: JSON.stringify(result)
			});
		}
	});
});

router.use('/candInfo', candInfo);
module.exports = router;
