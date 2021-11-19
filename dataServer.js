var mysql      = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
const json = require('body-parser/lib/types/json');
var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, 'localhost', function () {
    console.log('서버 실행 중...');
    
});

// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 
var connection = mysql.createConnection({
    host     : 'dataserver.cl3y46ehchzv.ap-northeast-2.rds.amazonaws.com',    // 호스트 주소
    user     : 'admin',           // mysql user
    password : 'dh134679!',       // mysql password
    database : 'dataServer',     // mysql 데이터베이스
    port: 3306
});
  
//connection.connect();

//로그인 api : 자기자신 프로필 정보 가져오기
app.get('/users/:id', function (req, res)
{
    var uid = req.body.uid;
    var sql = 'select * from PROFILE where uid = ?'
    
    connection.query(sql,uid,function(err,result){
        if(err){
            console.log(err);
        }
        else{ //uid 저장된게 없는 경우 (처음 로그인)
            if(result.length===0){
                var message = 'new'; //첫 로그인임을 알림

                res.json({ //보내기
                    'message':message
                });  
            }
            else {
                res.json(result); //결과 보냄
            }
        }
    })  
});

//회원가입 api. 로그인하고 uid가 없을 때(프로필 정보 입력)
app.post('/users',function(req,res){
    console.log(req.body);
    
    var uid = req.body.uid;
    var name = req.body.userName;
    var image = req.body.image;
    var birth = req.body.birth;
    var blog = req.body.blog;
    var gender = req.body.gender;
    var Cate_num = req.body.Cate_num;
    var email = req.body.email;

    var sql = 'insert into PROFILE (uid,name,image,birth,blog,gender,Cate_num,email) values(?,?,?,?,?,?,?,?)';
    var params = [uid,name,image,birth,blog,gender,Cate_num,email];

    connection.query(sql, params, function (err, result) {
        
        if (err) {
            console.log(err);
        } else {
            var message = 'success';
            
        }
        res.json({
            'message': message
        });
    });

}); //첫 회원가입. 기본 정보들 입력해야 함.

//전체 회원 조회
app.get('/users', function (req, res) 
{
    var sql = 'select * from PROFILE'
    
    connection.query(sql,function(err,result){
        if(err){
            console.log(err);
        }
        else {
            res.json(result); //결과 보냄  
        }
    })  
});

//회원 정보 수정




//팀 생성 api
app.post('/teams',function(req,res){

    var C_num = req.body.C_num;
    var uid = req.body.uid;
    var tag = req.body.tag;

    var params = [C_num,uid,tag];
    var params2 = [uid,uid,C_num,tag];

    var sql = 'insert into TEAM(C_num,uid,tag) values(?,?,?)'
    
    var sql2 = 'insert into TEAM_MEMBERS(uid,T_num,is_leader,tag) values (?,(select T_num from TEAM where uid = ? and C_num = ?),true,?)'
//팀 생성 시 팀장은 자동으로 팀원 추가

    connection.query(sql,params,function(err,result){
        if (err) {
            console.log(err);
        } else {
            var message = 'success'; //팀 만들기 성공했을 경우에만 팀장 추가

            connection.query(sql2,params2,function(err,result){
                if (err) {
                    console.log(err);
                } else {
                    var message = 'success';
                }
                res.json({
                    'message': message
                });
            });
        }

        res.json({
            'message': message
        });
    });
});

//팀 삭제
app.delete('/teams/:id',function(req,res){
    var uid = req.body.uid;
    var T_num = req.body.T_num;

    var params = [uid,T_num];
    var sql = 'delete from TEAM where uid=? and T_num=?'

    connection.query(sql,params,function (err, result) {
        
        if (err) {
            console.log(err);
        } else {
            var message = 'success';
        }
    });
});

//모든 팀 정보 가져오기
app.get('/teams',function(req,res){

    var sql = 'select * from TEAM'

    connection.query(sql,function(err,result){
        if(err){
            console.log(err);
        }
        else {
            res.json(result); //결과 보냄  
        }
    })  
});

//나의 팀 정보 가져오기(공모전 정보와 함께) 전부
app.get('/teams/:id',function(req,res){

    var uid = req.body.uid;
    var sql = 'SELECT a.*,b.* FROM TEAM as a INNER JOIN COMPET_INFO as b ON a.C_num = b.C_num where a.uid = ?'

    connection.query(sql,uid,function(err,result){
        if(err){
            console.log(err);
            console.log(uid)
            console.log('sibal why')
        }
        else{ 
            if(result.length===0){
                var message = 'empty'; 

                res.json({ 
                    'message':message
                });  
            }
            else {
                res.json(result); 
            }
        }
    })
});

//팀원으로 추가하기(팀 가입하기)
app.post('/team_members',function(req,res){

    var uid = req.body.uid;
    var T_num = req.body.T_num;
    var resume = req.body.resume;
    var tag = req.body.tag;

    var params = [uid,T_num,resume,tag];

    var sql = 'insert into TEAM_MEMBERS(uid,T_num,resume,tag) values(?,?,?,?)' 
    connection.query(sql, params, function (err, result) {
        
        if (err) {
            console.log(err);
        } else {
            var message = 'success';
        }
        res.json({
            'message': message
        });
    });
});

//모든 팀원 정보 가져오기
app.get('/team_members',function(req,res){

    var sql = 'select * from TEAM_MEMBERS'

    connection.query(sql,function(err,result){
        if(err){
            console.log(err);
        }
        else {
            res.json(result); //결과 보냄  
        }
    })  
});

//팀 탈퇴하기
app.delete('/team_members/:id',function(req,res){

    var uid = req.body.uid;
    var T_num = req.body.T_num;
    var sql = 'delete from TEAM_MEMBERS where uid=? and T_num=?'
    connection.query(sql, function (err, result) {
        
        if (err) {
            console.log(err);
        } else {
            var message = 'success';
        }
    });
});

app.get('/test', function (req, res)
{
    var uid = req.body.uid;
    console.log(uid);
    res.json(uid);
});







//connection.end();