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
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('item');
  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
    }
  })
});

router.post('/create', function(req, res, next) {
  console.log(req.body);
  var data = req.body;

  console.log(data.title);
  // const query = new Query(`INSERT INTO item VALUES(1,'title','id','pw','url','tec',1)`);
  const query = new Query(`INSERT INTO item VALUES(1,'${data.title}','${data.id}','${data.pw}','${data.url}','${data.etc}',1)`);

  var result = new Object();

  client.query(query);

  query.on("row",row=>{
  });
  query.on('end', () => {
    console.log("success");
    result.status = "success"
    res.json(result);
    res.status(200).end();
  });
  query.on('error', err => {
    console.error(err.stack)
    result.status = "fail"
    res.json(result);
    res.status(400).end();
  });
});

router.get('/read/:id', function(req, res, next) {
  var id = req.params.id;

  const query = new Query(`SELECT * FROM item WHERE user_id = ${id}`)
  const result = client.query(query)

  var rows = [];
  /** 
   *  row에서 데이터 가져오고 end에서 검색할 때 발생한 각종 정보, error는 오류 발생시
   */
  
  query.on("row", function(row){
    var itemTemp = new Object();
    itemTemp.title = row.title;
    itemTemp.id = row.id;
    itemTemp.pw = row.pw;
    itemTemp.url = row.url;
    itemTemp.etc = row.etc;
    
    const categoryQuery = new Query(`SELECT title FROM category WHERE user_id = ${id} and id = ${row.category_id}`);
    client.query(categoryQuery);
    
    console.log("1");
    return new Promise(function(resolve,reject){categoryQuery.on("row",category=>{
      itemTemp.category = category.title;
      rows.push(itemTemp)
      console.log("2");
      resolve();
    })});
  });

  query.on('end', () => {
    console.log("3");
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
