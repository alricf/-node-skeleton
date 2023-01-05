const db = require('../connection');

const getUserById = () => {
  return db.query('SELECT * FROM users WHERE id = $1;')
    .then(data => {
      return data.rows[0];
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { getUserById };
