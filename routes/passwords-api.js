/*
 * All routes for Passwords Data are defined here
 * Since this file is loaded in server.js into api/passwords,
 *   these routes are mounted onto /api/passwords
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// Router
const express = require('express');
const router  = express.Router();
const app     = express();

// Queries
const byOrg = require('../db/queries/passwords_by_org');
const byWork = require('../db/queries/passwords_by_work');
const byFinance = require('../db/queries/passwords_by_finance');
const bySocialMedia = require('../db/queries/passwords_by_social');
const byEntertainment = require('../db/queries/passwords_by_entertainment');
const createPassword = require('../db/queries/create_new_password');

// GET passwords/api to retrieve title, login and password for all logins for one organization
router.get('/', (req, res) => {
  byOrg.getPasswordsByOrg()
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
  byWork.getPasswordsByWork()
  .then(passwords => {
    res.json({ passwords });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

// GET passwords/api/finances to retrieve title, login and password for all logins categorized as 'finances' for one organization
router.get('/finance', (req, res) => {
  byFinance.getPasswordsByFinance()
  .then(passwords => {
    res.json({ passwords });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

// GET passwords/api/social-media to retrieve title, login and password for all logins categorized as 'social-media' for one organization
router.get('/social-media', (req, res) => {
  bySocialMedia.getPasswordsBySocial()
  .then(passwords => {
    res.json({ passwords });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

// GET passwords/api/entertainment to retrieve title, login and password for all logins categorized as 'entertainment' for one organization
router.get('/entertainment', (req, res) => {
  byEntertainment.getPasswordsByEntertainment()
  .then(passwords => {
    res.json({ passwords });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

// POST passwords/api to create a new password(login) and add it to the passwords table
router.post('/', (req, res) => {
  const newPassword = req.body;
  const newPassObj = { title: newPassword.title,
                       login: newPassword.login,
                       password: newPassword.password,
                       website: newPassword.website,
                       category: newPassword.category
                      };

  return createPassword.createNewPassword(newPassObj)
  .then(() => {return res.status(201).json({statusCode: '201'});})
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});


module.exports = router;
