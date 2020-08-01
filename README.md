# KeyBoard_API_Server
KeyBoard 플랫폼 API 서버  
<br>  

## API 명세서

**User** 
| URL | HTTP Method | Body | 설명  
|---|:---:|---|---|   
/user/:id|(<span style="color:Yellow">GET</span>)| |유저 id를 입력 받아 primary Key 반환  
/user/signIn|(<span style="color:Green">POST</span>)|{id,pw}|로그인 
/user/signUp|(<span style="color:Green">POST</span>)|{id,pw}|user 생성  
/user/update|(<span style="color:Yellow">GET</span>)|{userID, id, pw}|user 정보 수정  
/user/delete|(<span style="color:Green">POST</span>)|{userID}|user 삭제  
/user/pwChange|(<span style="color:Green">POST</span>)|{newPw, userId}|비밀번호 변경  

**Item**  
| URL | HTTP Method | Body | 설명  
|---|:---:|---|---|   
/item/create|(<span style="color:Green">POST</span>)|{category, userID, title, id, pw, url, etc}|item 생성
/item/read/:id|(<span style="color:Yellow">GET</span>)||item list 가져오기  
/item/read/child|(<span style="color:Green">POST</span>)|{title, id}|category 하위의 item들 읽어오기  
/item/update|(<span style="color:Green">POST</span>)|{category, userId, title, id, beforeTitle}|item 정보 수정  
/item/delete|(<span style="color:Green">POST</span>)|{id,title}|item 삭제

**Category**  
| URL | HTTP Method | Body | 설명  
|---|:---:|---|---|   
/category/create|(<span style="color:Green">POST</span>)|{etc, id, title}|category 생성  
/category/read/:id|(<span style="color:Yellow">GET</span>)||cateogry list 가져오기  
/category/update|(<span style="color:Green">POST</span>)|{title, etc, id, beforeTitle}|Category 수정  
/category/delete|(<span style="color:Green">POST</span>)|{id, title}|Category 삭제
<br>  
    
## Tech Stack

BackEnd : Node.js
DB : PostgreSQL