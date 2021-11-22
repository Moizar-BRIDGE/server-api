
var db = require('./db');
reqBodySchema = db.reqBodySchema;

//공모전 정보 다 가져오기
exports.getAllCompet=function(req,res){

    var sql = 'select * from COMPET_INFO order by C_num*1 desc'

    connection.query(sql,function(err,result){
        if(err){
            console.log(err);
        }
        else {
            res.json(result); //결과 보냄  
        }
    })  
};
