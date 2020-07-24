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

router.get('/create', function(req, res, next) {
  const query = new Query("INSERT INTO item VALUES(2,'etc',1,'title')");
  client.query(query);
  res.status(200).end();
});

router.get('/read/:id', function(req, res, next) {
  var id = req.params.id;

  const query = new Query(`SELECT title FROM category WHERE user_id = ${id}`);
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

router.get('/update', function(req, res, next) {
  const query = new Query("UPDATE item " +
                          "SET id = 1, etc = '1', user_id = 1, title = '1' "+
                          "WHERE user_id = 5");
  const result = client.query(query)
  res.status(200).end();
});

router.get('/delete', function(req, res, next) {
  const query = new Query("DELETE FROM category WHERE id = 1");
  const result = client.query(query)
  res.status(200).end();
});
module.exports = router;
