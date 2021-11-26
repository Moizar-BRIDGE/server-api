# server-api 엔드포인트 및 데이터 형식

### **아래 나오는 uid는 모두 세션에 있는 파이어베이스 로그인 uid 입니다.**
### **엔드포인트 끝 .../:id 는 .../[uid]로 통일. 
### get을 제외한 모든 반환값은 성공시 {"message":"success"}

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
## ◆ 유저,프로필 관련

<br>

### 1. 로그인 후 프로필 사진 띄우기
엔드포인트 끝에 uid 입력. <br>내 프로필 사진 가져와 메인화면 중앙 사진 첨부
```
GET->    /users/login/:id
```
#### 반환 형식(예시)
```

이미 가입된 사용자의 경우 --> 메인화면으로 이동
{
    "user": [
        {
            "uid": "gi6nXv8FwgPNnjQQku11fZbAUn23",
            "name": "오래영",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20211125_234140400_02.jpg"
        }
    ]
}



처음 가입한 사람의 경우 --> 이 메세지를 받으면 회원가입 정보입력 페이지로 이동
{
    "message": "new"
}
```

<br>

### 2. 회원가입 
new 메세지를 받고 정보입력이 모두 완료되면 사용
```
POST->    /users
```
#### 입력 형식

![image](https://user-images.githubusercontent.com/74356312/143582708-1716b40c-15a3-46a5-ac42-3848f0480b66.png)


#### 반환 형식
```
{
    "message": "success"
}
```

<br>

### 3. 전체 회원 조회
최신순으로 내림차순. is_like는 내가 좋아요 표시 여부(했으면 1), tech_name은 기술스택 카테고리 한 개
```
GET->    /users/alluser/:id
```
#### 반환 형식(예시)
```

{
    "profiles": [
        {
            "uid": "gi6nXv8FwgPNnjQQku11fZbAUn23",
            "name": "오래영",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20211125_234140400_02.jpg",
            "tech_name": "node.js",
            "school": "한국공학대학교",
            "major": "컴퓨터공학",
            "is_like": null
        },
        {
            "uid": "jRBzpwPd6KcU0yHEXiCp43CXGVv1",
            "name": "강석원",
    ...

```

<br>

### 4. 프로필 정보 가져오기
내 프로필 정보 혹은 다른사람 프로필 정보 가져오기
<br>
다른 사람의 프로필 정보를 가져올 땐 똑같은 api로 그 사람 id 입력하면 됨.

```
GET->    /users/:id
```

#### 반환 형식(예시)

```

{
    "profile": [
        {
            "uid": "gi6nXv8FwgPNnjQQku11fZbAUn23",
            "name": "오래영",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20211125_234140400_02.jpg",
            "emaile": "nwj20315@gmail.com",
            "major": "컴퓨터공학",
            "school": "한국공학대학교",
            "resume": "백엔드 분야로 공모전에 나가고 싶은  컴퓨터공학 4학년입니다.",
            "experience": "프로보노 프로젝트 참여, AR 앱 개발"
        }
    ],
    "positions": [
        {
            "tech_name": "node.js"
        },
        {
            "tech_name": "네트워크"
        },
        {
            "tech_name": "서버"
        },
        {
            "tech_name": "자바"
        }
    ]
}

```

<br>


### 5. 내 정보 수정

정보 수정

```
PUT->    /users/:id
```

#### 입력 형식(예시)


![image](https://user-images.githubusercontent.com/74356312/143581835-8f88983d-639c-4344-80f1-e5233e11aaa3.png)


<br><br>

## ◆ 메인화면 api

### 1. 메인화면 프로필 및 공모전 정보 5개씩 띄우기
 랜덤으로 최근 30개 공모전 중 5개 반환
 
 ```
 GET->  /main/:id
 ```
 
 #### 반환 형식(예시)
 porfiles 5개 + compets 5개 가져옴
 
 ```
{
    "profiles": [
        {
            "uid": "OiRLpqjWfxQMPN8cd5zHjI4b8ZV8",
            "name": "이성진",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/default.png",
            "tech_name": "안드로이드",
            "school": "한국공학대학교",
            "major": "게임공학과",
            "is_like": null
        },
        {
            "uid": "OiRLpqjWfxQMPN8cd5zHjI4b8ZV6",
            "name": "김민규",
    ...
    
    "compets": [
        {
            "C_num": 130,
            "C_name": "2022 서울구로국제어린이영화제 제작지원사업 공모",
            "image": "https://www.wevity.com/upload/contest/20211116161624_2a2f004a.jpg",
            "d_day": 50,
            "cate_name": "영상/UCC/사진",
            "is_book": null
        },
        {
            "C_num": 88,
            "C_name": "2021 위믹스 블록체인 해커톤",
            "image": "https://www.wevity.com/upload/contest/20211119154000_9aacbe0a.jpg",
     ...
    
```

<br><br>

## ◆ 좋아요 처리 API(사람 좋아요)

### 1. 좋아요 추가

```
POST->  /like
```

#### 입력 형식(예시)

```
{
    "uid": "gi6nXv8FwgPNnjQQku11fZbAUn23",
    "inter_uid" : "jRBzpwPd6KcU0yHEXiCp43CXGVv1"
    
    //uid가 ~인 사람이 inter_uid가 ~인 사람에게 좋아요를 누름.
}
```

### 2. 좋아요 취소

```
POST->  /like/delete
```


#### 입력 형식(예시)

```
{
    "uid": "gi6nXv8FwgPNnjQQku11fZbAUn23",
    "inter_uid" : "jRBzpwPd6KcU0yHEXiCp43CXGVv1"
    
    //uid가 ~인 사람이 inter_uid가 ~인 사람에게 했던 좋아요를 취소
}
```

<br><br>

## ◆ 팀 관련 API

### 1. 팀 생성

```
POST->  /teams
```

#### 입력 형식(예시)
팀 생성 시 팀장은 자동으로 팀 멤버 테이블에 입력됨.

```
{
    "C_num":"13",
    "uid":"OiRLpqjWfxQMPN8cd5zHjI4b8ZV5",
    "limit_member":"1",
    "limit_date":"2021-12-08",
    "num_member":"0",
    "title":"영상 편집가 모집합니다.",
    "app_condition":"영상,미디어쪽 전공하신분",
    "prefer":"영상,편집 경험,편집 감각 있으신 분",
    "detail":"참가 자격 : 공공 데이터에 관심이 있고, 콘텐츠를 제작할 수 있는 국민 누구나 개인 또는 팀으로 참가 \\n 다음과 같은 공모전에 UCC영상 편집 담당자로 함께하실 분을 찾습니다.영상 편집에 대한 경험이 있으며 편집에 재능이 있으신 분들의 많은 지원 바랍니다.",
    "recruit":"1",
    "search_tag":"#편집자,#영상,#유튜브 편집"

}

```

<br>

### 2. 팀 삭제

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

### 3. 모든 팀 정보 가져오기

```
GET->   /teams/allteams/:id
```

#### 출력 형식(예시)

```
{
    "teams": [
        {
            "T_num": 2,
            "d_day": 4,
            "title": "영상 편집가 모집합니다.",
            "limit_member": 1,  //제한
            "num_member": 1,    //현재 모집된 인원
            "recruit": 1,   //모집 시 까지 체크 여부
            "C_num": 31,
            "C_name": "2021 공공 마이데이터 국민 참여 공모전",
            "cate_name": "기획/아이디어, 광고/마케팅, 영상/UCC/사진, 디자",
            "is_book": null     //좋아요 여부
        },
        {
            "T_num": 3,
            "d_day": 14,
    ...
```

<br>

### 4. 나의 팀 정보 가져오기

```
GET->   /teams/:id
```

#### 반환 형식(예시)

```
{
    "team_info": [
        {
            "T_num": 8,
            "d_day": 14,
            "title": "영상 편집가 모집합니다.",
            "limit_member": 1,
            "num_member": 0,
            "app_condition": "영상,미디어쪽 전공하신분",
            "prefer": "영상,편집 경험,편집 감각 있으신 분",
            "detail": "참가 자격 : 공공 데이터에 관심이 있고, 콘텐츠를 제작할 수 있는 국민 누구나 개인 또는 팀으로 참가 \\n 다음과 같은 공모전에 UCC영상 편집 담당자로 함께하실 분을 찾습니다.영상 편집에 대한 경험이 있으며 편집에 재능이 있으신 분들의 많은 지원 바랍니다.",
            "recruit": 1,
            "search_tag": "#편집자,#영상,#",
            "C_num": 13,
            "C_name": "2021 기계독해 데이터셋 학습 알고리즘 개발대회",
            "image": "https://www.wevity.com/upload/contest/20211122182630_38867629.jpg",
            "cate_name": "기획/아이디어, 웹/모바일/IT, 게임/소프트웨어, 과",
            "is_book": null
        }
    ],
    "team_members": [
        {
            "uid": "OiRLpqjWfxQMPN8cd5zHjI4b8ZV5",
            "is_leader": 1,
            "name": "이지수",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/default.png",
            "tech_name": "프론트엔드",
            "school": "한국공학대학교",
            "major": "컴퓨터공학과"
        }
    ]
}
    
```

<br>


### 5. 선택한 팀 정보 가져오기

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
{
    "team_info": [
        {
            "T_num": 3,
            "d_day": 14,
            "title": "파이썬 전문가 모집합니다.",
            "limit_member": 3,
            "num_member": 0,
            "app_condition": "컴퓨터,게임 전공, 코딩 실력 있으신분",
            "prefer": "공모전 수상 경력 있으신분, 파이썬 잘 다루시는 분",
            "detail": "알고리즘 개발 대회에 파이썬 언어로 같이 개발하실 분을 모집합니다. 실력 좋고 협업 잘되시는 분 신청해주시면 감사하겠습니다.",
            "recruit": 0,
            "search_tag": "#파이썬,#알고리즘",
            "C_num": 13,
            "C_name": "2021 기계독해 데이터셋 학습 알고리즘 개발대회",
            "image": "https://www.wevity.com/upload/contest/20211122182630_38867629.jpg",
            "cate_name": "기획/아이디어, 웹/모바일/IT, 게임/소프트웨어, 과",
            "is_book": null
        }
    ],
    "team_members": [
        {
            "uid": "gi6nXv8FwgPNnjQQku11fZbAUn23",
            "is_leader": 1,
            "name": "오래영",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20211125_234140400_02.jpg",
            "tech_name": "node.js",
            "school": "한국공학대학교",
            "major": "컴퓨터공학"
        }
    ]
}
```

<br>

### 6. 연락하기 누르고 초대할 내 팀 목록 가져오기

#### 출력 형식(예시)

```
{
    "team_info": [
        {
            "T_num": 2,
            "title": "영상 편집가 모집합니다.",
            "C_name": "2021 공공 마이데이터 국민 참여 공모전"
        },
        {
            "T_num": 4,
            "title": "마케팅 기획자,광고분야 전문가 모집합니다.",
            "C_name": "위메프 '안사고 뭐하니 시즌2' 커머스 영상 공모전"
        }
    ]
}
```

<br><br>


## ◆ 팀 멤버 관리 API

### 1.팀 가입하기(팀원 추가)

```
POST->  /team_members
```

#### 입력 형식(예시)

```
{
    "uid" : "jRBzpwPd6KcU0yHEXiCp43CXGVv1",
    "T_num" : 3,
    "resume" : "열심히 하겠습니다!!"

}
```

<br>

### 2. 팀원 정보 가져오기

```
GET->   /team_members
```

#### 입력 형식(예시)

```
#### 입력 형식(예시)
```

#### 반환 형식(예시)

```
{
    "team_members": [
        {
            "uid": "gi6nXv8FwgPNnjQQku11fZbAUn23",
            "is_leader": 1,
            "name": "오래영",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20211125_234140400_02.jpg",
            "tech_name": "node.js",
            "school": "한국공학대학교",
            "major": "컴퓨터공학"
        },
        {
            "uid": "jRBzpwPd6KcU0yHEXiCp43CXGVv1",
            "is_leader": 0,
            "name": "강석원",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20211125_234140400_01.jpg",
            "tech_name": "안드로이드",
            "school": "한국공학대학교",
            "major": "컴퓨터공학"
        }
    ]
}
```

<br>

### 3. 팀 탈퇴하기

```
POST->  /team_members/delete
```

#### 입력 형식(예시)

```
{
    "uid": "jRBzpwPd6KcU0yHEXiCp43CXGVv1",
    "T_num": 3
}
```

<br><br>

## ◆ 공모전 정보 API

### 1. 공모전 정보 가져오기

```
GET->   /compets/:id
```

#### 반환 형식(예시)

```
{
    "compets": [
        {
            "C_num": 260,
            "C_name": "2021 시마을 전국 시낭송 페스티벌 (전국시낭송대회)",
            "image": "https://www.wevity.com/upload/contest/20211106222543_45da63f2.jpg",
            "d_day": 4,
            "cate_name": "문학/글/시나리오",
            "is_book": null
        },
        {
            "C_num": 259,
            "C_name": "제3회 보리 '개똥이네 놀이터' 창작 동화 공모전",
            "image": "https://www.wevity.com/upload/contest/20211106223143_81ae47ee.jpg",
      ...      
      
```

<br>

### 2. 선택된 공모전 정보 가져오기(해당 공모전 팀 정보와 함께)

```
GET->   /compets/select/:id
```

#### 반환 형식(예시)

```
{
    "compet": [
        {
            "C_num": 13,
            "C_name": "2021 기계독해 데이터셋 학습 알고리즘 개발대회",
            "C_startDate": "2021-11-22T00:00:00.000Z",
            "C_endDate": "2021-12-10T00:00:00.000Z",
            "image": "https://www.wevity.com/upload/contest/20211122182630_38867629.jpg",
            "nowdate": "2021-11-26T00:00:00.000Z",
            "d_day": 14,
            "host": "과학기술정보통신부, 한국지능정보사회진흥원(NIA)",
            "target": "일반인, 대학생, 청소년, 기타",
            "cate_name": "기획/아이디어, 웹/모바일/IT, 게임/소프트웨어, 과",
            "homepage": "http://aifactory.space/competition/detail/1920",
            "reward": "150만원",
            "detail": "2021 기계독해 데이터셋 학습 알고리즘 개발대회\n\n과학기술정보통신부가 주관하고 한국지능정보사회진흥원이 지원하는 인공지능 학습용 데이터 구축사업 \n\n■ 대회 주제: 주어진 사전학습모델(ELECTRA)을 활용해 타겟 기계독해 데이터셋에 대한 성능을 최대화하기 위한 학습 알고리즘 개발\n\n■ 주최/주관\n- 주최 : 과학기술정보통신부, 한국지능정보사회진흥원(NIA)\n- 주관 : (주)포티투마루, (주)유클리드소프트, (주)나라지식정보, (주)단아코퍼레이션, 연세대학교 산학협력단, tech42\n- 운영 : 인공지능팩토리\n\n■ 참가 대상\n- 14세 이상의 데이터 및 인공지능 개발에 관심있는 분\n- 단, <2021 NIA AI 학습용 데이터 구축 사업 - 매체별 기계독해 데이터 과제>에 직/간접적으로 작업을 영위한 분(크라우드 워커 포함)은 참가 제한\n※ 만일 참가 자격에 제한되는 자가 수상 대상자로 선정되는 경우 시상 대상에서 제외하며, 이로 인해 발생하는 불이익에 대해서 주최/주관 및 운영사는 책임지지 않음을 사전에 안내드립니다\n\n■ 일정 \n- 참가신청 (대회기간 중 상시접수) : 공고 후 ~ 12.10\n- 대회기간 : 11.22 ~ 12.10\n- 검증자료 제출 기간 : 12.10 ~ 12.12\n- 검증기간 : 12.13 ~ 12.19\n- 결과발표 :  12.20\n※ 대회의 원활한 진행을 위해 상세일정은 변경될 수 있음\n\n■ 참가접수\n아래 구글폼을 작성 하셔야 참가접수가 완료되니 대회 참가를 원하는 분께서는 (팀의 경우 대표자 한 분) 반드시 아래 폼을 작성하여 제출 부탁드립니다\n → 참가신청서: https://forms.gle/m3zsRx8k8EqMJ5ti7\n\n■ 상금 및 시상규모\n- 최우수상(1팀) : 150만원\n- 우수상(1팀) : 120만원\n- 장려상(1팀) : 80만원\n\n■ 문의\n- 인공지능팩토리: aif.project2021@gmail.com / 042-710-6451",
            "is_book": null
        }
    ],
    "teams": [
        {
            "T_num": 3,
            "team_d_day": 11,
            "title": "파이썬 전문가 모집합니다.",
            "limit_member": 3,
            "num_member": 1,
            "recruit": 0,
            "C_name": "2021 기계독해 데이터셋 학습 알고리즘 개발대회",
            "cate_name": "기획/아이디어, 웹/모바일/IT, 게임/소프트웨어, 과",
            "compet_d_day": 14,
            "is_book": 1
        },
        {
            "T_num": 7,
            "team_d_day": 22,
            "title": "java 개발자 모집합니다.",
            "limit_member": 3,
            "num_member": 0,
            "recruit": 1,
            "C_name": "2021 기계독해 데이터셋 학습 알고리즘 개발대회",
            "cate_name": "기획/아이디어, 웹/모바일/IT, 게임/소프트웨어, 과",
            "compet_d_day": 14,
            "is_book": null
        },
        {
            "T_num": 8,
            "team_d_day": 12,
            "title": "영상 편집가 모집합니다.",
            "limit_member": 1,
            "num_member": 0,
            "recruit": 1,
            "C_name": "2021 기계독해 데이터셋 학습 알고리즘 개발대회",
            "cate_name": "기획/아이디어, 웹/모바일/IT, 게임/소프트웨어, 과",
            "compet_d_day": 14,
            "is_book": null
        }
    ]
}   
      
```

<br><br>

## ◆ 북마크 처리 API

### 1. 팀 북마크 추가

```
POST->  /bookmark/team
```

#### 입력 형식

```
{
    "uid" : "gi6nXv8FwgPNnjQQku11fZbAUn23",
    "T_num" : 6
}
```

<br>

### 2. 팀 북마크 취소

```
POST->  /bookmark/team/delete
```

#### 입력 형식

```
{
    "uid" : "gi6nXv8FwgPNnjQQku11fZbAUn23",
    "T_num" : 6
}
```

<br>

### 3. 공모전 북마크 추가

```
POST->  /bookmark/compet
```

#### 입력 형식

```
{
    "uid" : "gi6nXv8FwgPNnjQQku11fZbAUn23",
    "C_num" : 18
}
```

<br>

### 4. 공모전 북마크 취소

```
POST->  /bookmark/compet/delete
```

#### 입력 형식

```
{
    "uid" : "gi6nXv8FwgPNnjQQku11fZbAUn23",
    "C_num" : 18
}
```

<br><br>


## ◆ 검색 관련 API -> 프로필, 팀, 공모전 검색 시 사용

### 1. 팀 목록 검색  

```
GET->  /search/teams/:id
```

#### 입력 형식

```
{
    "search_word":"영상"
}
```

#### 반환 형식(예시)

```
{
    "teams": [
        {
            "T_num": 2,
            "d_day": 4,
            "title": "영상 편집가 모집합니다.",
            "limit_member": 1,
            "num_member": 1,
            "recruit": 1,
            "C_num": 31,
            "C_name": "2021 공공 마이데이터 국민 참여 공모전",
            "cate_name": "기획/아이디어, 광고/마케팅, 영상/UCC/사진, 디자",
            "is_book": null
        },
        {
            "T_num": 4,
            "d_day": 34,
    ... 
```

<br>

### 2. 프로필 목록 검색  

```
GET->  /search/profiles/:id
```

#### 입력 형식(예시)

```
{
    "search_word":"영상"
}
```

#### 반환 형식(예시)

```
{
    "profiles": [
        {
            "uid": "gi6nXv8FwgPNnjQQku11fZbAUn23",
            "name": "오래영",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20211125_234140400_02.jpg",
            "tech_name": "node.js",
            "school": "한국공학대학교",
            "major": "컴퓨터공학",
            "is_like": null
        },
        {
            "uid": "jRBzpwPd6KcU0yHEXiCp43CXGVv1",
            "name": "강석원",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20211125_234140400_01.jpg",
            "tech_name": "안드로이드",
            "school": "한국공학대학교",
            "major": "컴퓨터공학",
            "is_like": 1
        },
        {
            "uid": "OiRLpqjWfxQMPN8cd5zHjI4b8ZV5",
            "name": "이지수",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/default.png",
            "tech_name": "프론트엔드",
            "school": "한국공학대학교",
            "major": "컴퓨터공학과",
            "is_like": null
        }
    ]
}
```

<br>

### 3. 공모전 목록 검색  

```
GET->  /search/compets/:id
```

#### 입력 형식(예시)

```
{
    "search_word":"영상"
}
```

#### 반환 형식(예시)

```
{
    "compets": [
        {
            "C_num": 225,
            "C_name": "[한국자동차연구원] 2021 자율주행영상 객체 검출 경",
            "image": "https://www.wevity.com/upload/contest/20211108152124_a838e163.jpg",
            "d_day": 4,
            "cate_name": "과학/공학",
            "is_book": null
        },
        {
            "C_num": 190,
            "C_name": "한국조경 50주년 기념 로고 디자인 공모전",
            "image": "https://www.wevity.com/upload/contest/20211110175854_ebb42d1e.jpg",
            "d_day": 12,
            "cate_name": "디자인/캐릭터/웹툰",
            "is_book": null
        },
    ...
    
```

<br>

### 4. 팀 구하기 시 카테고리로 필터링하기  

```
GET->  /search/filterteams/:id
```

#### 입력 형식(예시)

```
{
    "category":"영상"
}
```

#### 반환 형식(예시)

```
{
    "teams": [
        {
            "T_num": 2,
            "d_day": 4,
            "title": "영상 편집가 모집합니다.",
            "limit_member": 1,
            "num_member": 1,
            "recruit": 1,
            "C_num": 31,
            "C_name": "2021 공공 마이데이터 국민 참여 공모전",
            "cate_name": "기획/아이디어, 광고/마케팅, 영상/UCC/사진, 디자",
            "is_book": null
        },
        {
            "T_num": 3,
            "d_day": 14,
            "title": "파이썬 전문가 모집합니다.",
            "limit_member": 3,
            "num_member": 1,
            "recruit": 0,
            "C_num": 13,
            "C_name": "2021 기계독해 데이터셋 학습 알고리즘 개발대회",
            "cate_name": "기획/아이디어, 웹/모바일/IT, 게임/소프트웨어, 과",
            "is_book": null
        },
    ...
    
```

<br>

### 5. 프로필 검색 시 카테고리로 필터링하기  

```
GET->  /search/filterprofiles/:id
```

#### 입력 형식(예시)

```
{
    "category":"안드로이드"
}
```

#### 반환 형식(예시)

```
{
    "profiles": [
        {
            "uid": "jRBzpwPd6KcU0yHEXiCp43CXGVv1",
            "name": "강석원",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20211125_234140400_01.jpg",
            "tech_name": "안드로이드",
            "school": "한국공학대학교",
            "major": "컴퓨터공학",
            "is_like": 1
        },
        {
            "uid": "OiRLpqjWfxQMPN8cd5zHjI4b8ZV5",
            "name": "이지수",
            "image": "https://moizaimage.s3.ap-northeast-2.amazonaws.com/default.png",
            "tech_name": "안드로이드",
            "school": "한국공학대학교",
            "major": "컴퓨터공학과",
            "is_like": null
        },
    ...
    
```

<br>

### 6. 공모전 검색 시 카테고리로 필터링하기  

```
GET->  /search/filtercompets/:id
```

#### 입력 형식(예시)

```
{
    "category":"영상/UCC/사진,기획/아이디어"
}
```

#### 반환 형식(예시)

```
{
    "profiles": [
        {
            "C_num": 257,
            "C_name": "광화시대 광화벽화 미디어아트 영상 공모전",
            "image": "https://www.wevity.com/upload/contest/20211102132850_7580e7c8.jpg",
            "d_day": 34,
            "cate_name": "영상/UCC/사진",
            "is_book": null
        },
        {
            "C_num": 254,
            "C_name": "2021년 여성직업탐색 영상 공모전",
            "image": "https://www.wevity.com/upload/contest/20211103024806_b3b0a8f1.jpg",
            "d_day": 10,
            "cate_name": "영상/UCC/사진",
            "is_book": null
        },
        {
            "C_num": 250,
            "C_name": "특허 데이터 활용방안 아이디어 경진대회",
            "image": "https://www.wevity.com/upload/contest/20211103015614_0b0b6816.jpg",
            "d_day": 4,
            "cate_name": "기획/아이디어",
            "is_book": null
        },
    ...
    
```


<br><br>

## ◆ 팀 지원자 처리 API -> 지원하기, 지원자 보기 등

### 1. 지원하기 누르면 공모전명, 학교, 전공 띄우기(지원 양식 작성하는 페이지에서)

```
GET->   /apply
```

#### 입력 형식(예시)

```
{
    "uid" : "gi6nXv8FwgPNnjQQku11fZbAUn23",
    "T_num" : "3"
}
```

#### 반환 형식(예시)

```
{
    "app_info": [
        {
            "T_num": 3,
            "C_name": "2021 기계독해 데이터셋 학습 알고리즘 개발대회",
            "school": "한국공학대학교",
            "major": "컴퓨터공학"
        }
    ]
}
```

<br>

### 2. 내 팀의 지원 목록 가져오기

```
GET->   /apply/list
```

#### 입력 형식(예시)

```
{
    "T_num" : "2"
}
```

#### 반환 형식(예시)

```
{
    "app_list": [
        {
            "uid": "gi6nXv8FwgPNnjQQku11fZbAUn23",
            "resume": "경험은 없지만 도전하고 싶습니다.",
            "name": "오래영",
            "school": "한국공학대학교",
            "major": "컴퓨터공학"
        },
        {
            "uid": "OiRLpqjWfxQMPN8cd5zHjI4b8ZV2",
            "resume": "영상 편집 및 UCC 제작 경험 다수",
            "name": "조재원",
            "school": "한국공학대학교",
            "major": "경영학"
        },
        {
            "uid": "OiRLpqjWfxQMPN8cd5zHjI4b8ZV4",
            "resume": "영상 관련 공모전 수상 2회",
            "name": "박윤찬",
            "school": "서울대학교",
            "major": "영화영상학"
        }
    ]
}
```

<br>

### 3. 목록 중 한명 상세보기

```
GET->   /apply/detail/:id
```

#### 입력 형식(예시)

```
{
    "T_num" : "2"
}
```

#### 반환 형식(예시)

```
{
    "app_list": [
        {
            "uid": "OiRLpqjWfxQMPN8cd5zHjI4b8ZV4",
            "T_num": 2,
            "resume": "영상 관련 공모전 수상 2회",
            "message": "같은 팀이 되어서 영상 편집자로 공모전에 참여하고 싶습니다! \\n 연락주세요!!",
            "title": "영상 편집가 참여 희망합니다!",
            "name": "박윤찬",
            "school": "서울대학교",
            "major": "영화영상학"
        }
    ]
}
```

<br>

### 4. 메시지 전송 누르고 지원 확정하기

```
POST->   /apply
```

#### 입력 형식(예시)

```
{
    "uid" : "OiRLpqjWfxQMPN8cd5zHjI4b8ZV4",
    "T_num" : "4",
    "title" : "영상 편집가 참여 희망합니다!",
    "resume" : "영상 관련 공모전 수상 2회",
    "message" : "같은 팀이 되어서 영상 편집자로 공모전에 참여하고 싶습니다! \\n 연락주세요!!"
}
```


<br><br>
## ◆ 태그(카테고리) 처리 API -> 자기 기술 스택 java, c... 이런거
 처음에 만들었는데 수정되면서 쓸모 없을수도 있음!! 

### 1. 큰 태그 가져오기(대분류)

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

### 2. 가져온 큰 태그에 맞춰 작은 태그(소분류) 가져오기

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

### 3. 태그를 내 기술목록으로 넣기

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

### 4. 넣은 태그 삭제하기(취소)

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

### 5. 내가 넣은 태그 목록 가져오기. 프로필 열람 때 사용
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

<br><br>
