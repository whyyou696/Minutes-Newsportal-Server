[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=13301859&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# CH1-News Portal

## List Of Endpoints

### 1.User

- POST /register
- POST /login

### 2.Article

- GET /articles
- POST /articles
- DELETE /articles/:id
- GET /articles/:id
- PUT /articles/:id

### 3.Category

- GET /categories
- POST /categories
- PUT /categories/:id
- DELETE /categories/:id

### 4.Public

- GET /publics
- GET /publics/:id
  
## 1. User Endpoint

### * POST /register

_Request

- body

```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string",
    "phoneNumber": "string",
    "address": "string"
}
```

_Response (201 - Created)

```json
{
    "id": 4,
    "username": "user2",
    "email": "user2@gmail.com",
    "phoneNumber": "087654321",
    "address": "Surabaya"
}
```

_Response (400 - Bad Request)

```json
{
    "message": "username is required"
}
OR
{
    "message": "email is required"    
}
OR
{
    "message": "password is required"
}
OR
{
     "message": "username is required"
}
OR
{
     "message": "email must be unique"
}
OR
{
    "message": "Validation isEmail on email failed"
}
```

### POST /login

_Request

- body

```json
{
    "email": "string",
    "password": "string"
}
```

_Response (200 - OK)

```json
{
    "acces_token": "string"
}
```

_Response (401 - Unauthorized)

```json
    "message": "Invalid Email or Password"
```

_Response (400 - Bad Request)

```json
{
    "message": "Email and Password is Required"
}
```

## 2. Article Endpoint

### * GET /articles

_Request

- headers:
  
```json
{
    "access_token": "string"
}
```

_Response (200 - OK)

- body:

```json
[
    {
        "id": 1,
        "title": "STY Tak Banyak Berharap di Indonesia vs Libya",
        "content": "Shin Tae Yong buka suara soal harapan dalam pertandingan Timnas Indonesia vs Libya pada ajang uji coba jelang Piala Asia 2023.",
        "imgUrl": "https://akcdn.detik.net.id/visual/2023/11/20/jelang-filipina-vs-indonesia-1_169.jpeg?w=650&q=90",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2024-01-02T11:41:26.459Z",
        "updatedAt": "2024-01-02T11:41:26.459Z"
    },
    ...,
]
```

### * POST /articles

_Request

- headers:
  
```json
{
    "access_token": "string"
}
```

_Response (201 - Created)

- body:

```json
{
    "id": "integer",
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "categoryId": "integer",
    "authorId": "integer",
    "updatedAt": "date",
    "createdAt": "date"
}
```

_Response (400 - Bad Request)

```json
{
    "message": "Article title is required"
}
OR
{
   "message": "Article content is required" 
}
```

### * DELETE /articles/:id

_Request

- headers:

```json
{
    "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)

```json
{
    "message": "Article has been deleted"
}
```

_Response (404 - Not Found)

```json
{
    "message": "Article not found"
}
```

### * GET /articles/:id

_Request

- headers:

```json
{
    "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)

- body
  
```json
{
    "id": "integer",
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "categoryId": "integer",
    "authorId": "integer",
    "updatedAt": "date",
    "createdAt": "date"
}
```

_Response (404 - Not Found)

```json
{
    "message": "Article not found"
}
```

### * PUT /articles/:id

_Request

- headers:

```json
{
    "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)

```json
{
    "message": "Article has been updated"
}
```

_Response (400 - Bad Request)

```json
{
    "message": "Article title is required"
}
OR
{
    "message": "Article content is required"
}
```

_Response (404 - Not Found)

```json
{
    "message": "Article not found"
}
```

## 3. Article Endpoint

### * GET /categories

_Request

- headers:
  
```json
{
    "access_token": "string"
}
```

_Response (200 - OK)

- body:

```json
[
    {
        "id": 1,
        "name": "Sport",
        "createdAt": "2024-01-02T11:41:26.454Z",
        "updatedAt": "2024-01-02T11:41:26.454Z"
    },
    {
        "id": 2,
        "name": "Teknologi",
        "createdAt": "2024-01-02T11:41:26.454Z",
        "updatedAt": "2024-01-02T11:41:26.454Z"
    },
    ...,
]
```

### * POST /categories

_Request

- headers:
  
```json
{
    "access_token": "string"
}
```

_Response (201 - Created)

- body:
  
```json
{
    "id": "integer",
    "name": "string",
    "updatedAt": "date",
    "createdAt": "date"
}
```

_Response (400 - Bad Request)

```json
{
    "message": "name can't empty"
}
OR
{
    "message": "name can't null"
}
```

### * PUT /categories/:id

_Request

- headers:
  
```json
{
    "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)

```json
{
    "message": "Category has been updated"
}
```

_Response (400 - Bad Request)

```json
{
    "message": "name can't empty"
}
```

### * DELETE /categories/:id

_Request

- headers:
  
```json
{
    "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - Bad Request)

```json
{
    "message": "Category has been deleted"
}
```

_Response (404 - Not Found)

```json
{
    "message": "Category not found"
}
```

## 4. Public Endpoint

### * GET /publics

_Response (200 - OK)

- body:

```json
[
    {
        "id": 1,
        "title": "STY Tak Banyak Berharap di Indonesia vs Libya",
        "content": "Shin Tae Yong buka suara soal harapan dalam pertandingan Timnas Indonesia vs Libya pada ajang uji coba jelang Piala Asia 2023.",
        "imgUrl": "https://akcdn.detik.net.id/visual/2023/11/20/jelang-filipina-vs-indonesia-1_169.jpeg?w=650&q=90",
        "categoryId": 1,
        "authorId": 1,
        "createdAt": "2024-01-02T11:41:26.459Z",
        "updatedAt": "2024-01-02T11:41:26.459Z"
    },
    ...,
]
```

### *  GET /publics/:id

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)

- body
  
```json
{
    "id": "integer",
    "title": "string",
    "content": "text",
    "imgUrl": "string",
    "categoryId": "integer",
    "authorId": "integer",
    "updatedAt": "date",
    "createdAt": "date"
}
```

_Response (404 - Not Found)

```json
{
    "message": "Article not found"
}
```

## * Global Error

_Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

