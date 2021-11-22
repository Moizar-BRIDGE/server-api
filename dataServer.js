var mysql = require('mysql');
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


    app.listen(8080, 'ec2-52-79-41-120.ap-northeast-2.compute.amazonaws.com', function () {
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
app.get('/users/alluser/:id', userApi.getAllUser);//전체 회원 조회
app.put('/users/:id',upload.single('image'),userApi.updateUser);//유저 업데이트
app.get('/users/:id',userApi.getMyProfile); //내 프로필 정보 가져오기 - 다른사람 프로필 가져올때는 다른사람 id 보내주면 됨.

//메인화면 api
var mainApi = require('./main');
app.get('/main/users/:id', mainApi.getUser_main);//메인화면 프로필 보기
app.get('/main/compets',mainApi.getCompet_main);//메인화면 공모전 정보 보기

//좋아요 처리 api
var likeApi = require('./like');
app.post('/like',likeApi.putLike); //좋아요 사람 추가
app.post('/like/delete',likeApi.deleteLike); //좋아요 사람 삭제

//팀 생성 api
var teamApi = require('./team');
app.post('/teams', teamApi.postTeam); //팀 생성
app.post('/teams/:id',teamApi.deleteTeam);//팀 삭제
app.get('/teams',teamApi.getAllTeam);//모든 팀 정보 가져오기
app.get('/teams/:id',teamApi.getTeam);//나의 팀 정보 가져오기(공모전 정보와 함께) 전부
app.get('/teams/select',teamApi.getSelectTeam);//선택한 팀 정보 가져오기

//팀 멤버 관리 api
var team_memberApi = require('./team_member');
app.post('/team_members',team_memberApi.postTeamMember);//팀원으로 추가하기(팀 가입하기)
app.get('/team_members',team_memberApi.getAllTeamMember);//팀원 정보 가져오기
app.post('/team_members/delete',team_memberApi.deleteTeamMember);//팀 탈퇴하기

//공모전 정보 api
var competApi = require('./compet');
app.get('/compets', competApi.getAllCompet);//공모전 정보 가져오기. 넣는건 크롤링서버에서 함

//공모전 북마크 처리 api
var bookmarkApi = require('./bookmark');
app.post('/bookmark',bookmarkApi.putBookmark); //북마크 추가
app.post('/bookmark/delete',bookmarkApi.deleteBookmark); //북마크 삭제

//태그 처리 api
var tagApi = require('./stack');
app.get('./tag/title',tagApi.getTitle); //큰 태그 가져오기
app.get('./tag/tech',tagApi.getTech); //가져온 큰 태그에 맞춰 작은 태그 보여주기
app.post('./tag/puttech',tagApi.putTech); //내 기술목록으로 넣기
app.post('./tag/delete',tagApi.deleteTech); //넣은 태그 삭제하기(취소)
app.get('./tag/getmytech',tagApi.getMyTech); //내 기술목록 가져오기. 다른사람꺼 가져올때도 이거 사용. 



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

