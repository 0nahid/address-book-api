> Welcome to the Address Book Server

> Login credentials are:

```
email: nahidhassanbulbul@gmail.com
password: 123QWEasd@
```

or

```
{
  "email":"nahidhassanbulbul@gmail.com",
  "password":"123QWEasd@"
}
```

JWT Token

```
`Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5haGlkaGFzc2FuYnVsYnVsQGdtYWlsLmNvbSIsImlhdCI6MTY2NTc2OTUyMSwiZXhwIjoxNjY4MzYxNTIxfQ.fhlEApPqB8c3th9ypQTr28xZSl3t-xhGt4roi94UjVE`
```

> ## API Endpoints
>
> https://address-book-api-production.up.railway.app/signup - POST - Signup

> https://address-book-api-production.up.railway.app/login - POST - Login

> https://address-book-api-production.up.railway.app/users - GET - Get all users

> https://address-book-api-production.up.railway.app/user/:id - GET - Get user by id

> https://address-book-api-production.up.railway.app/user/:id - DELETE - Delete user by id

> https://address-book-api-production.up.railway.app/bulk - POST - Add bulk users

> https://address-book-api-production.up.railway.app/user/:id - Patch - Update user by id

### N.B :

I have used MongoDB Atlas for database with the help of mongoose. Without Login & Signp route
you can't access other routes because I have used `JWT token` for authentication.
To get JWT token you have to login or signup first or you can use the `token` which I have provided above.

Language : Typescript

Framework : Express JS
