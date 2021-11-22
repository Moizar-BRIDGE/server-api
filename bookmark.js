var db = require('./db');
reqBodySchema = db.reqBodySchema;

//북마크 처리
exports.putBookmark = function(req,res){
    var uid = req.body.uid;
    var T_num = req.body.T_num;

    var params = [uid,T_num];
    var sql = 'insert into BOOKMARK set uid = ?, T_num = ?'

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

//북마크 취소
exports.deleteBookmark = function(req,res){

    var uid = req.body.uid;
    var T_num = req.body.T_num;

    var params = [uid,T_num];
    var sql = 'delete from BOOKMARK where uid=? and T_num=?'

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
}