const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// This route *should* return the logged in user's featured items
router.get('/', (req, res) => {
  console.log('/featured GET route');
  console.log('is authenticated?', req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log('user', req.user);
    const parameters = [req.user.id];
    const queryText = `SELECT s.id, s.user_id, sales_id, item, price, description, fromdate, fi.id AS item_id, todate
      FROM sales s
      LEFT OUTER JOIN featured_items fi ON s.id = fi.sales_id
      WHERE "user_id" = $1
      ORDER BY fromdate DESC, item_id ASC;`;
    pool
      .query(queryText, parameters)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// POST
router.post('/', (req, res) => {
  console.log('/featured POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO featured_items(sales_id, item, price, description)
      VALUES($1, $2, $3, $4);`;
    const values = [
      req.body.sales_id,
      req.body.item,
      req.body.price,
      req.body.description,
    ];
    pool
      .query(queryText, values)
      .then((results) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(`error ${error}`);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// DELETE
router.delete('/', (req, res) => {
  console.log('/featured DELETE route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);
  if (req.isAuthenticated()) {
    const queryText = `DELETE FROM featured_items WHERE sales_id = $1 AND id = $2;`;
    const values = [req.body.sales_id, req.body.item_id];
    pool
      .query(queryText, values)
      .then((results) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(`error ${error}`);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
