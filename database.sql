
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

--test data
--------------------------------------------
insert into users( username, password)
values('admin' , 'admin');

select * from users ;
--------------------------------------------
insert into sales(user_id ,fromdate, todate)
values(1,'05/16/2023' , '05/20/2023');

select * from sales;
--------------------------------------------
insert into address (user_id, city, state, street, zip)
values(1,'mankato', 'Minnesota', '410 S 5th street' , 56001);

select * from address;
--------------------------------------------
insert into featured_items(sales_id, item, price, description)
values(1, 'MTG Cards', 2000.00, 'Rare Black Lotis Alpha'),
(1,'couch',5.00, 'old couch good contition 5 obo');

select * from featured_items;
--------------------------------------------

--------------------------------------------
select * from users;
select * from sales;
select * from address;
select * from featured_items;
--------------------------------------------



