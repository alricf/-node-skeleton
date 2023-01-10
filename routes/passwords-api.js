/*
 * All routes for Passwords Data are defined here
 * Since this file is loaded in server.js into api/passwords,
 *   these routes are mounted onto /api/passwords
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

// Router
const express = require('express');
const router  = express.Router();

// Queries
const byOrg = require('../db/queries/passwords_by_org');
const byWork = require('../db/queries/passwords_by_work');
const byFinance = require('../db/queries/passwords_by_finance');
const bySocialMedia = require('../db/queries/passwords_by_social');
const byEntertainment = require('../db/queries/passwords_by_entertainment');
const createPassword = require('../db/queries/create_new_password');
const setNewPassword = require('../db/queries/edit_password');
const delPassword = require('../db/queries/delete_password');
const searchPassword = require('../db/queries/search_passwords');


////////////////////////////
// /api/passwords/ routes
////////////////////////////

// GET /api/passwords/ to retrieve title, login and password for all logins for one organization
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

// GET /api/passwords/work to retrieve title, login and password for all logins categorized as 'work' for one organization
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

// GET /api/passwords/finances to retrieve title, login and password for all logins categorized as 'finances' for one organization
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

// GET /api/passwords/social-media to retrieve title, login and password for all logins categorized as 'social-media' for one organization
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

// GET /api/passwords/entertainment to retrieve title, login and password for all logins categorized as 'entertainment' for one organization
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

// GET /api/passwords/search to search the organization's database for an existing password(login) from the passwords table
router.get('/search', (req, res) => {
  console.log(req.query.searchText);
  const searchTerm = req.query.searchText;
  searchPassword.getPasswordSearch(searchTerm)
  .then(password => {
    res.json({ password });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

// POST /api/passwords to create a new password(login) and add it to the passwords table
router.post('/', (req, res) => {
  const newPassword = req.body;
  const newPassObj = {
                       title: newPassword.title,
                       login: newPassword.login,
                       password: newPassword.password,
                       website: newPassword.website,
                       category: newPassword.category
                      };

  return createPassword.createNewPassword(newPassObj)
  .then(() => {return res.sendStatus(201);})
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

// POST /api/passwords/:id to edit an existing password in the passwords table
router.post('/:id', (req, res) => {
  const editedPass = req.body;
  const editedPassObj = {
                       id: editedPass.id,
                       password: editedPass.password,
                      };

  return setNewPassword.editPassword(editedPassObj)
  .then(() => {return res.status(201).json({statusCode: '201'});})
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

// POST /api/passwords/:id/delete to delete an existing password(login) from the passwords table
router.post('/:id/delete', (req, res) => {
  const deletePassword = req.body;
  const deletePassObj = {id: deletePassword.id};

  return delPassword.deletePassword(deletePassObj)
  .then(() => {return res.status(201).json({statusCode: '201'});})
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});



module.exports = router;
