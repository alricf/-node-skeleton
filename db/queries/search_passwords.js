const db = require('../connection');

const getPasswordSearch = (searchTerm) => {
  return db.query(`SELECT id, title, login, website, password, category FROM passwords
  WHERE title LIKE $1 OR login LIKE $1 OR website LIKE $1 OR password LIKE $1
  GROUP BY passwords.id
  HAVING organization_id = 1
  ORDER BY id DESC;`, [`%${searchTerm}%`])
    .then(data => {
      return data.rows;
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { getPasswordSearch };
