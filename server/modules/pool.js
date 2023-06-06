const pg = require('pg');
let pool;

if (process.env.DATABASE_URL) {
  // When the app is deployed on Heroku
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  // When running the app locally
  pool = new pg.Pool({
    host: 'ec2-3-232-218-211.compute-1.amazonaws.com',
    port: 5432,
    database: 'd62v8kmvafj7iv',
    user: 'fbuafazsqnxtiw',
    password: '94bcdf88e024a26c3f7e1e1bd9632e9c28257773393c2fb0e17170f43d355196',
    ssl: {
      rejectUnauthorized: false
    }
  });
}

module.exports = pool;
