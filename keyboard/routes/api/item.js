var express = require('express');
var router = express.Router();
var pg = require("pg");

// PostgreSQL 연동
var connectionString = "pg://user:passwd@localhost:5432/dbName";
var client = new pg.clinet(connectionmString);
client.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('item');
});

router.get('/create', function(req, res, next) {
  res.send('item create');
});

router.get('/read', function(req, res, next) {
  var queryString= "SELECT * FROM items";
  var query = client.query(queryString);
  var rows = [];

  /** 
   *  row에서 데이터 가져오고 end에서 검색할 때 발생한 각종 정보, error는 오류 발생시
   */
  query.on("row",(row)=>{
    rows.addRow(row);
  });
  query.on('end', function(row,err) {
    esponse.render('index', {
      title: 'Express',
      data:rows
    });
  });
  query.on('error', function(error) {
    console.log("ERROR!!" + error);
    response.render('index', {
      title: title,
      data: null,
      message: "ERROR is occured!"
    });
  });

  res.send('item read');
});

router.get('/update', function(req, res, next) {
  res.send('item update');
});

router.get('/delete', function(req, res, next) {
  res.send('item delete');
});
module.exports = router;
