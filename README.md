# TraniningHotelDataBase

Another API for your projects


## Navigate:

[Auth](#Auth)

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


## POST api/auth/userData
Request to get user data by your token

### headers:
    Authorization: <Token>

### response:
    <User>

    

