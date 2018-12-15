const express = require('express');
const con = require('../../connection');
const router = express.Router();

router.get('/', (req, res, next)=>{
	con.query('Select distinct 후보.기호, 정후보, 부후보, 공약번호, 공약내용 From 후보, 공약, 학생 Where 정후보=학생.학번 or 부후보=학생.학번 and 후보.기호=공약.기호 and 후보.선거회차=공약.선거회차;', (e, r, f)=> {
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

router.get('/studentname', (req,res,next)=> {
  con.query('Select 학번, 이름 from 학생, 후보 where 학생.학번=후보.정후보 union Select 학번, 이름 from 학생, 후보 where 학생.학번=후보.부후보;', (e,r,f)=> {
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
