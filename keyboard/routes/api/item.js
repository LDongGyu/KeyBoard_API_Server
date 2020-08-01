var express = require('express');
var router = express.Router();
const { Client }  = require("pg");
const Query = require('pg').Query;
const pgp = require("pg-promise")();
const db = pgp('postgres://users:user1!@localhost:5432/postgres');

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
  var category = 0;

  db.one(`SELECT id FROM category WHERE title = '${data.category}'`)
    .then(function(result){
      category = result.id;
      var query = new Query(`INSERT INTO item VALUES(${data.userId},'${data.title}','${data.id}','${data.pw}','${data.url}','${data.etc}',${category})`);
      var result = new Object();

      client.query(query);
      query.on('end', () => {
        console.log("item create success");
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
  
});

router.get('/read/:id', function(req, res, next) {
  var id = req.params.id;

  const query = new Query(`SELECT item.title as title, item.id as iD, pw, url, item.etc as etc, category.title as category
  FROM item JOIN category ON item.category_id = category.id
  WHERE item.user_id = ${id}`)
  client.query(query)

  var rows = [];

  query.on("row", function(row){
    var itemTemp = new Object();
    itemTemp.title = row.title;
    itemTemp.id = row.id;
    itemTemp.pw = row.pw;
    itemTemp.url = row.url;
    itemTemp.etc = row.etc;
    itemTemp.category = row.category;
    
    rows.push(itemTemp);
  });

  query.on('end', () => {
    res.send(rows);
    res.status(200).end();
  });
  
  query.on('error', err => {
    console.error(err.stack)
  });
});

router.post('/read/child',function(req, res, next){
  var body = req.body;
  var category = body.title;
  var userId = body.id;
  var rows = [];

  db.one(`SELECT id FROM category WHERE title = '${category}' and user_id = ${userId}`)
  .then(function(result){
    var query = new Query(`SELECT * FROM item WHERE user_id = ${userId} and category_id = ${result.id}`);
    
    client.query(query);
    query.on('row',(row)=>{
      var itemTemp = new Object();
      itemTemp.title = row.title;
      itemTemp.id = row.id;
      itemTemp.pw = row.pw;
      itemTemp.url = row.url;
      itemTemp.etc = row.etc;
      itemTemp.category = category;
      rows.push(itemTemp);
    });
  
    query.on('end', () => {
      res.send(rows);
      res.status(200).end();
    });
    
    query.on('error', err => {
      console.error(err.stack)
    });
  });
});

router.post('/update', function(req, res, next) {
  var data = req.body;
  var category = 0;

  db.one(`SELECT id FROM category WHERE title = '${data.category}'`)
  .then(function(result){
    category = result.id;
    var query = new Query("UPDATE item " +
    `SET user_id = ${data.userId}, title = '${data.title}', id = '${data.id}', pw ='${data.pw}', url = '${data.url}', etc = '${data.etc}', category_id = ${category} `+
    `WHERE user_id = ${data.userId} and title = '${data.beforeTitle}'`);
    var result = new Object();

    client.query(query);
    query.on('end', () => {
      console.log("item update success");
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
});

router.post('/delete', function(req, res, next) {
  var body = req.body;
  var id = body.userId;
  var title = body.title;
  var result = new Object();

  const query = new Query(`DELETE FROM item WHERE user_id = ${id} and title = '${title}'`);
  client.query(query)
  query.on('end', () => {
    console.log("item delete success");
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