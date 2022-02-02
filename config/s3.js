const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();

//s3 연결
const s3 = new aws.S3({
  accessKeyId: 'AKIA3EQGVCUQRUIV2Y5K',
  secretAccessKey: '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',
  region : 'ap-northeast-2'
});

let upload = multer({
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
exports.upload = multer.upload;