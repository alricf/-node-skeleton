const db = require('../connection');

const deletePassword = (password) => {
  console.log(password);
  return db.query(`DELETE FROM passwords
  WHERE id = $1
  RETURNING *;`, [password.id])
    .then(data => {
      return data.rows;
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { deletePassword };
