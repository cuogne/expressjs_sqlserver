## How to run:
1. clone repo
```
git clone https://github.com/cuogne/expressjs_sqlserver.git
```

2. install dependencies and create .env file

```terminal
cd expressjs_sqlserver
npm install
touch .env
```

3. add your environment variables to .env file, refer to .env.example file

> only need to add values for DB_DATABASE and DB_PASSWORD

```terminal
...
DB_DATABASE= your_database_name # change to your database name
...
DB_PASSWORD=YourPassword        # change to your database password
...
```

4. run sql server on mssql or docker, run script sql in `src/database/script.sql` to create sample database and table with data.

5. start server
```terminal
npm start
```

6. test api with postman or browser
```
GET http://localhost: your_port_number /api/...
```

## Folder Structure

```
expressjs_sqlserver/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── configDatabase.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── controllers/
│   │   └── studentController.js
│   ├── models/
│   ├── middleware/
│   └── database/
│       └── script.sql
├── .env.example
├── package.json
└── README.md
```