////////////////////////////
// /api/users/
////////////////////////////

/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// Router
const express = require('express');
const router  = express.Router();

// Query
const userQueries = require('../db/queries/users');

////////////////////////////
// /api/users/ route
////////////////////////////

// GET /api/passwords/ to retrieve name, email, password and organization for all users
router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
