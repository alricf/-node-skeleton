/*
 * All routes for Passwords Data are defined here
 * Since this file is loaded in server.js into api/passwords,
 *   these routes are mounted onto /api/passwords
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
// const passwordQueries = require('../routes/queryIndices/apiPasswordsQueriesIndex');
const ogPasswordQueries = require('../db/queries/passwords_by_org');

// GET passwords/api to retrieve title, login and password for all logins for one organization
router.get('/', (req, res) => {
  ogPasswordQueries.getPasswordsByOrg()
  .then(passwords => {
    res.json({ passwords });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

// GET passwords/api/work to retrieve title, login and password for all logins categorized as 'work' for one organization
router.get('/work', (req, res) => {
  ogPasswordQueries.getPasswordsByOrg()
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
