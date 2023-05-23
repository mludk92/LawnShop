CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80) UNIQUE NOT NULL,
  password VARCHAR(1000) NOT NULL
);

CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "user"(id),
  fromdate DATE NOT NULL,
  todate DATE NOT NULL
);

CREATE TABLE address (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES "user"(id),
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
--------------------------------------------
insert into "user"( username, password)
values('admin' , 'admin');

select * from "user" ;
--------------------------------------------
insert into sales(user_id ,fromdate, todate)
values(8,'05/16/2023' , '05/20/2023'),
(8,'05/22/2023' , '05/30/2023');

select * from sales;
--------------------------------------------
insert into address (user_id, city, state, street, zip)
values(2,'mankato', 'Minnesota', '410 S 5th street' , 56001);

select * from address;
--------------------------------------------
insert into featured_items(sales_id, item, price, description)
values(3, 'Dart Board', 20.00, 'Dart Board no working sound'),
(4,'vase',15.00, 'jade vase');

select * from featured_items;
--------------------------------------------

select s.id, s.user_id, sales_id, item, price, description,fromdate, todate from sales s
                         left outer join featured_items fi
                         on s.id = fi.sales_id WHERE "user_id" = 8 order by fromdate desc;

SELECT a.*, (sub.street || ', ' || sub.city || ', ' || sub.state || ', ' || sub.zip) as useraddress
FROM address a
LEFT OUTER JOIN (SELECT * FROM address WHERE user_id = 8) sub
ON a.id = sub.id;



--------------------------------------------
select * from "user";
select * from sales;
select * from address;
select * from featured_items;
--------------------------------------------


