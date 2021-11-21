var mysql      = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const json = require('body-parser/lib/types/json');
var app = express();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const fs = require('fs'); // 설치 x
const path = require('path'); // 설치 x

const config = require('./db.json');
const configs3 = require('./s3.json');
require('dotenv').config();

var getC = require('./db');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


    app.listen(3000, 'localhost', function () {
        console.log('서버 실행 중...');
        
    });
    
    
    //s3 연결
    const s3 = new aws.S3(configs3);
      
      const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: "moizaimage", // 버킷 이름
            //contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
            acl: 'public-read', // 클라이언트에서 자유롭게 가용하기 위함
            key: (req, file, cb) => {
                console.log(file);
                cb(null, file.originalname)
            },
        }),
      });
    
      

    //connection.connect();


//유저, 프로필 관련
var userApi = require('./user');

app.get('/users/login/:id', userApi.getUser);//로그인 api. main에 띄울 것 만 가져옴
app.post('/users', upload.single('image'),userApi.postUser);//회원가입 api. 로그인하고 uid가 없을 때(프로필 정보 입력)
app.get('/users', userApi.getAllUser);//전체 회원 조회
app.put('/users/:id',upload.single('image'),userApi.updateUser);//유저 업데이트
app.get('/users/:id',userApi.getMyProfile); //내 프로필 정보 가져오기

//메인화면 api
var mainApi = require('./main');
app.get('/main/user', mainApi.getUser_main);//메인화면 프로필 보기
app.get('/main/compet',mainApi.getCompet_main);//메인화면 공모전 정보 보기


//팀 생성 api
var teamApi = require('./team');
app.post('/teams', teamApi.postTeam);
app.delete('/teams/:id',teamApi.deleteTeam);//팀 삭제
app.get('/teams',teamApi.getAllTeam);//모든 팀 정보 가져오기
app.get('/teams/:id',teamApi.getTeam);//나의 팀 정보 가져오기(공모전 정보와 함께) 전부


//팀 멤버 관리 api
var team_memberApi = require('./team_member');

app.post('/team_members',team_memberApi.postTeamMember);//팀원으로 추가하기(팀 가입하기)
app.get('/team_members',team_memberApi.getAllTeamMember);//모든 팀원 정보 가져오기
app.post('/team_members/delete',team_memberApi.deleteTeamMember);//팀 탈퇴하기


//공모전 정보 api
var competApi = require('./compet');
app.get('/compets', competApi.getAllCompet);//공모전 정보 가져오기. 넣는건 크롤링서버에서 함



app.post('/test',(req,res)=>{

    var uid = req.body.uid;
    var sql = 'insert into TEST(test) values(?)'
    getC.getConnection((conn)=>{
        conn.query(sql, uid, function (err, result) {
        
            if (err) {
                console.log(err);
            } else {
                var message = 'success';    
            }
            res.json({
                'message': message
            });
        });
        conn.release();

    });
});


//connection.end();

