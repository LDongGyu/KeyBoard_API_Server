var express = require('express');
var router = express.Router();
const { Client }  = require("pg");
const Query = require('pg').Query

var client = new Client({
    user : 'users',
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
  res.send('item');
  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
});

router.get('/create', function(req, res, next) {
  const query = new Query("INSERT INTO item VALUES(6,'테스트','testID','testPW','url','etc',1)");
  const result = client.query(query)
  res.status(200).end();
});

router.get('/read', function(req, res, next) {
  const query = new Query("SELECT * FROM item")
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
  const query = new Query("UPDATE item " +
                          "SET user_id = 1, title = '업뎃', id = 'id', pw ='pw', url = 'url', etc = 'etc', category_id = 1 "+
                          "WHERE user_id = 5");
  const result = client.query(query)
  res.status(200).end();
});

router.get('/delete', function(req, res, next) {
  const query = new Query("DELETE FROM item WHERE user_id = 1");
  const result = client.query(query)
  res.status(200).end();
});
module.exports = router;
