
var db = require('./db');
reqBodySchema = db.reqBodySchema;

//팀 생성 API
exports.postTeam= function(req,res){

    var C_num = req.body.C_num;
    var uid = req.body.uid;
    var tag = req.body.tag;
    var limit_member = req.body.limit_member;
    var limit_date = req.body.limit_date;
    var num_member = req.body.num_member;
    var title = req.body.title;


    var params = [C_num,uid,tag,limit_member,limit_date,num_member,title];
    var params2 = [uid,uid,C_num,tag];

    var sql = 'insert into TEAM(C_num,uid,tag,limit_member,limit_date,d_day,title) values(?,?,?,?,?,DATEDIFF(limit_date, now()),?,?)'
    
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

//모든 팀 정보 가져오기(공모전 정보와 함께) -> 팀 검색 화면에 띄울 api(첫 화면)
exports.getAllTeam = function(req,res){

    var uid = req.params.id;
    var sql = 'SELECT a.T_num,DATEDIFF(a.limit_date, now()) as d_day,a.title, a.limit_member,a.num_member ,b.C_num,b.C_name,b.Cate_num,c.is_book FROM TEAM as a LEFT JOIN COMPET_INFO as b ON a.C_num = b.C_num LEFT JOIN BOOKMARK as c ON a.T_num =(select c.T_num where c.uid = ?)'

    db.getConnection((conn)=>{
        conn.query(sql,uid,function(err,result){
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

//선택한 팀 정보 가져오기
exports.getSelectTeam = function(req,res){

    var uid = req.body.uid;
    var T_num = req.body.T_num;
    var params = [uid,T_num];

    var sql = 'SELECT a.T_num,DATEDIFF(a.limit_date, now()) as d_day,a.title, a.limit_member,a.num_member ,b.C_num,b.C_name,b.Cate_num,c.is_book FROM TEAM as a LEFT JOIN COMPET_INFO as b ON a.C_num = b.C_num LEFT JOIN BOOKMARK as c ON a.T_num =(select c.T_num where c.uid = ?) where a.T_num = ?'
    
    db.getConnection((conn)=>{
        conn.query(sql,params,function(err,result){
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

}


//나의 팀 정보 가져오기(공모전 정보와 함께)
exports.getTeam = function(req,res){

    var uid = req.params.id;
    var sql = 'SELECT a.T_num,DATEDIFF(a.limit_date, now()) as d_day,a.title, a.limit_member,a.num_member ,b.C_num,b.C_name,b.Cate_num FROM TEAM as a LEFT JOIN COMPET_INFO as b ON a.C_num = b.C_num where a.uid = ?'

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

