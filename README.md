# server-api

ipv4 주소 52.79.41.120 <br>
port : 8080
### **아래 나오는 uid는 모두 세션에 있는 파이어베이스 로그인 uid 입니다.**

#### error code

200,201 : 입력 성공
204 : 접근 성공했지만 반환할 데이터 없음.(내 팀이 없는 경우 등)

400 : 데이터 형식 문제(이름 길이 등)
401 : db 형식과 맞지 않음. 데이터 문제.(갯수 등)
404 - 주소 잘못

500 : db 커넥션 문제



<br><br><br>
### 로그인 후 프로필 사진 띄우기
엔드포인트 끝에 uid 입력. <br>내 프로필 사진 가져와 메인화면 중앙 사진 첨부
```
GET->    /users/login/:id
```
#### 반환 형식(예시)
```

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
### 회원가입 
new 메세지를 받고 정보입력이 모두 완료되면 사용
```
POST->    /users
```
#### 입력 형식
![image](https://user-images.githubusercontent.com/74356312/142925310-d17fedfb-1bc4-4fa4-a069-662bea5cd0f7.png)




### 전체 회원 조회
최신순으로 내림차순. is_like는 내가 좋아요 표시 여부(했으면 1), tech_name은 기술스택 카테고리 한 개
```
GET->    /users/alluser/:id
```
#### 반환 형식(예시)
```

[
    {
        "uid": "20",
        "name": "dhfodud",
        "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/image1.jpg",
        "tech_name": null,
        "school": "한국공학대학교",
        "major": "컴퓨터공학과",
        "is_like": null
    },
    {
        "uid": "15",
        "name": "조재원",
        "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/image1%20%281%29.jpg",
        "tech_name": null,
        "school": "1",
        "major": "1",
        "is_like": null
    },
    ...

```
<br>
### 내 프로필 정보 가져오기
다른 사람 것 볼 땐 그 사람 id 입력
```
GET->    /users/:id
```
#### 반환 형식(예시)
```

[
    {
        "uid": "20",
        "name": "dhfodud",
        "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/image1.jpg",
        "birth": null,  //생년월일
        "blog": null,   // 블로그 주소
        "gender": "M",
        "emaile": "afsdfsf@naver.com",
        "major": "컴퓨터공학과",
        "school": "한국공학대학교",
        "resume": "자기소개",
        "tech_name": null,   //기술스택
        "li_name": null,   //자격증
        "Award": null     //수상내역
    }
]

```

<br>
### 내 프로필 정보 가져오기
다른 사람 것 볼 땐 그 사람 id 입력
```
GET->    /users/:id
```
#### 반환 형식(예시)

```
[
    {
        "uid": "20",
        "name": "dhfodud",
        "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/image1.jpg",
        "birth": null,  //생년월일
        "blog": null,   // 블로그 주소
        "gender": "M",
        "emaile": "afsdfsf@naver.com",
        "major": "컴퓨터공학과",
        "school": "한국공학대학교",
        "resume": "자기소개",
        "tech_name": null,   //기술스택
        "li_name": null,   //자격증
        "Award": null     //수상내역
    }
]
```

<br>
### 내 정보 수정
정보 수정
```
PUT->    /users/:id
```
#### 반환 형식(예시)


![image](https://user-images.githubusercontent.com/74356312/142930152-b7099299-c850-470e-889b-deff4ab8bfbc.png)

