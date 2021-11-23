# server-api

ipv4 주소 52.79.41.120 <br>
port : 8080
### **아래 나오는 uid는 모두 세션에 있는 파이어베이스 로그인 uid 입니다.**

#### error code

200,201 : 입력 성공
<br>
204 : 접근 성공했지만 반환할 데이터 없음.(내 팀이 없는 경우 등)
<br>
400 : 데이터 형식 문제(이름 길이 등)
<br>
401 : db 형식과 맞지 않음. 데이터 문제.(갯수 등)
<br>
404 : 주소 잘못

500 : db 커넥션 문제

<br><br>
## 유저,프로필 관련

<br>

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

<br>

### 회원가입 
new 메세지를 받고 정보입력이 모두 완료되면 사용
```
POST->    /users
```
#### 입력 형식
![image](https://user-images.githubusercontent.com/74356312/142925310-d17fedfb-1bc4-4fa4-a069-662bea5cd0f7.png)


<br>

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
다른 사람의 프로필 정보를 가져올 땐 똑같은 api로 그 사람 id 입력하면 됨.

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

#### 입력 형식(예시)


![image](https://user-images.githubusercontent.com/74356312/142930152-b7099299-c850-470e-889b-deff4ab8bfbc.png)


<br><br>

## 메인화면 api

### 메인화면 프로필 보기

랜덤으로 최근 30개 중 5개 프로필 반환

```
GET->   /main/user/:id
```

#### 반환 형식(예시)

```
[
    {
        "uid": "13",
        "name": "조재원",
        "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/image1%20%281%29.jpg",
        "tech_name": null,
        "school": "1",
        "major": "1",
        "is_like": null
    },
    ...
 ```
 
 ### 메인화면 공모전 정보 보기
 
 랜덤으로 최근 30개 공모전 중 5개 반환
 
 ```
 GET->  /main/compets
 ```
 
 #### 반환 형식(예시)
 
 ```
 [
    {
        "image": "1",
        "d_day": 23,
        "C_num": 1,
        "C_name": "1",
        "Cate_name": "기획/아이디어"
    },
    {
        "image": "2",
        "d_day": 24,
        "C_num": 2,
        "C_name": "adf",
        "Cate_name": "광고/마케팅"
    }
    ...
```

<br><br>

## 좋아요 처리 API(사람 좋아요)

### 좋아요 추가

```
POST->  /like
```

#### 입력 형식(예시)

```
{
    "uid": 20,
    "inter_uid": 4 
    
    //uid가 20인 사람이 4인 사람에게 좋아요를 누름.
}
```

### 좋아요 취소

```
POST->  /like/delete
```


#### 입력 형식(예시)

```
{
    "uid": 20,
    "inter_uid": 4 
    
    //uid가 20인 사람이 4인 사람에게 했던 좋아요를 취소
}
```

<br><br>

## 팀 관련 API

### 팀 생성

```
POST->  /teams
```

#### 입력 형식(예시)
팀 생성 시 팀장은 자동으로 팀 멤버 테이블에 입력됨.

```
{
    "uid": 20,
    "C_num": 4,   //공모전 번호
    "limit_member" : 4,
    "num_member" : 1,    //현재 인원
    "limit_date" : 20211220,
    "title" : "프론트 개발자, 디자인" ,
    "app_condition" : "열심히 할 사람",    //지원 조건
    "prefer" : "프로젝트 경험 있는사람",   //우대사항
    "detail" : "상세 내용",
    
}
```

<br>

### 팀 삭제

```
POST->  /teams/delete
```

#### 입력 형식(예시)

```
{
    "uid": 20,
    "T_num" : 22 //팀 삭제 시 클릭해서 따온 팀 id
    
}
```

<br>

### 모든 팀 정보 가져오기

```
GET->   /teams/allteams/:id
```

#### 출력 형식(예시)

```
[
    {
        "T_num": 1,
        "d_day": null,
        "title": null,
        "limit_member": 4,
        "num_member": 2,
        "C_num": 1,
        "C_name": "1", //공모전 이름
        "Cate_num": "1", //카테고리(공모전 분야)
        "is_book": null  //북마크 여부(기본값 null이고 북마크면 1)
    },
    {
        "T_num": 2,
        "d_day": null,
        "title": null,
        "limit_member": 3,
        "num_member": 0,
        "C_num": 2,
        "C_name": "adf",
        "Cate_num": "2",
        "is_book": null
    },
    ...
```

<br>

### 나의 팀 정보 가져오기

```
GET->   /teams/:id
```

#### 반환 형식(예시)

```
[
    {
        "T_num": 3,
        "d_day": null,
        "title": null,
        "limit_member": 3,
        "num_member": 0,
        "C_num": null,
        "C_name": null,
        "Cate_num": null
    },
    {
        "T_num": 4,
        "d_day": 15,
        "title": null,
        "limit_member": 3,
        "num_member": 0,
        "C_num": null,
        "C_name": null,
        "Cate_num": null
    }
]
```

<br>


### 선택한 팀 정보 가져오기

```
GET->   /teams/select/:id
```

#### 입력 형식(예시)

```
{
    "T_num" : 6   
}
```

#### 출력 형식(예시)

```
[
    {
        "T_num": 6,
        "d_day": null,
        "title": "1",
        "limit_member": 1,
        "num_member": 0,
        "C_num": 1,
        "C_name": "1",
        "Cate_num": "1",
        "is_book": null
    }
]
```

## 팀 멤버 관리 API

### 팀 가입하기(팀원 추가)

```
POST->  /team_members
```

#### 입력 형식(예시)

```
{
    "uid": 20,
    "T_num": 6,
    "resume": "가입하고 싶어요"
}
```

<br>

### 팀원 정보 가져오기

```
GET->   /team_members
```

#### 반환 형식(예시)

```
[
    {
        "uid": "20",
        "T_num": 6,
        "resume": "가입하고 싶어요",
        "is_leader": 0
    }
]
```

<br>

### 팀 탈퇴하기

```
POST->  /team_members/delete
```

#### 입력 형식(예시)

```
{
    "uid": 20,
    "T_num": 6
}
```

<br><br>

## 공모전 정보 API

### 공모전 정보 가져오기

```
GET->   /compets
```

#### 반환 형식(예시)

```
[
    {
        "C_num": 2,
        "C_name": "adf", //공모전 이름
        "C_startDate": "2021-12-07T00:00:00.000Z",  //시작 날짜
        "C_endDate": "2021-12-16T00:00:00.000Z",    //종료 날짜
        "Cate_num": "2",    //카테고리 번호(공모전 분야)
        "image": "2",   //공모전 이미지 파일
        "nowdate": "2021-11-22T00:00:00.000Z",  //디데이를 계산할때 쓰는 필드
        "d_day": 24     //공모전 디데이
    },
    {
        "C_num": 1,
        "C_name": "1",
        "C_startDate": "2021-12-07T00:00:00.000Z",
        "C_endDate": "2021-12-15T00:00:00.000Z",
        "Cate_num": "1",
        "image": "1",
        "nowdate": "2021-11-22T00:00:00.000Z",
        "d_day": 23
    }
]
```

<br><br>

## 팀 북마크 처리 API

### 북마크 추가

```
POST->  /bookmark
```

#### 입력 형식

```
{
    "uid": 20,
    "T_num": 6
}
```

<br>

### 북마크 취소

```
POST->  /bookmark/delete
```

#### 입력 형식

```
{
    "uid": 20,
    "T_num": 6
}
```

<br><br>

## 태그(카테고리) 처리 API -> 자기 기술 스택 java, c... 이런거
 마지막 빼고 처음 회원가입 시 선택, 취소 할 때 사용. 혹은 직접입력할때 사용

### 큰 태그 가져오기(대분류)

```
GET->   /tag/title
```

#### 반환 형식

```
[
    {
        "title_num": 1,
        "title": "개발"
    },
    {
        "title_num": 2,
        "title": "경영,비지니스"
    },
    {
        "title_num": 3,
        "title": "마케팅,광고"
    },
    {
    ... 
```

<br>

### 가져온 큰 태그에 맞춰 작은 태그(소분류) 가져오기

```
GET->   /tag/tech
```

#### 반환 형식

```
[
    {
        "stack_num": 1,
        "stack_name": "웹",
        "title": "개발",
        "title_num": 1
    },
    {
        "stack_num": 2,
        "stack_name": "서버",
        "title": "개발",
        "title_num": 1
    },
    ...
```

<br>

### 태그를 내 기술목록으로 넣기

```
POST->  /tag/puttech
```

#### 입력 형식

```
{
    "uid" : 20,
    "tech_name" : "java" //넣을 때 가져오는 카테고리 이름
}
```

<br>

### 넣은 태그 삭제하기(취소)

```
POST->  /tag/delete
```

#### 입력 형식

```
{
    "uid" : 20,
    "tech_name" : "java"
}
```

<br>

### 내가 넣은 태그 목록 가져오기. 프로필 열람 때 사용
다른 사람 프로필 열람 시에도 id만 그 사람으로 바꿔서 이 api 호출

```
GET->   /tag/getmytech/:id
```

#### 반환 형식

```
[
    {
        "tech_num": 3,
        "uid": "2",
        "tech_name": "node.js"
    }
]
```




