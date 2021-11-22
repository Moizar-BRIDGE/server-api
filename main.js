var db = require('./db');
reqBodySchema = db.reqBodySchema;

//사람들 프로필 가져오기(메인)
exports.getUser_main= function (req, res) 
{
    var uid = req.params.id;
    var sql = '(SELECT a.uid,a.name,a.image,c.tech_name,a.school,a.major, b.is_like from PROFILE as a LEFT JOIN INTEREST as b ON a.uid =(select b.inter_uid  where b.uid = ?) LEFT JOIN STACK as c ON a.uid = c.uid group by a.uid order by a.uid*1 desc limit 30) order by rand() desc limit 5 '
    
    db.getConnection((conn)=>{
        conn.query(sql,uid,function(err,result){
            if(err){
                console.log(err);
                res.status(500);
            }
            else {
                res.status(200); 
                res.json(result); //결과 보냄  
            }
        });
        conn.release();
    });
};

//공모전 정보 가져오기(메인)
exports.getCompet_main= function (req, res) 
{

    //공모전 마감날짜 안지난것 중에 다섯개 뽑아옴. 랜덤으로.
    var sql = '(select a.image, a.d_day,a.C_num,a.C_name, b.Cate_name from COMPET_INFO as a LEFT JOIN CATEGORY as b on a.Cate_num = b.Cate_num where C_endDate > date_format(now(), "%Y-%m-%d") order by C_endDate*1 desc limit 30) order by rand() desc limit 5'
    var sql2 = 'update COMPET_INFO set nowdate = now(), d_day = (DATEDIFF(C_endDate, now()))'
    db.getConnection((conn)=>{

        conn.query(sql2,function(err,result){
            if(err){
                console.log(err);
                res.status(500);
            }
        });

        conn.query(sql,function(err,result){
            if(err){
                console.log(err);
                res.status(500);
            }
            else {
                res.status(200); 
                res.json(result); //결과 보냄  
            }
        });
        conn.release();
    });
};