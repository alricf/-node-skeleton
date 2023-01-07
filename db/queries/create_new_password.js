const db = require('../connection');

const createNewPassword = (password) => {
  console.log(password);
  return db.query(`INSERT INTO passwords(title, login, password, website, category, organization_id)
    VALUES ($1, $2, $3, $4, $5, 1)
    RETURNING *;`, [password.title, password.login, password.password, password.website, password.category])
    .then(data => {
      return data.rows;
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { createNewPassword };
