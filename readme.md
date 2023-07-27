# Run
1. Run PostgreSQL Sctiprt
    - Start PostgreSQL Server
    - Setup PostgreSQL Env .../server/src/controllers/index.js
    - psql -U postgres -d postgres -a -f ./init-db.sql
1. Run Server
    - cd .../server
    - npm install
    - npm run startProd
1. Run Front
    - cd .../client
    - npm install
    - npm run start / (if Windows startWin)
    
# DEFAULT ENV
1. Server Adress http://localhost:30001
1. ReactApp Adress http://localhost:3000
1. PostgreSQL Config:
    - DB: postgres
    - USER: postgres
    - HOST: localhost
    - PORT: 5432
    - PASSWORD: postgre

