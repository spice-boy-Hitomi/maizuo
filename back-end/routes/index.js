var express = require('express');
var router = express.Router();
var http = require('http');

//允许跨域配置
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/lunbo', function (req, res) {

    var time = new Date().getTime();

    http.get('http://m.maizuo.com/v4/api/billboard/home?__t=' + time, function (response) {

        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        })
        response.on('end',function(chunk){
            res.send(data);
        })
    });
})
router.get('/now',function(req,res){
    var time = new Date().getTime();

    http.get('http://m.maizuo.com/v4/api/film/now-playing?__t='+ time +'&page=1&count=5',function(response){
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        })
        response.on('end',function(chunk){
            res.send(data);
        })
    });
})
router.get('/coming',function(req,res){
    var time = new Date().getTime();

    http.get('http://m.maizuo.com/v4/api/film/coming-soon?__t='+ time +'&page=1&count=3',function(response){
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        })
        response.on('end',function(chunk){
            res.send(data);
        })
    });
})
router.get('/movie/now',function(req,res){
    var time = new Date().getTime();

    http.get('http://m.maizuo.com/v4/api/film/now-playing?page=1&count=7',function(response){
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        })
        response.on('end',function(chunk){
            res.send(data);
        })
    });
})
router.get('/movie/coming',function(req,res){
    var time = new Date().getTime();

    http.get('http://m.maizuo.com/v4/api/film/coming-soon?page=1&count=7',function(response){
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        })
        response.on('end',function(chunk){
            res.send(data);
        })
    });
})
router.get('/detail',function(req,res){
    var time = new Date().getTime();

    http.get('http://m.maizuo.com/v4/api/film/'+ req.query.id +'?__t='+ time,function(response){
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        })
        response.on('end',function(chunk){
            res.send(data);
        })
    });
})
router.get('/cinema',function(req,res){
    var time = new Date().getTime();

    http.get('http://m.maizuo.com/v4/api/cinema?__t='+ time,function(response){
        var data = '';
        response.on('data', function (chunk) {
            data += chunk;
        })
        response.on('end',function(chunk){
            res.send(data);
        })
    });
})

module.exports = router;
