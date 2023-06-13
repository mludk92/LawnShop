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
  zip INTEGER null,
  lat double precision not null,
  lng double precision not null
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
values(1,'05/16/2023' , '05/20/2023'),
(1,'05/22/2023' , '05/30/2023');

select * from sales;
--------------------------------------------
insert into address (user_id, city, state, street, zip)
values(1,'mankato', 'Minnesota', '410 S 5th street' , 56001);

select * from address;
--------------------------------------------
insert into featured_items(sales_id, item, price, description)
values(3, 'Dart Board', 20.00, 'Dart Board no working sound'),
(3,'vase',15.00, 'jade vase');

select * from featured_items;
--------------------------------------------

select s.id, s.user_id, sales_id, item, price, description,fromdate,fi.id as item_id, todate from sales s
                         left outer join featured_items fi
                         on s.id = fi.sales_id WHERE "user_id" = 1 o1rder by fromdate desc;

SELECT a.*, (sub.street || ', ' || sub.city || ', ' || sub.state || ', ' || sub.zip) as useraddress, s.fromdate, s.todate
FROM address a
LEFT OUTER JOIN (SELECT * FROM address WHERE user_id = 11) sub ON a.id = sub.id
LEFT OUTER JOIN sales s ON s.user_id = a.user_id
WHERE CURRENT_DATE BETWEEN s.fromdate AND s.todate or (sub.street || ', ' || sub.city || ', ' || sub.state || ', ' || sub.zip) is not null ;




--------------------------------------------
select * from "user";
select * from sales;
select * from address;
select * from featured_items;
--------------------------------------------
--put statement test for sales. 
update sales set fromdate = '2023/05/15', todate = '2023-05-21' where id = 3;

--put statment test for featured_items
update featured_items set item = 'broken vase', description = 'its old and broken' where sales_id = 3 and id = 2 ;

delete from featured_items where sales_id = 16;
delete from sales where id = 16;


--mock data for sales 

insert into sales (user_id, fromdate, todate)
values (9, '2023-05-27', '2023-06-18'),
(10, '2023-05-27', '2023-06-18'),
(11, '2023-05-27', '2023-06-18'),
(12, '2023-05-27', '2023-06-18'),
(13, '2023-05-27', '2023-06-18'),
(14, '2023-05-27', '2023-06-18'),
(15, '2023-05-27', '2023-06-18'),
(16, '2023-05-27', '2023-06-18'),
(17, '2023-05-27', '2023-06-18'),
(18, '2023-05-27', '2023-06-18'),
(19, '2023-05-27', '2023-06-18');

select * from "user" u 
left outer join sales s 
on s.user_id = u.id
left outer join address a 
on a.user_id = u.id;


select * from address;

delete from "user" where id = 23;


