const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// This route *should* return the logged in users pets
router.get('/', (req, res) => {
    console.log('/pet GET route');
    // req.isAuthenticated() and req.user are provided by
    // Passport.
    console.log('is authenticated?', req.isAuthenticated());
    // STEP 1: Are we authenticated?
    if(req.isAuthenticated()) {
        // ! User is logged in
        console.log('user', req.user);
        let parameters = [req.user.id];
        let queryText = `SELECT * FROM "featured" WHERE "sales_id" = $1;`;
        // STEP 2: Use the logged in users id (req.user.id) to GET
        // the list of pets.
        pool.query(queryText, parameters).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        // ! User is NOT logged in
        res.sendStatus(403);
    }
});

// router.post('/', (req, res) => {
//     console.log('/pet POST route');
//     console.log(req.body);
//     console.log('is authenticated?', req.isAuthenticated());
//     console.log('user', req.user);
//     if(req.isAuthenticated()) {
//         let queryText = `INSERT INTO "pets" ("name", "user_id") VALUES ($1, $2);`;
//         pool.query(queryText, [req.body.name, req.user.id]).then(results => {
//             res.sendStatus(201);
//         }).catch(error => {
//             console.log(`error ${error}`);
//             res.sendStatus(500);
//         })
//     } else {
//         res.sendStatus(403);
//     }
    
// });

module.exports = router;