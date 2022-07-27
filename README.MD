#### Env variables
     - POSTGRES_HOST 
     - POSTGRES_DB
     - POSTGRES_TEST_DB 
     - POSTGRES_USER 
     - POSTGRES_PASSWORD 
     - BCRYPT_PEPPER 
     - SALT_ROUNDS 
     - TOKEN_SECRET 
     -



## Endpoints 

#### Users' Endpoints
- POST /users  
- POST /users/auht
- GET  /users      [Token required]
- GET  /users/:id  [Token required]

#### products' Endpoints
- POST /products     [Token required]
- GET  /products
- GET  /products/:id  

#### orders' Endpoints 
- GET  /orders?userId= id  [Token required]
























