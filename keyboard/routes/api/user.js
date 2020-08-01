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

router.get('/:id',function(req,res,next){
  var id = req.params.id;

  const query = new Query(`SELECT userid FROM users WHERE id = '${id}'`);
  const result = client.query(query);

  query.on("row",row=>{
    id = row.userid;
  });
  query.on('end', () => {
    var result = new Object();
    result.id = id;
    res.json(result);
    res.status(200).end();
  });
  query.on('error', err => {
    console.error(err.stack)
  });
});

router.post('/login/:id/:pw',function(req,res,next){
  var id = req.params.id;
  var pw = req.params.pw;
  console.log(id);
  console.log(pw);
  const query = new Query(`SELECT * FROM users WHERE id = '${id}' and pw = '${pw}'`);
  const result = client.query(query);

  var length = 0;

  query.on("row",row=>{
    console.log(row);
    length++;
  });
  query.on('end', () => {
    var result = new Object();
    if(length == 1){
      result.status = "success"
    }
    else if(length == 0){
      result.status = "fail"
    }
    else{
      result.status = "duplicate"
    }
    res.json(result);
    res.status(200).end();
  });
  query.on('error', err => {
    console.error(err.stack)
  });
});

router.post('/signUp',function(req,res,next){
  var id = req.params.id;
  var pw = req.params.pw;

  const query = new Query(`INSERT INTO users(id,pw) VALUES('${id}','${pw}')`);
  var result = new Object();

  client.query(query);

  query.on("row",row=>{
    console.log(row);
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

router.get('/update', function(req, res, next) {
  var data = req.body;
  console.log(data);

  const query = new Query("UPDATE users " +
                          `SET userid = ${data.userid}, id='${data.id}', pw='${data.pw}' `+
                          "WHERE userid = 1");
  var result = new Object();
  client.query(query);
  query.on('end', () => {
    console.log("user update success");
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

router.post('/delete', function(req, res, next) {
  var userid = req.body.userid;
  const query = new Query(`DELETE FROM users WHERE userid = ${userid}`);
  client.query(query)
  var result = new Object();
  query.on('end', () => {
    console.log("user delete success");
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

router.post('/pwchange', function(req, res, next){
  var reqBody = req.body;
  const query = new Query("UPDATE users "+
                          `SET pw = '${reqBody.newpw}'`+
                          `WHERE userid = ${reqBody.userid}`);
  var result = new Object();
  client.query(query);
  query.on('end',()=>{
    console.log("user pw update success");
    result.status = "success";
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
module.exports = router;
