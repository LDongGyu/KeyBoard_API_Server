var express = require('express');
var router = express.Router();
const { Client }  = require("pg");

// ver.1
// var connectionString = "pg://user:user1!@localhost:5432/postgres";
// var client = new pg.Client(connectionString);
// client.connect();

// ver.2
// var connectionString = {
//   user : 'user',
//   host : 'localhost',
//   database : 'postgres',
//   password : 'user1!',
//   port : 5432,
// };
// var pool = new pg.Pool(connectionString);

// ver.3
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
  res.send('item');
  var query = "SELECT * FROM item";
  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  client.query(query, (err, res) => {
    if(err) throw err
    console.log(res)
    client.end()
  })
});

router.get('/create', function(req, res, next) {
  var rows = new Array();
  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  });

router.get('/read', function(req, res, next) {
  const Query = require('pg').Query
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
  });
  query.on('error', err => {
    console.error(err.stack)
  });
});

router.get('/update', function(req, res, next) {
  res.send('item update');
});

router.get('/delete', function(req, res, next) {
  res.send('item delete');
});
module.exports = router;
