const express = require('express');
const con = require('../connection');
const router = express.Router();

router.get('/', (req, res, next)=>{
	con.query('SELECT * from ', (e, r, f)=> {
		if(e) {
			res.send({
				status: 'error',
				errMsg: '에러';
			});
		}
		else {
			res.send({
				status: 'success',
				data: r;
			});
		}
	});
});
