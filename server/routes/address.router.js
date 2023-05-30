const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// This route *should* return the logged in users pets
router.get('/', (req, res) => {
    console.log('/address GET route');
    // req.isAuthenticated() and req.user are provided by
    // Passport.
    console.log('is authenticated?', req.isAuthenticated());
    // STEP 1: Are we authenticated?
    if(req.isAuthenticated()) {
        // ! User is logged in
        console.log('user', req.user);
        let parameters = [req.user.id];
        let queryText = `SELECT a.*, (sub.street || ', ' || sub.city || ', ' || sub.state || ', ' || sub.zip) as useraddress,
        s.fromdate, s.todate
        FROM address a
        LEFT OUTER JOIN (SELECT * FROM address WHERE user_id = $1) sub
        ON a.id = sub.id
        LEFT OUTER JOIN sales s ON s.user_id = a.user_id
        --WHERE CURRENT_DATE BETWEEN s.fromdate AND s.todate; `;
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



module.exports = router;