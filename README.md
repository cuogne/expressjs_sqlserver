## How to run (for PostgreSQL):
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

> You may switch branch to `cinemax` if main branch is main

```zsh
git checkout cinemax
```

3. add your environment variables to .env file, refer to .env.example file

> only need to add values for DB_DATABASE, DB_USER, DB_PASSWORD

```terminal
...
DB_DATABASE= your_database_name # change to your database name
...
DB_USER= your_database_user     # change to your database user
...
DB_PASSWORD= YourPassword        # change to your database password
...
```

4. create a database with the same name as specified in .env file, then run the SQL script in `src/database/movie.sql` to create sample tables and data

```terminal
psql -U your_database_user -d postgres
CREATE DATABASE your_database_name;
\c your_database_name
\i src/database/movie.sql
```

5. start server
```terminal
npm start
```

6. test api with postman or browser
```
GET http://localhost:your_port_number/api/v1/movies
```

## Folder Structure

```
expressjs/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── database.config.js
│   ├── routes/
│   │   └── movie.routes.js
│   ├── controllers/
│   │   └── movie.controller.js
│   ├── models/
│   ├── middleware/
│   └── database/
│       └── movie.sql
├── .env.example
├── package.json
└── README.md
```