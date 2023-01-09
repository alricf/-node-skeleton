const db = require('../connection');

const searchPasswords = () => {
  return db.query(`SELECT title, login, website, password FROM passwords
  WHERE organization_id = 1 AND title LIKE $1 OR login LIKE $1 OR website LIKE $1 OR password LIKE $1
  ORDER BY id DESC;`)
    .then(data => {
      return data.rows;
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { searchPasswords };
