const express = require('express');
const con = require('../../connection');
const router = express.Router();
router.get('/',function(req,res,next){
	console.log("alsdhsalthsdlakh");
	console.log("winner");
	var sql="SELECT * from 당선후보 order by 선거회차 desc";
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
module.exports=router;
