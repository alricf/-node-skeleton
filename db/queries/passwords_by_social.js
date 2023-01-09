const db = require('../connection');

const getPasswordsBySocial = () => {
  return db.query(`SELECT title, login, password FROM passwords WHERE organization_id = 1 AND category = 'Social' ORDER BY id DESC;`)
    .then(data => {
      return data.rows;
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { getPasswordsBySocial };
