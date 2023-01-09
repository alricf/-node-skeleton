const db = require('../connection');

const getPasswordsByWork = () => {
  return db.query(`SELECT title, login, password FROM passwords WHERE organization_id = 1 AND category = 'Work' ORDER BY id DESC;`)
    .then(data => {
      return data.rows;
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { getPasswordsByWork };
