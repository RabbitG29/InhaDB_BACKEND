const express = require('express');
const con = require('../../connection');
const router = express.Router();
const datautil = require('data-utils');
const moment = require('moment');
//게시글 목록  조회
router.get("/:boardid", function(req, res, next) {
	var boardid = req.params.boardid;
	console.log("read board"+boardid);
	con.query("select * from 학생", (err,mresult,fields)=>{
		var m = JSON.parse(JSON.stringify(mresult));
		con.query("SELECT * FROM 게시글 WHERE 게시판번호 = ? ORDER BY 게시글작성일시 DESC", boardid, function(err, result, fields) {
			if(err) res.send({ status: "error" });
			else {
				console.log(boardid);
				console.log(result);
				var r = JSON.parse(JSON.stringify(result));
				for(var i=0;i<r.length;i++) {
					for(var j=0;j<m.length;j++) {
						if(m[j].학번==r[i].학번) {
							r[i].이름=m[j].이름;
							break;
						}
					}
				}
				res.send({
					status: "success",
					result: JSON.stringify(r)
				});
			}
		});
	});
});

// 게시글 조회
router.get("/content/:postid", function(req, res, next) {
	console.log("post read");
	con.query("select * from 학생",(err,mresult,fields)=>{
		var postId = req.params.postid;
		var m = JSON.parse(JSON.stringify(mresult));
		con.query("SELECT * FROM 게시글 WHERE 게시글번호 = ?", postId, function(err, result, fields) {
			if(err) throw err;
			else {
				var r = JSON.parse(JSON.stringify(result));
				for(var i=0;i<r.length;i++) {
					for(var j=0;j<m.length;j++) {
						if(m[j].학번==r[i].학번) {
							r[i].이름=m[j].이름;
							break;
						}
					}
				}
				console.log(r);
				res.send({
					status: "success",
					result: JSON.stringify(r)
				});
			}
		});
	});
});

//게시글 등록
router.post("/", function(req, res, next) {
	console.log("create post");
	// 현재 시각 받아옴
	var newDate = new Date();
	var time = new moment().format('YYYY-MM-DD HH:mm:ss');
	console.log(req.body)
	var information = req.body; // request 파싱
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
	var information = req.body;
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
	con.query(sql, postid, function(err, rows, fields) {
		if(err) throw err;
		else {
			console.log("success");
			res.send({status:"success"});
		}
	});
});

module.exports = router;
