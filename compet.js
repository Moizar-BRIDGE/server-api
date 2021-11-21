
var db = require('./db');
reqBodySchema = db.reqBodySchema;

exports.getAllCompet=function(req,res){

    var sql = 'select * from COMPET_INFO '

    connection.query(sql,function(err,result){
        if(err){
            console.log(err);
        }
        else {
            res.json(result); //결과 보냄  
        }
    })  
};