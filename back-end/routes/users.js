var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/maizuo';

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    MongoClient.connect(DB_CONN_STR,function(err,db){
        if(err){
            res.send({
                msg: '网络异常,请稍后再试'
            });
        }else{
            var conn = db.collection('users');

            conn.find({phone:req.body.phone}).count(function(err,num){

                console.log(num);
                if(err){
                    res.send({
                        msg: '网络异常,请稍后再试'
                    });
                }else if(num <= 0){
                    conn.save(req.body,function(err,info){
                        if(err){
                            res.send({
                                msg: '网络异常,请稍后再试'
                            });
                        }else{
                            res.cookie('isLogin',req.body.phone,{
                                maxAge: 10*60*1000
                            })
                            res.send({
                                isLogin: req.body.phone,
                                msg: '账号注册成功!'
                            })
                        }
                    })
                }else if(num > 0){
                    conn.find(req.body).toArray(function(err,arr){
                        if(err || arr.length <= 0){
                            res.send({
                                msg: '用户名或密码错误'
                            });
                        }else {
                            res.cookie('isLogin',arr[0].phone,{
                                maxAge: 10*60*1000
                            })
                            res.send({
                                isLogin: arr[0].phone,
                                msg: '登录成功!'
                            });
                        }
                    })
                }
            })
        }
    })
});

router.get('/reg',function(req,res,next){
    MongoClient.connect(DB_CONN_STR,function(err,db){
        if(err){
            res.send('<h1>网络异常,请稍候重试</h1>');
        }else{
            res.send('<h1>连接数据库成功</h1>')
        }
    })
});

module.exports = router;
