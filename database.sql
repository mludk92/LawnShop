
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

--database lawn_shop

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80) UNIQUE NOT NULL,
  password VARCHAR(1000) NOT NULL
);

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  fromdate DATE NOT NULL,
  todate DATE NOT NULL
);

CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  street VARCHAR(300) null,
  zip INTEGER null
);

CREATE TABLE featured_items (
  id SERIAL PRIMARY KEY,
  sales_id INTEGER REFERENCES sales(id),
  item VARCHAR(80) NOT NULL,
  price DECIMAL null,
  description VARCHAR(1000) null
);
