const express = require('express');
const con = require('../../connection');
const router = express.Router();
//해당 선거의 모든 후보
router.get('/:voteid', (req,res,next)=> {
   var voteid=req.params.voteid;
   console.log("candinfo")
   var sql = 'select distinct 정.선거회차, 정.기호, 정.정후보, 정. 정후보이름, 부.부후보, 부.부후보이름 from (select 기호, 정후보, 부후보, 선거회차, 학생.이름 AS 정후보이름 from 후보, 학생 where 후보.정후보=학생.학번) AS 정 JOIN ( select 기호, 정후보, 부후보, 선거회차, 학생.이름 AS 부후보이름 from 후보, 학생 where 후보.부후보=학생.학번) AS 부 ON 정.기호=부.기호 AND 정.선거회차 = 부.선거회차, 후보 where 정.선거회차=?;';
   con.query(sql,voteid,function(err, result, fields) {
      if(err) throw err;
      else {
         res.send({
            status: 'success',
            result: JSON.stringify(result)
         });
      }
   });
});
//해당 후보의 정보 및 공약
router.get('/:vote_num/:candi_num', (req, res, next)=>{
	var vote_num = req.params.vote_num;
			candi_num = req.params.candi_num;
	var sql = 'select distinct 정.선거회차, 정.기호, 정.정후보, 정. 정후보이름, 부.부후보, 부.부후보이름, 공약번호, 공약내용 from (select 기호, 정후보, 부후보, 선거회차, 학생.이름 AS 정후보이름 from 후보, 학생 where 후보.정후보=학생.학번) AS 정 JOIN ( select 기호, 정후보, 부후보, 선거회차, 학생.이름 AS 부후보이름 from 후보, 학생 where 후보.부후보=학생.학번) AS 부 ON 정.기호=부.기호 AND 정.선거회차 = 부.선거회차, 공약, 후보 where 정.선거회차=? and 정.기호=? and 정.기호=공약.기호 and 정.선거회차=공약.선거회차;';
	 		sql2='select distinct 이력번호, 연도, 이력내용, 학생.학번, 선거회차, 기호 from 이력, 후보, 학생 where 선거회차=? and 기호=? and 이력.학번=학생.학번 and (후보.정후보=학생.학번 or 후보.부후보=학생.학번);';
	var params = [vote_num,candi_num];
	con.query(sql, params, (e, r1, f)=> {
		con.query(sql2, params, (e, r2, f)=> {
			if(e) {
				res.send({
					status: 'error',
					errMsg: '에러'
				});
			}
			else {
				console.log(r1);
				res.send({
					status: 'success',
					result1: r1,
					result2: r2
				});
			}
		});
	});
});
//후보 등록
router.post('/register',(req,res,next)=>{
	console.log('regitser');
	var information=req.body;
	var voteid = information.voteid,
	jid = information.jid,
	bid = information.bid;
	var sql = 'INSERT INTO 후보 VALUES (?,?,?,?)';
	var sql2 = 'select COUNT(기호) AS 후보수 from 후보 where 선거회차=?';
	con.query(sql2,voteid,function(err,result,fields) {
		if(err) throw err;
		else {
			var candnum=(result[0].후보수)+1;
			var params = [candnum,jid,bid,voteid];
			con.query(sql,params,function(err,reulst,fields) {
				if(err) throw err;
				else res.send({status: "success"});
			});
		}
	});
});
//득표 순위 계산
router.put('/rank',(req,res,next)=>{
	console.log("rank");
	var information=req.body;
	var voteid = information.voteid;
	console.log(voteid);
	var sql = 'select count(*)+1 as 순위 from 득표정보 where 선거회차=? and 득표수 > (select 득표수 from 득표정보 where 선거회차=? and 기호=?)';
	var sql2 = 'update 득표정보 set 득표순위=? where 선거회차=? and 기호=?';
	var sql3 = 'select count(*) as 후보수 from 득표정보 where 선거회차=?';
	con.query(sql3, voteid, function(err, result, fields) {
		if(err) throw err;
		else {
			var num=result[0].후보수;
			console.log("num : "+num);
			for(var i=1;i<=num;i++) {
				var params = [voteid, voteid, i];
				console.log(i);
				var j=0;
				con.query(sql, params, function(err, result, fields) {
					if(err) throw err
					else {
						var rank = result[0].순위;
						console.log(rank);
						j++;
						var params2 = [rank,voteid,j];
						console.log(params2);	
						con.query(sql2,params2);
					}
				});
			}
			res.send({status:"success"});
		}
	});

});
module.exports = router;
