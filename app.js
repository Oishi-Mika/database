var sqlite3 = require('sqlite3').verbose()
var bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(express.static('public'));
app.set('view engine', 'pug')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

var db = new sqlite3.Database('instagram.db')

app.get('/', function (req, res, next) {
    var query = "\
        SELECT p.post_id,p.account, p.content, p.datetime, i.photo_id\
        FROM  post p, follow f, include i\
        WHERE p.account = f.followee_id and  f.follower_id = 'aseihurricane' and  i.post_id = p.post_id\
        ORDER BY p.datetime asc\ ;\
        ";
        console.log("DBG:" + query);
    db.all(query, {}, function (err, rows) {
        if (err) {
            console.log("ERROR: " + err.message);
        }
        res.render('index', {
            results: rows
        })
    })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))


