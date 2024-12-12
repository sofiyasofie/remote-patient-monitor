# Remote Patient Monitoring Platform

## Set up PostgreSQL
On Mac:
```
brew install postgresql
brew services start postgresql
psql -U postgres
CREATE DATABASE vitalsdb;
\c vitalsdb
CREATE TABLE vitals (
    id SERIAL PRIMARY KEY,
    heart_rate INTEGER NOT NULL,
    blood_pressure VARCHAR(7) NOT NULL,
    respiratory_rate INTEGER NOT NULL,
    body_temperature FLOAT NOT NULL,
    symptoms TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

Add the following to a .env file in the backend directory:

```
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DATABASE=vitalsdb
```
Verify installation by running:
```
psql -U postgres
\l
\dt 
```
Now run the web app, and use the form to insert some vital signs to be included in the table!


## How to run

Open a terminal and while in the project directory, run
```
cd frontend
npm start
psql -U postgres
```

In a new terminal (still in project directory), run 
```
cd backend
node index.js
```

