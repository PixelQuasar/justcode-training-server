# TraniningHotelDataBase

Another API for your projects


## Navigate:

[Auth](#Auth)

[Users](#Users)

[Posts](#Posts)

# Auth

## USER SCHEMA:

    userAccess: string
    email: string
    login: string
    avatar: string
    password: string


## POST api/auth/register
Register request

### body: 
    login: string
    email: string
    password: string
    tryPassword: string

### response:
    <User>

## POST api/auth/login
Login request

### body: 
    email: string
    password: string

### response:
    "data": ACCESS_TOKEN


## GET api/auth/userData
Request to get user data by your token

### headers:
    Authorization: <Token>

### response:
    <User>

    
# Users

## GET api/users/
Request to get all users

### headers:
    Authorization: <Token>

### response:
    [ User ]


## GET api/users/:userId
Request to get all users

### params:
    userId - user id

### headers:
    Authorization: <Token>

### response:
    <User>


## PUT api/users/update
Updates your user data

### body:
    "update": {
        /update filter here/
    }

### headers:
    Authorization: <Token>

### response:
    <User>

# Posts

## GET api/posts/
Request to get all posts

### headers:
    Authorization: <Token>

### response:
    [ Post ]

## GET api/posts/:id
Request to get post by id

### headers:
    Authorization: <Token>

### response:
    Post

## POST api/posts/
Request to create new post

### body:
    title: string,
    content: string
    photosUrl: Array<string>

### headers:
    Authorization: <Token>

### response:
    Post