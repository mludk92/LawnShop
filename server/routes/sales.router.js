const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// This route *should* return the logged in users pets
router.get('/', (req, res) => {
    console.log('/sales GET route');
    // req.isAuthenticated() and req.user are provided by
    // Passport.
    console.log('is authenticated?', req.isAuthenticated());
    // STEP 1: Are we authenticated?
    if(req.isAuthenticated()) {
        // ! User is logged in
        console.log('user', req.user);
        let parameters = [req.user.id];
        console.log(parameters,'params')
        let queryText = `select * from sales where user_id = $1 order by fromdate asc`;
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

router.post('/', (req, res) => {
    console.log('/sales POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()) {
        let queryText = `insert into sales(user_id ,fromdate, todate)
        values($1 , $2, $3)`;
        let values = [req.user.id, req.body.fromdate, req.body.todate];
        pool.query(queryText, values).then(results => {
            res.sendStatus(201);
        }).catch(error => {
            console.log(`error ${error}`);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
    
});

router.delete('/', (req, res) => {
    console.log('/sales DELETE route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if (req.isAuthenticated()) {
      const saleId = req.body.id; // Use req.body.id to access the saleId
  
      const deleteFeaturedItemsQuery = `DELETE FROM featured_items WHERE sales_id = $1`;
      const deleteSaleQuery = `DELETE FROM sales WHERE id = $1`;
  
      pool.query(deleteFeaturedItemsQuery, [saleId])
        .then(() => {
          return pool.query(deleteSaleQuery, [saleId]);
        })
        .then(() => {
          console.log('Deletion successful');
          res.sendStatus(201);
        })
        .catch(error => {
          console.log('Error in Sale Delete:', error);
          res.sendStatus(500);
        });
    } else {
      res.sendStatus(403);
    }
  });
  
  


module.exports = router;