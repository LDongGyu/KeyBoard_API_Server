var express = require('express');
var router = express.Router();
const { Client }  = require("pg");
const Query = require('pg').Query

var client = new Client({
    user : 'user',
    host : 'localhost',
    database : 'postgres',
    password : 'user1!',
    port : 5432,
})
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
});

router.post('/login/:id/:pw',function(req,res,next){
  var id = req.params.id;
  var pw = req.params.pw;

  const query = new Query(`SELECT * FROM users WHERE id = '${id}' and pw = '${pw}'`);
  const result = client.query(query);

  var length = 0;

  query.on("row",row=>{
    console.log(row);
    length++;
  });
  query.on('end', () => {
    if(length == 1){
      res.send("success")
    }
    else if(length == 0){
      res.send("fail")
    }
    else{
      res.send("duplicate")
    }
    res.status(200).end();
  });
  query.on('error', err => {
    console.error(err.stack)
  });
});

router.get('/create', function(req, res, next) {
  const query = new Query("INSERT INTO users VALUES(1,'2','2')");
  const result = client.query(query);
  res.status(200).end();
});

router.get('/read', function(req, res, next) {
  const query = new Query("SELECT * FROM users")
  const result = client.query(query)

  var rows = [];
  /** 
   *  row에서 데이터 가져오고 end에서 검색할 때 발생한 각종 정보, error는 오류 발생시
   */
  query.on("row",row=>{
    rows.push(row);
  });
  query.on('end', () => {
    console.log(rows);
    console.log('query done')
    res.send(rows);
    res.status(200).end();
  });
  query.on('error', err => {
    console.error(err.stack)
  });
});

router.get('/update', function(req, res, next) {
  const query = new Query("UPDATE users " +
                          "SET user_id = 1, id='1', pw='1' "+
                          "WHERE user_id = 1");
  const result = client.query(query)
  res.status(200).end();
});

router.get('/delete', function(req, res, next) {
  const query = new Query("DELETE FROM users WHERE user_id = 1");
  const result = client.query(query)
  res.status(200).end();
});
module.exports = router;
