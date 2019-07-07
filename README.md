# Quest of the Pixels

- Node.js/Express/passport server
- Lowdb json database
- Global parameters set in .env file

```
# Install dependencies
yarn

# Start server
yarn start

# Test
yarn test
```

# Use Postman or Curl to hit the endpoints

- Only json requests are accepted, set Accept or Content-Type to application/json in Headers tab

- Login will return a Token to add as a Bearer in Authentication tab
```
curl -X POST \
  http://localhost:3000/apiv1/auth/login \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Host: localhost:3000' \
  -d 'username=test&password=test'


 {
    "status": "success",
    "data": {
        "isAuth": true,
        "user": {
            "username": "test"
        },
        "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1NjI1Mjc2NDUsImV4cCI6MTU2MjYxNDA0NX0.ozv-STIYNdkX8IBq-jcrxiGEtcWPdFaYVax3wju1mcc"
    }
} 
```


- Ping the server
```
curl -X GET \
  http://localhost:3000/apiv1/ping \
  -H 'Accept: application/json' \
  -H 'Host: localhost:3000' \


{
    "status": "success",
    "message": "Welcome to the API"
}
```

- Ping the server once authenticated
```
curl -X GET \
  http://localhost:3000/apiv1/ping \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1NjI1MTYwNjgsImV4cCI6MTU2MjUxNjY3Mn0.-WnUjtywBMfdjGI-X-fEsBOeWzc9IZo6KJIDSo2cgb0' \
  -H 'Host: localhost:3000' \


{
    "status": "success",
    "message": "Welcome to the auth API"
}
```

- List all items for the authenticated user
```
curl -X GET \
  http://localhost:3000/apiv1/items/ \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1NjI1MjM5NzksImV4cCI6MTU2MjUyNDU4M30.vhzcVObSTBy6xiuDAMfUwuay3oGuHH3InkvV4BpZWGg' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \


{
    "status": "success",
    "data": {
        "username": "test",
        "coins": "50",
        "gems": 10,
        "potions": 34
    }
}
```

- Add some coins, replace coins by gems or potions in the uri below
```
curl -X POST \
  http://localhost:3000/apiv1/items/coins/4 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1NjI1MjM5NzksImV4cCI6MTU2MjUyNDU4M30.vhzcVObSTBy6xiuDAMfUwuay3oGuHH3InkvV4BpZWGg' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \

{
    "status": "success",
    "data": {
        "username": "test",
        "operation": "add",
        "type": "coins",
        "try": 4,
        "able": 0,
        "now": "50"
    }
}
```

- Delete some gems, replace gems by coins or potions in the uri below
```
curl -X DELETE \
  http://localhost:3000/apiv1/items/gems/14 \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE1NjI1MjM5NzksImV4cCI6MTU2MjUyNDU4M30.vhzcVObSTBy6xiuDAMfUwuay3oGuHH3InkvV4BpZWGg' \
  -H 'Content-Type: application/json' \
  -H 'Host: localhost:3000' \

{
    "status": "success",
    "data": {
        "username": "test",
        "operation": "delete",
        "type": "coins",
        "try": 0,
        "able": 0,
        "now": 50
    }
}
```