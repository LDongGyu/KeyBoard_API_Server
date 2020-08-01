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
  console.log("category create");
  const query = new Query(`INSERT INTO category(etc,userid,title) VALUES('${data.etc}',${data.id},'${data.title}')`);
  client.query(query);
  var result = new Object();
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

  const query = new Query(`SELECT title, etc FROM category WHERE userid = ${id}`);
  client.query(query);

  var rows = [];

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
  console.log(data)

  var query = new Query("UPDATE category " +
  `SET title = '${data.title}', etc = '${data.etc}' `+
  `WHERE userid = ${data.id} and title = '${data.beforetitle}'`);
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
  var id = body.userid;
  var title = body.title;
  console.log("delete");
  console.log(req.params);
  const query = new Query(`DELETE FROM category WHERE userid = ${id} and title = '${title}'`);
  client.query(query)
  var result = new Object();

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
