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

router.post('/create', function(req, res, next) {
  var data = req.body;
  const query = new Query(`INSERT INTO category(etc,user_id,title) VALUES('${data.etc}',${data.id},'${data.title}')`);
  var result = new Object();

  client.query(query);
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
  const query = new Query(`SELECT title, etc FROM category WHERE user_id = ${id}`);
  var rows = [];

  client.query(query);
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

router.post('/update', function(req, res, next) {
  var data = req.body;
  var query = new Query("UPDATE category " +
  `SET title = '${data.title}', etc = '${data.etc}' `+
  `WHERE user_id = ${data.id} and title = '${data.beforeTitle}'`);
  var result = new Object();

  client.query(query);
  query.on('end', () => {
    console.log("category update success");
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
  var body = req.body;
  var id = body.userId;
  var title = body.title;
  var result = new Object();

  const query = new Query(`DELETE FROM category WHERE user_id = ${id} and title = '${title}'`);
  client.query(query)
  query.on('end', () => {
    console.log("category delete success");
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

module.exports = router;
