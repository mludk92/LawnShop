const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;


// with async

// router.post('/', async (req, res)=> {
//   const db = await pool.connect 
//   try {
//     //start of multiple queries
//     await db.query('BEGIN')
//     //post router code here
//     let queryText = 
//     `insert into users( username, password)
//      values($1 , $2) returning id;`
//     const result  = await db.query(queryText, ['admin', 'admin'])
//     const userId = result.rows[0].id

//     const fromdate = [1,2,3,4]
//     const todate = [1,2,3,4]

//     queryText = `
//     insert into sales(user_id ,fromdate, todate)
//     values($1,$2, $3)`

//     for(let day of fromdate ){
//       await db.query(queryText, [userId, fromdate, todate])
//     }
//     //this commits all of the queries
//     await db.query('commit')
//     res.sendStatus(201)
//   }catch(e){
//     console.log('ROLLBACK', e)
//     await client.query('ROLLBACK')
//     res.sendStatus(500)

//   }finally {
//     client.release()
//   }
// })