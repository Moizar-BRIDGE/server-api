
var db = require('./db');
reqBodySchema = db.reqBodySchema;

exports.postTeam= function(req,res){

    var C_num = req.body.C_num;
    var uid = req.body.uid;
    var tag = req.body.tag;

    var params = [C_num,uid,tag];
    var params2 = [uid,uid,C_num,tag];

    var sql = 'insert into TEAM(C_num,uid,tag) values(?,?,?)'
    
    var sql2 = 'insert into TEAM_MEMBERS(uid,T_num,is_leader,tag) values (?,(select T_num from TEAM where uid = ? and C_num = ?),true,?)'
//팀 생성 시 팀장은 자동으로 팀원 추가
    db.getConnection((conn)=>{
        conn.query(sql,params,function(err,result){
            if (err) {
                console.log(err);
            } else {
                //팀 만들기 성공했을 경우에만 팀장 추가
                conn.query(sql2,params2,function(err,result){
                    if (err) {
                        console.log(err);
                        res.status(401);
                    } else {
                        res.status(201); 
                    }
                   
                });
            }
            
        });
        conn.release();
    });
   
};

//팀 삭제
exports.deleteTeam = function(req,res){
    var uid = req.params.id;
    var T_num = req.body.T_num;

    var params = [uid,T_num];
    var sql = 'delete from TEAM where uid=? and T_num=?'

    db.getConnection((conn)=>{
        conn.query(sql, params, function (err, result) {
        
            if (err) {
                console.log(err);
                res.status(401);
            } else {
                res.status(200);   
            }
            
        });
        conn.release();

    });
};

//모든 팀 정보 가져오기(공모전 정보와 함께)
exports.getAllTeam = function(req,res){

    var sql = 'SELECT a.*,b.* FROM TEAM as a LEFT JOIN COMPET_INFO as b ON a.C_num = b.C_num'

    db.getConnection((conn)=>{
        conn.query(sql,function(err,result){
            if(err){
                console.log(err);
                res.status(401);
            }
            else {
                res.status(200); 
                res.json(result); //결과 보냄  
            }
        });
        conn.release();
    });
};

//나의 팀 정보 가져오기(공모전 정보와 함께)
exports.getTeam = function(req,res){

    var uid = req.params.id;
    var sql = 'SELECT a.*,b.* FROM TEAM as a INNER JOIN COMPET_INFO as b ON a.C_num = b.C_num where a.uid = ?'

    db.getConnection((conn)=>{
        conn.query(sql,function(err,result){
            if(err){
                console.log(err);
                res.status(401);
                
            }
            else{ 
                if(result.length===0){
                    var message = 'empty';  //내 팀 정보 없음
                    res.status(204);  
                }
                else {
                    res.status(200);
                    res.json(result); 
                }
            }
        });
        conn.release();
    });
};

