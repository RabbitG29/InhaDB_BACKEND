const express = require('express');
const con = require('../../connection');
const moment = require('moment');
const router = express.Router();
router.get("/:postid", function(req, res, nex) {
	console.log("comment");
	var postid = req.params.postid;

	var sql = 'select 댓글번호, 댓글작성일시, 댓글내용, 게시글댓글.학번, 학생.이름 from 게시글댓글,학생 where 게시글번호=? AND 게시글댓글.학번=학생.학번';
	con.query(sql,postid,function(err,result,fields) {
		if(err) throw err;
		else {
			res.send({
				status: "success",
				result: JSON.stringify(result)});
		}
	});
});
//등록
router.post("/", function(req, res, next) {
	console.log("create comment");
	var time = new moment().format('YYYY-MM-DD HH:mm:ss');
	var information = req.body;
	var sql = 'INSERT INTO 게시글댓글 (댓글작성일시, 댓글내용, 게시글번호, 학번) VALUES (?, ?, ?, ?)'
	var postId = information.postId,
	createtime = time,
	content = information.content,
	writerID = information.writerID;
	var params = [createtime, content, postId, writerID];
	con.query(sql,params,function(err, result, fields) {
		if(err) throw err;
		else {
			console.log(result);
			res.send({status: "success"});
		}
	});
});
//수정
router.put("/", function(req, res, next) {
	console.log("update comment");
	var newDate = new Date();
	var time = new moment().format('YYYY-MM-DD HH:mm:ss');
	var information = req.body;
	var sql = 'UPDATE 게시글댓글 SET 댓글내용=?, 댓글작성일시=? where 댓글번호=?'
	var content = information.content,
	commentId = information.commentId;
	var params = [content, time, commentId];
	con.query(sql, params, function(err, result, fields) {
		if(err) throw err;
		else {
			console.log(result);
			res.send({status: "success"});
		}
	});
});
//삭제
router.delete("/:id", function(req, res, err) {
	console.log("delete comment");
	var commentId = req.params.id;
	var sql = 'DELETE FROM 게시글댓글 where 댓글번호 = ?';
	con.query(sql, commentId, function(err, rows, fields) {
		if(err) throw err;
		else {
			console.log(rows);
			res.send({status:"success"});
		}
	});
});

module.exports = router;
