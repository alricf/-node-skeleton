const db = require('../connection');

const editPassword = (password) => {
  console.log(password);
  return db.query(`UPDATE passwords
  SET title = $1, login = $2, password = $3, website = $4, category = $5
  WHERE organization_id = 1)
  RETURNING *;`, [password.title, password.login, password.password, password.website, password.category])
    .then(data => {
      return data.rows;
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { editPassword };
