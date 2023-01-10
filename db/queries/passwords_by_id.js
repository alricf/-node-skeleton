const db = require('../connection');

const getPasswordById = (password) => {
  return db.query(`SELECT website FROM passwords
  WHERE id = $1
  RETURNING *;`, [password.id])
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { getPasswordById };
