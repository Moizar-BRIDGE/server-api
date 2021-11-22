
var db = require('./db');
reqBodySchema = db.reqBodySchema;

//팀원으로 추가하기(팀 가입하기)
exports.postTeamMember= function(req,res){

    var uid = req.body.uid;
    var T_num = req.body.T_num;
    var resume = req.body.resume;
    

    var params = [uid,T_num,resume];

    var sql = 'insert into TEAM_MEMBERS(uid,T_num,resume,is_leader) values(?,?,?,0)'
    var sql2 = 'update TEAM set num_member = num_member + 1 where T_num = ?' 
    db.getConnection((conn)=>{
        conn.query(sql, params, function (err, result) {
        
            if (err) {
                console.log(err);
                res.status(401);
            } else {
                conn.query(sql2,T_num,function(err,result2){

                    if(err){
                        console.log(err);
                        res.status(401);
                    }
                    else
                    res.status(201);
                });
                //res.status(201);   
            } 
        });
        conn.release();
    });
};

//모든 팀원 정보 가져오기
exports.getAllTeamMember=function(req,res){

    var T_num = req.body.T_num;
    var sql = 'select * from TEAM_MEMBERS where T_num = ?'

    db.getConnection((conn)=>{
        conn.query(sql,T_num,function(err,result){
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

//팀 탈퇴하기
exports.deleteTeamMember = function(req,res){

    var uid = req.body.uid;
    var T_num = req.body.T_num;
    var params = [uid,T_num];
    var sql = 'delete from TEAM_MEMBERS where uid=? and T_num=?'

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