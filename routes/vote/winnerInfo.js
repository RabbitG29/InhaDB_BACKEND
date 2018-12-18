const express = require('express');
const con = require('../../connection');
const router = express.Router();
router.get('/',function(req,res,next){
	console.log("alsdhsalthsdlakh");
	console.log("winner");
	var sql="select distinct 정.선거회차, 정.기호, 정.정후보, 정. 정후보이름, 부.부후보, 부.부후보이름 from ( select 당선후보.기호, 정후보,당선후보.선거회차, 학생.이름 AS 정후보이름 from 당선후보, 학생 ,후보 where 당선후보.기호=후보.기호 AND 당선후보.선거회차=후보.선거회차 AND 후보.정후보=학생.학번) AS 정 JOIN ( select 당선후보.기호,부후보, 당선후보.선거회차, 학생.이름 AS 부후보이름 from 당선후보, 학생,후보 where 당선후보.기호=후보.기호 AND 당선후보.선거회차=후보.선거회차 AND 후보.부후보=학생.학번) AS 부 ON 정.기호=부.기호 AND 정.선거회차 = 부.선거회차 order by 정.선거회차 desc;";
	con.query(sql,function(err,result,fields){
		if(err) throw err;
		else{
			console.log(result);
			res.send({
				status:"success",
				result: JSON.stringify(result)

			});
		}
	});
});

router.get('/in/:id',function(req,res,next){
	console.log("winner");
	var winid=req.params.id;
	var sql="select distinct d.기호, do.공약번호, g.공약내용, do.이행여부 from 당선후보 as d, 공약 as g, 학생 as s, 당선자공약 as do where d.선거회차=? and d.기호=g.기호 and d.선거회차=g.선거회차 and do.기호=d.기호 and do.선거회차=d.선거회차 and g.공약번호=do.공약번호";
	con.query(sql,winid,function(err,result,fields){
		if(err) throw err;
		else{
			console.log(result);
			res.send({
				status:"success",
				result: JSON.stringify(result)
			});
		}
	});
});


router.get('/in/busi/:id',function(req,res,next){
	console.log("alsdhsalthsdlakh");
	console.log("business");
	var winid=req.params.id;
	var sql="select b.사업번호, b.사업이름, b.사업내용,b.사업평가 from 공약외사업 as b where b.선거회차=?";
	con.query(sql,winid,function(err,result,fields){
		if(err) throw err;
		else{
			console.log(result);
			res.send({
				status:"success",
				result: JSON.stringify(result)
			});
		}
	});
});



router.get('/in/career/:id',function(req,res,next){
	console.log("alsdhsalthsdlakh");
	console.log("career");
	var winid=req.params.id;
	var sql="select distinct ca.이력번호,ca.연도, ca.이력내용 from 이력 as ca, 당선후보 as d, 후보 as c where d.선거회차=? and c.선거회차=? and d.기호=c.기호 and c.정후보=ca.학번";
	sql2="select distinct ca.이력번호,ca.연도, ca.이력내용 from 이력 as ca, 당선후보 as d, 후보 as c where d.선거회차=? and c.선거회차=? and d.기호=c.기호 and c.부후보=ca.학번"
	var par=[winid,winid];
	con.query(sql,par,function(err,result,fields){
		con.query(sql2,par,function(err,result2,fields){
		if(err) throw err;
		else{
			console.log(result);
			console.log(result2);
			res.send({
				status:"success",
				result: JSON.stringify(result),
				result2:JSON.stringify(result2)
			});
		}

		});
	});
});
module.exports=router;
