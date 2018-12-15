const express = require('express');
const con = require('../../connection');
const moment = require('moment');
const router = express.Router();
router.get("/:postid", function(req, res, nex) {
	console.log("comment");
	con.query("select * from 학생;", (err, mresult, fields)=>{
		var postid = req.params.postid;
		var m = JSON.parse(JSON.stringify(mresult))

		var sql = 'select * from 게시글댓글 where 게시글번호=?';
		con.query(sql,postid,function(err,result,fields) {
			if(err) throw err;
			else {
				var r = JSON.parse(JSON.stringify(result));
				for(var i=0;i<r.length;i++) {
					for(var j=0;j<m.length;j++) {
						if(m[j].학번==r[i].학번) {
							r[i].이름 = m[j].이름;
							break;
						}
					}
				}
				console.log(r);
				res.send({
					status: "success",
					result: JSON.stringify(r)});
			}
		});
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
