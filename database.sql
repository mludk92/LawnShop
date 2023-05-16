
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

--database lawn_shop


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
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
  city VARCHAR NOT NULL,
  state VARCHAR NOT NULL,
  street VARCHAR null,
  zip INTEGER null
);

CREATE TABLE featured_items (
  id SERIAL PRIMARY KEY,
  sales_id INTEGER REFERENCES sales(id),
  item VARCHAR NOT NULL,
  price DECIMAL null,
  desc VARCHAR null
);
