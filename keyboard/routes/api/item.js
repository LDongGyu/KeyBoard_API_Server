var express = require('express');
var router = express.Router();
const { Client }  = require("pg");
const Query = require('pg').Query;

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
  console.log("item create");
  var data = req.body;
  console.log(data)
  var category = 0;

  const pgp = require("pg-promise")();
  const db = pgp('postgres://users:user1!@localhost:5432/postgres');

  db.one(`SELECT id FROM category WHERE title = '${data.category}'`)
    .then(function(result){
      category = result.id;
      var query = new Query(`INSERT INTO item VALUES(${data.userid},'${data.title}','${data.id}','${data.pw}','${data.url}','${data.etc}',${category})`);
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
  const result = client.query(query)

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