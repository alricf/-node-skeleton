/*
 * All routes for Passwords Data are defined here
 * Since this file is loaded in server.js into api/passwords,
 *   these routes are mounted onto /api/passwords
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const passwordQueries = require('../db/queries/passwords_by_org');

// GET passwords/api to retrieve title, login and password for all logins for one organization
router.get('/', (req, res) => {
  passwordQueries.getPasswordsByOrg()
  .then(passwords => {
    res.json({ passwords });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
