const db = require('../connection');

const getPasswordsByEntertainment = () => {
  return db.query(`SELECT id, title, login, password FROM passwords WHERE organization_id = 1 AND category = 'Entertainment' ORDER BY id DESC;`)
    .then(data => {
      return data.rows;
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { getPasswordsByEntertainment };
