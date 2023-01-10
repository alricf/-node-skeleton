const db = require('../connection');

const getPasswordById = (password) => {
  return db.query(`SELECT website FROM passwords
  WHERE id = $1;`, [password])
    .then(data => {
      console.log(data.rows[0]);
      return data.rows[0];
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { getPasswordById };
