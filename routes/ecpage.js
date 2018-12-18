const express = require('express');
const con = require('../connection');
const router = express.Router();
// 승인된 후보들
router.get('/:voteid', (req, res, next)=> {
  console.log("ecpage");
  var voteid = req.params.voteid;
  var sql = 'select distinct 정.선거회차, 정.기호, 정.정후보, 정. 정후보이름, 부.부후보, 부.부후보이름     from (select 기호, 정후보,부후보,  선거회차, 학생.이름 AS 정후보이름 from 후보, 학생 where 후보.정후보=학생.학번) AS 정   JOIN ( select 기호, 정후보,부후보, 선거회차, 학생.이름 AS 부후보이름 from 후보, 학생 where 후보.부후보=학생.학번) AS 부  ON 정.기호=부.기호 AND 정.선거회차 = 부.선거회차 where (정.선거회차=?) AND (exists (select 득표정보.선거회차, 득표정보.기호 from 득표정보 where 득표정보.선거회차=정.선거회차 AND 득표정보.기호=정.기호)) order by 정.선거회차, 정.기호';
  
  con.query(sql, voteid, (e,r,f)=> {
	if(e) throw e;
    else {
      res.send({
        status: 'success',
        result: r
      });
    }
  });
});
//후보 정보에 있는데 아직 미승인
router.get('/yet/:voteid', (req, res, next)=> {
  console.log("ecpage");
  var voteid = req.params.voteid;
  var sql = 'select distinct 정.선거회차, 정.기호, 정.정후보, 정. 정후보이름, 부.부후보, 부.부후보이름     from (select 기호, 정후보,부후보,  선거회차, 학생.이름 AS 정후보이름 from 후보, 학생 where 후보.정후보=학생.학번) AS 정   JOIN ( select 기호, 정후보,부후보, 선거회차, 학생.이름 AS 부후보이름 from 후보, 학생 where 후보.부후보=학생.학번) AS 부  ON 정.기호=부.기호 AND 정.선거회차 = 부.선거회차 where (정.선거회차=?) AND (not exists (select 득표정보.선거회차, 득표정보.기호 from 득표정보 where 득표정보.선거회차=정.선거회차 AND 득표정보.기호=정.기호)) order by 정.선거회차, 정.기호';
  
  con.query(sql, voteid, (e,r,f)=> {
    if(e) {
      res.send({
        status: 'error',
        errMsg: '에러'
      });
    }
    else {
      res.send({
        status: 'success',
        result: r
      });
    }
  });
});
//후보 승인
router.post('/voteInfomation', (req, res, next)=> {
  console.log(req.body)
	var information = req.body;

  var sql = 'insert into 득표정보 values (0,0,0,?,?)';

  var candi_num = information.candi_num;
      vote_num = information.vote_num;
      params = [candi_num, vote_num];
  con.query(sql, params, (e,r,f)=> {
      if(e) {
        res.send({
          status: 'error',
          errMsg: '승인에 실패하였습니다.'
        });
      }
  		else  {
  			console.log("success");
  			res.send({
          status:"success"
        });
  		}
    });
});
//후보 거절
router.delete('/:voteid/:candid', function(req, res, next) {
	var voteid = req.params.voteid,
	candid = req.params.candid;
	var sql = 'delete from 후보 where 선거회차=? and 기호=?';
	var params = [voteid, candid];
	con.query(sql, params, function(err, result, fields) {
		if(err) throw err;
		else {
			res.send({
				status: "success"
			});
		}
	});
});



module.exports = router;
