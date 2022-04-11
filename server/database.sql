DROP DATABASE IF EXISTS tpe_db;
CREATE DATABASE tpe_db;

\c tpe_db;

DROP TABLE IF EXISTS employees CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS region CASCADE;
DROP TABLE IF EXISTS event_details CASCADE;
DROP TABLE IF EXISTS transportation_details CASCADE;
DROP TABLE IF EXISTS venue_details CASCADE;
DROP TABLE IF EXISTS sales_stats CASCADE;


-- General Info
CREATE TABLE employees
(
    ID SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL UNIQUE,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    role TEXT NOT NULL
);

-- CREATE TABLE clients
-- (
--     client_name TEXT PRIMARY KEY,
--     client_type TEXT NOT NULL
-- );

-- CREATE TABLE region (
--     region TEXT PRIMARY KEY
-- );

-- -- create table production (
-- --     staging TEXT,
-- --     lighting TEXT,
-- --     sound TEXT,
-- --     structure TEXT,
-- --     amount INTEGER
-- -- );

-- -- create table transportation (
-- --     staging TEXT,
-- --     lighting TEXT,
-- --     sound TEXT,
-- --     structure TEXT,
-- --     amount INTEGER
-- -- );
-- -- create table production (
-- --     staging TEXT,
-- --     lighting TEXT,
-- --     sound TEXT,
-- --     structure TEXT,
-- --     amount INTEGER
-- -- );
-- -- General Info



-- -- Step 1 Details
-- CREATE TABLE event_details
-- (
--     ID SERIAL PRIMARY KEY,
--     region TEXT NOT NULL,
--     event_date DATE NOT NULL,
--     client_type TEXT NOT NULL,
--     client_1 TEXT NOT NULL REFERENCES clients(client_name),
--     client_2 TEXT NOT NULL,
--     event_type TEXT NOT NULL,
--     guest_count INTEGER NOT NULL,
--     venue_name TEXT NOT NULL,
--     signer BOOLEAN,
--     tpe BOOLEAN,
--     client BOOLEAN,
--     amount INTEGER,
--     CONSTRAINT region FOREIGN KEY (region) REFERENCES region(region)
-- );

-- create table venue_details (
--     ID SERIAL PRIMARY KEY,
--     start_time TIMESTAMP NOT NULL,
--     end_time TIMESTAMP NOT NULL,
--     rental TEXT,
--     food TEXT NOT NULL,
--     hosted_bar BOOLEAN,
--     bar_min INTEGER,
--     client_risk INTEGER,
--     tpe_risk INTEGER,
--     tpe_loss INTEGER,
--     hard_costs INTEGER,
--     risk INTEGER
-- );

-- create table event_staff (
--     ID SERIAL PRIMARY KEY,
--     staff_name TEXT NOT NULL,
--     staff_type TEXT NOT NULL,
--     staff_role TEXT NOT NULL,
--     quantity INTEGER,
--     amount INTEGER,
-- );

-- create table transportation_details (
--     ID SERIAL PRIMARY KEY,
--     start_time TIMESTAMP NOT NULL,
--     end_time TIMESTAMP NOT NULL,
--     pu_address TEXT NOT NULL,
--     pu_address2 TEXT,
--     do_address TEXT NOT NULL,
--     do_address2 TEXT,
--     transportation_type TEXT,
--     quantity INTEGER,
--     amount INTEGER,
-- );

-- create table production_details (
--     ID SERIAL PRIMARY KEY,
--     staging TEXT,
--     lighting TEXT,
--     sound TEXT,
--     structure TEXT,
--     transport TEXT,
--     aux TEXT,
--     other TEXT,
--     quantity INTEGER,
--     amount INTEGER,
-- );

-- -- Step 1 Details

-- create table sales_stats (
--     ID SERIAL PRIMARY KEY,
--     employee_name INT REFERENCES employees(id),
--     client_name TEXT REFERENCES clients(client_name),
--     revenue INTEGER,
--     profit INTEGER,
--     profit_percentage INTEGER
-- );


INSERT INTO employees
(email, username, password, firstname, lastname, role )
VALUES
('test@test.com','bobby1','testpassword','bob','bobbington','sales'),
('test2@test.com','ronny2','testpassword2','ron','ronnington','admin'),
('test3@test.com','jonny3','testpassword3','jon','jonnington','owner');


-- INSERT INTO region (region)
-- VALUES
-- ('LA'), ('OC'), ('SD'), ('SB'), ('SLO');


