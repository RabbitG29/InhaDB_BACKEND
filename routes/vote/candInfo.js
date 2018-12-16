const express = require('express');
const con = require('../../connection');
const router = express.Router();

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

router.get('/:vote_num/:candi_num', (req, res, next)=>{
	var vote_num = req.params.vote_num;
			candi_num = req.params.candi_num;
	var sql = 'select distinct 정.선거회차, 정.기호, 정.정후보, 정. 정후보이름, 부.부후보, 부.부후보이름, 공약번호, 공약내용 from (select 기호, 정후보, 부후보, 선거회차, 학생.이름 AS 정후보이름 from 후보, 학생 where 후보.정후보=학생.학번) AS 정 JOIN ( select 기호, 정후보, 부후보, 선거회차, 학생.이름 AS 부후보이름 from 후보, 학생 where 후보.부후보=학생.학번) AS 부 ON 정.기호=부.기호 AND 정.선거회차 = 부.선거회차, 공약, 후보 where 정.선거회차=? and 정.기호=? and 후보.기호=공약.기호 and 후보.선거회차=공약.선거회차;';
	con.query(sql, vote_num, candi_num, (e, r, f)=> {
		if(e) {
			res.send({
				status: 'error',
				errMsg: '에러'
			});
		}
		else {
			res.send({
				status: 'success',
				data: r
			});
		}
	});
});

module.exports = router;
