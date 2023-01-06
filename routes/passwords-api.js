/*
 * All routes for Passwords Data are defined here
 * Since this file is loaded in server.js into api/passwords,
 *   these routes are mounted onto /api/passwords
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
// const passwordQueries = require('../routes/queryIndices/apiPasswordsQueriesIndex');

const byOrg = require('../db/queries/passwords_by_org');
const byWork = require('../db/queries/passwords_by_work');
// const byFinances = require('../db/queries/passwords_by_finances');
// const bySocialMedia = require('../db/queries/passwords_by_social-media');
// const byEntertainment = require('../db/queries/passwords_by_entertainment');

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

// // GET passwords/api/finances to retrieve title, login and password for all logins categorized as 'finances' for one organization
// router.get('/finances', (req, res) => {
//   byFinances.getPasswordsByFinances()
//   .then(passwords => {
//     res.json({ passwords });
//   })
//   .catch(err => {
//     res
//       .status(500)
//       .json({ error: err.message });
//   });
// });

// // GET passwords/api/social-media to retrieve title, login and password for all logins categorized as 'social-media' for one organization
// router.get('/social-media', (req, res) => {
//   ogPasswordQueries.getPasswordsByOrg()
//   .then(passwords => {
//     res.json({ passwords });
//   })
//   .catch(err => {
//     res
//       .status(500)
//       .json({ error: err.message });
//   });
// });

// // GET passwords/api/entertainment to retrieve title, login and password for all logins categorized as 'entertainment' for one organization
// router.get('/entertainment', (req, res) => {
//   ogPasswordQueries.getPasswordsByOrg()
//   .then(passwords => {
//     res.json({ passwords });
//   })
//   .catch(err => {
//     res
//       .status(500)
//       .json({ error: err.message });
//   });
// });



module.exports = router;
