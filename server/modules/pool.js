

const pg = require('pg');
let pool;

// When our app is deployed to the internet 
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg: 
//  DATABASE_URL=postgresql:
if (process.env.DATABASE_URL) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
// When we're running this app on our own computer
// we'll connect to the postgres database that is 
// also running on our computer (localhost)
else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'lawn_shop',// 	💥 Change this to the name of your database!
        // user: 'mludkey'  ,
        // password: 'admin', 
    });
}

module.exports = pool;
