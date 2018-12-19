const express = require('express');
const con = require('../connection');
const router = express.Router();
const candInfo = require('./vote/candInfo');
const winnerInfo = require('./vote/winnerInfo');
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
router.get("/info/:voteid", function(req, res, next) {
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
//투표 결과 조회
router.get("/result/:voteid", function(req,res,next) {
	var voteid = req.params.voteid;
	var sql = "select distinct 정.기호, 정.선거회차, 정. 정후보이름, 부.부후보이름, 득표수, 득표율, 득표순위 from (select 기호, 정후보, 부후보, 선거회차, 학생.이름 AS 정후보이름 from 후보, 학생 where 후보.정후보=학생.학번) AS 정 JOIN ( select 기호, 정후보, 부후보, 선거회차, 학생.이름 AS 부후보이름 from 후보, 학생 where 후보.부후보=학생.학번) AS 부 ON 정.기호=부.기호 AND 정.선거회차 = 부.선거회차, 후보, 득표정보 where 정.선거회차=? and (정.기호=득표정보.기호 and 정.선거회차 =득표정보.선거회차) ORDER BY 득표순위";
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
//투표 여부 조회
router.get("/verify/:voteid/:id", function(req,res,next) {
	console.log("verify");
	var voteid = req.params.voteid,
	id = req.params.id;
	var params = [voteid, id];
	var sql = "select 투표여부 from 학생투표참여 where 선거회차=? AND 학번=?";
	con.query(sql,params,function(err, result, fields) {
		if(err) throw err;
		else {
			console.log(result);
			res.send({
				status: "success",
				result: result[0].투표여부
			});
		}
	});
});
//실제 투표 진행
router.put("/", function(req, res, next) {
	console.log(req.body);
	console.log(req.body.information);
	var information = req.body;
	var voteid = information.voteid,
	candid = information.candid,
	stuid = information.stuid;
	console.log(stuid);
	console.log("투표 for "+candid+" of "+voteid);
	var params = [voteid, candid];
	var sql = 'update 득표정보 set 득표수=득표수+1 where 선거회차=? and 기호=?'; // 후보자 득표수 계산
	var sql2 = 'update 선거정보 set 투표수=투표수+1 where 선거회차=?'; // 선거정보 투표수 계산
	var sql3 = 'select 투표수, COUNT(학번) AS 학생수  from 선거정보, 학생 where 선거회차=?'; // 투표수 증가 후의 투표수 및 학생수  받아옴
	var sql4 = 'update 득표정보 set 득표율=득표수/? where 선거회차=? and 기호=?'; // 후보의 득표율 계산
	var sql5 = 'update 선거정보 set 투표율=투표수/? where 선거회차=?'; // 선거의 투표율 계산
	var sql6 = 'update 학생투표참여 set 투표여부=1 where 선거회차=? and 학번=?';
	con.beginTransaction(function(err) {//트랜잭션 시작, 오류날 경우 rollback으로 원래대로 돌림, 제대로 될 경우 commit	
		con.query(sql,params,function(err,result,fields) {
			if(err) {
				con.rollback();
				throw err;
			}
			else { // 후보자의 득표수 1 증가 성공
				con.query(sql2,voteid,function(err,result,fields) {
					if(err) {
						con.rollback();
						throw err;
					}
					else { // 투표수까지 1 증가 성공
						con.query(sql3,voteid,function(err,result,fields) {
							if(err) {
								con.rollback();
								throw err;
							}
							else { // 투표수랑 학생수 받아옴
								var votenum = result[0].투표수,
								stunum = result[0].학생수;
								console.log(votenum+", "+stunum);
								var params2 = [votenum,voteid,candid];
								con.query(sql4, params2, function(err, result, fields) {
									if(err) {
										con.rollback();
										throw err;
									}
									else { // 후보의 득표율 update 완료
										var params3 = [stunum,voteid,candid];
										con.query(sql5, params3, function(err, result, fields) {
											if(err) {
												con.rollback();
												throw err;
											}
											else { // 투표율 계산하여 적용  완료
												var params4 = [voteid, stuid];
												con.query(sql6, params4, function(err, result, fields) {
													if(err) {
														con.rollback();
														throw err;
													}
													else {//투표여부 update 완료
														con.commit(); // 트랜잭션 완료
														res.send({status:"success"});
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	});
});
router.use('/winnerInfo',winnerInfo);
router.use('/candInfo', candInfo);
module.exports = router;
