const express = require('express');
const con = require('../../connection');
const router = express.Router();
const datautil = require('data-utils');
const moment = require('moment');
//게시글 목록  조회
router.get("/:boardid", function(req, res, next) {
	var boardid = req.params.boardid;
	console.log("read board"+boardid);
	con.query("SELECT * FROM 게시글 WHERE 게시판번호 = ? ORDER BY 게시글작성일시 DESC", boardid, function(err, result, fields) {
		if(err) res.send({ status: "error" });
		else {
			console.log(boardid);
			res.send({
				status: "success",
				result: JSON.stringify(result[0])
			});
		}
	});
});

// 게시글 조회
router.get("/:postid", function(req, res, next) {
	console.log("post read");
	var postId = req.params.postid;
	con.query("SELECT * FROM 게시글 WHERE 게시글번호 = ?", postId, function(err, result, fields) {
		if(err) res.send({status: "error"});
		else {
			res.send({
				status: "success",
				result: JSON.stringify(result[0])
			});
		}
	});
});

//게시글 등록
router.post("/", function(req, res, next) {
	console.log("create post");
	// 현재 시각 받아옴
	var newDate = new Date();
	var time = new moment().format('YYYY-MM-DD HH:mm:ss');
	var information = req.body.information; // request 파싱
	var sql = 'INSERT INTO 게시글 (게시글작성일시, 게시글내용, 학번, 게시글제목, 게시판번호) VALUES (?,?,?,?,?)';
	
	var writetime = time,
	content = information.content,
	writerID = information.writerID,
	title = information.title,
	boardid = information.boardid;
	var params = [writetime, content, writerID, title, boardid];
	con.query(sql,params,function(err,rows,fields) {
		if(err) console.log(err);
		else  {
			console.log("success");
			res.send({status:"success"})
		}
	});

});

//게시글 수정
router.put("/", function(req, res, next) {
	var newDate = new Date();
	var time = new moment().format('YYYY-MM-DD HH:mm:ss');

	console.log("update post");
	var information = JSON.parse(req.body.information);
	var postid = information.postid,
	title = information.title,
	content = information.content,
	writetime = time;
	var params = [title, content, writetime, postid];
	var sql = 'UPDATE 게시글 SET 게시글제목=?, 게시글내용=?, 게시글작성일시=? WHERE  게시글번호=?';
	con.query(sql,params,function(err,result,fields) {
		if(err) res.send({status: "error"});
		else {
			console.log(result);
			res.send({status: "success"});
		}
	});
});

//게시글 삭제
router.delete("/:postid", function(req, res, err) {
	console.log("delete");
	var postid=req.params.postid;
	var sql = 'DELETE FROM 게시글 WHERE 게시글번호=?';
	con.query(sql, posrid, function(err, rows, fields) {
		if(err) console.log(err);
		else console.log("success");
	});
});

module.exports = router;
