const express = require('express');
const con = require('../connection');
const router = express.Router();

router.get("/", function(req, res, next) {
	console.log("login");
	var id = req.query.id,
	    password = req.query.password;
	// token 발급 안하고 단순하게 처리
	var sql = 'select 비밀번호 from 학생 where 학번=?';
	var sql2 = 'select 선거회차 from 후보, 학생 where (학생.학번=?) AND ((후보.정후보=학생.학번)OR(후보.부후보=학생.학번))'; // 후보인가?
	var sql3 = 'select 선거회차 from 선관위, 학생 where (학생.학번=?) AND (선관위.학번=학생.학번)';
	var ec=0, cand=0;
	con.query(sql, id, function(err, result, fields) {
		if(result.length!=0) {	
			if(err) throw err; // error 발생
			if(result[0].비밀번호==password) { // login 성공
				con.query(sql2,id,function(err,result2,fields) { // 후보인지 확인
					if(err) throw err;
					else {
						if(result2[0]) cand=result2[0].선거회차;
						con.query(sql3,id,function(err,result3,fields) {
							if(err) throw err;
							else {
								if(result3[0]) ec=result3[0].선거회차;
								res.send({
									status: "success",
									ec: ec,
									cand: cand
								});
							}
						});
					}
				});
//			res.send({status: "success"});
			}
			else { // login  실패
				res.send({status: "error"});
			}
		}
		else {
			res.send({status: "error"});
		}
	});
});

router.get("/exp/:id", function(req,res,next) {
	console.log("mypage");
	var id = req.params.id;
	var sql = 'select * from 이력 where 학번=?';
	con.query(sql, id, function(err, result, fields) {
		if(err) throw err;
		else {
			res.send({
				status: "success",
				result: result
			});
		}
	});
});

router.get("/name/:id", function(req,res,next) {
	var id = req.params.id;
	var sql = 'select 이름 from 학생 where 학번=?';
	con.query(sql, id, function(err, result, fields) {
		if(err) throw err;
		else {
			res.send({
				status: "success",
				result: result[0].이름
			});
		}
	});
});

module.exports = router;
