

var db = require('./db');
reqBodySchema = db.reqBodySchema;

//로그인
exports.getUser = function(req,res)
{
    var uid = req.params.id;
    var sql = 'select name,image from PROFILE where uid = ?'


    db.getConnection((conn)=>{
        conn.query(sql,uid,function(err,result){
            if(err){
                console.log(err);
                res.status(401);
            }
            else{ //uid 저장된게 없는 경우 (처음 로그인)
                if(result.length===0){
                    var message = 'new'; //첫 로그인임을 알림
    
                    res.json({ //보내기 
                        'message':message
                    });  
                }
                else {
                    res.status(200); 
                    res.json(result); //결과 보냄
                }
            }
        })  
        conn.release();
    });

    
};

//회원가입 api. 로그인하고 uid가 없을 때(프로필 정보 입력)
exports.postUser = function (req,res){

    //console.log(req.body);
    var uid = req.body.uid;
    var name = req.body.name;
    var image = req.file.location;
    //var birth = req.body.birth;
    //var blog = req.body.blog;
    //var gender = req.body.gender;
    
    var email = req.body.email;
    var school = req.body.school;
    var major = req.body.major;
    var resume = req.body.resume;

    const validError = reqBodySchema.validate(name);
    if(validError.length > 0){
        return res.status(400).json({'error': 1, 'message' :validError[0].message});
    };

    var sql = 'insert into PROFILE (uid,name,image,emaile,school,major,resume) values(?,?,?,?,?,?,?)';
    var params = [uid,name,image,email,school,major,resume];
    db.getConnection((conn)=>{
        conn.query(sql, params, function (err, result) 
        {
            if (err) {
                console.log(err);
                res.status(401);
            } else {
                res.status(201);
            }
        });
        conn.release();
    });
    
}; //첫 회원가입. 기본 정보들 입력해야 함.

//전체 회원 조회
exports.getAllUser = function (req, res) 
{
    var uid = req.params.id;
    var sql = 'SELECT a.uid,a.name,a.image,c.tech_name,a.school,a.major, b.is_like from PROFILE as a LEFT JOIN INTEREST as b ON a.uid = (select b.inter_uid  where b.uid = ?) LEFT JOIN STACK as c ON a.uid = c.uid group by a.uid order by a.uid*1 desc'
    
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

//내 프로필 조회
exports.getMyProfile = function(req,res){

    

    var uid = req.params.id;
    var params = [uid];
    var sql = 'SELECT a.*,b.tech_name,c.li_name,d.Award FROM PROFILE as a LEFT JOIN STACK as b ON a.uid = b.uid LEFT JOIN CERTIFICATE as c ON a.uid = c.uid LEFT JOIN PART_HIST as d ON a.uid = d.uid where a.uid = ?'
    
    db.getConnection((conn)=>{
        conn.query(sql,params,function(err,result){
            console.log(result);
            if(err){
                console.log(err);
                res.status(401).json;
            }
            else {
                
                res.status(200).json(result); //결과 보냄  
            }
        });
        conn.release();
    });

};

//회원정보 수정
exports.updateUser =function (req, res) 
{

    const validError = reqBodySchema.validate(req.body.name)
    if(validError.length > 0){
        return res.status(400).json({'error': 1, 'message' :validError[0].message})
    }


    var uid = req.params.id;
    var name = req.body.name;
    var image = req.file.location;
    var birth = req.body.birth;
    var blog = req.body.blog;
    var gender = req.body.gender;
    //var Cate_num = req.body.Cate_num;
    var email = req.body.email;
    var school = req.body.school;
    var major = req.body.major;
    var resume = req.body.resume;

    var params = [name,image,birth,blog,gender,email,school,major,resume,uid];
    var sql = 'update PROFILE set name = ?, image = ?, birth = ?, blog = ?, gender = ?, emaile = ? ,school=?, major =?,resume=? where uid = ?'
    
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




