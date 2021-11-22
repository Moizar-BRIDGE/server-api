# server-api

ipv4 주소 52.79.41.120 <br>
port : 8080
### **아래 나오는 uid는 모두 세션에 있는 파이어베이스 로그인 uid 입니다.**
<br><br><br>
#### 로그인 후 프로필 사진 띄우기
엔드포인트 끝에 uid 입력. <br>내 프로필 사진 가져와 메인화면 중앙 사진 첨부
```
GET->    /users/login/:id
```
```
반환 형식(예시)
이미 가입된 사용자의 경우 --> 메인화면으로 이동
[
    {
        "name": "1",
        "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/image1%20%281%29.jpg"
    }
]



처음 가입한 사람의 경우 --> 이 메세지를 받으면 회원가입 정보입력 페이지로 이동
{
    "message": "new"
}
```

<br><br>
#### 회원가입 
new 메세지를 받고 정보입력이 모두 완료되면 사용
```
POST->    /users
```
```
https://github.com/Moizar-BRIDGE/server-api/issues/1#issue-1060530534
```
