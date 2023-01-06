/*
 * All routes for Passwords Data are defined here
 * Since this file is loaded in server.js into api/passwords,
 *   these routes are mounted onto /api/passwords
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
// const db = require('../db/connection');
const passwordQueries = require('../db/queries/passwords_by_org');

router.get('/api/passwords/', (req, res) => {
  passwordQueries.getPasswordsByOrg()
  .then(data => {
    const passwords = data.rows;
    res.json({ passwords });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
