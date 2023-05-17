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


//template with authorization 
// const express = require('express');
// const router = express.Router();
// const pool = require('../modules/pool');

// // This route *should* return the logged in users pets
// router.get('/', (req, res) => {
//     console.log('/pet GET route');
//     // req.isAuthenticated() and req.user are provided by
//     // Passport.
//     console.log('is authenticated?', req.isAuthenticated());
//     // STEP 1: Are we authenticated?
//     if(req.isAuthenticated()) {
//         // ! User is logged in
//         console.log('user', req.user);
//         let parameters = [req.user.id];
//         let queryText = `SELECT * FROM "address" WHERE "user_id" = $1;`;
        
//         // ! This is authorization, very unlikely you will
//         // ! need this for solo projects.
//         // if(req.user.access_level > 5) {
//         //     // This user has access to view ALL pets
//         //     queryText = `SELECT * FROM "pets";`;
//         //     parameters = [];
//         // }

//         // ! DO NOT pass the user id from the client for data that 
//         // ! requires authentication.
//         // STEP 2: Use the logged in users id (req.user.id) to GET
//         // the list of pets.
//         pool.query(queryText, parameters).then((result) => {
//             res.send(result.rows);
//         }).catch((error) => {
//             console.log(error);
//             res.sendStatus(500);
//         });
//     } else {
//         // ! User is NOT logged in
//         res.sendStatus(403);
//     }
// });

// // This route *should* add a pet for the logged in user

// // router.post('/', (req, res) => {
// //     console.log('/pet POST route');
// //     console.log(req.body);
// //     console.log('is authenticated?', req.isAuthenticated());
// //     console.log('user', req.user);
// //     if(req.isAuthenticated()) {
// //         let queryText = `INSERT INTO "pets" ("name", "user_id") VALUES ($1, $2);`;
// //         pool.query(queryText, [req.body.name, req.user.id]).then(results => {
// //             res.sendStatus(201);
// //         }).catch(error => {
// //             console.log(`error ${error}`);
// //             res.sendStatus(500);
// //         })
// //     } else {
// //         res.sendStatus(403);
// //     }
    
// // });

// module.exports = router;