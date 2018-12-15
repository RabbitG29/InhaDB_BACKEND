const express = require('express');
const con = require('../../connection');
const router = express.Router();

router.get('/', (req, res, next)=>{
	con.query('SELECT * from 게시판', (e, r, f)=> {
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
router.get('/:id', (req, res, next)=>{
	var id = req.params.id;
	console.log('board');
	if(id) {
		con.query('SELECT * FROM 게시판 WHERE 게시판번호=?', id, (e,r,f) => {
			if(e) {
				res.send({
					status: 'error',
					errMsg: '에러가'
				})
			}
			else {
				if(r.length == 1) {
					res.send({
						status: 'success',
						data: r[0]
					})
				}
				else {
					res.send({
						status: 'error',
						data: '게시판 존재x'
					})
				}
			}
		})
	}
	else {
		con.query('SELECT * from 게시판', (e,r,f)=>{
			if(e){
				res.send({
					status: 'error',
					errMsg: '에러'
				})
			}
			else {
				res.send({
					status: 'success',
					data: r
				})
			}
		})
	}
});

router.post('/', function(req, res, next){
	console.log(req.body.information);
	var information = req.body.information;
	var boardName = information.boardName,
	boardNote = information.boardNote;
	var params=[ boardName, boardNote];
	var sql = 'INSERT INTO 게시판 ( 게시판이름, 게시판설명) VALUES(?,?)';
	con.query(sql, params, (e,r,f)=>{
		if(e) throw e;
		else {
			res.send({status:'success'});
		}
	});
});

module.exports = router;
