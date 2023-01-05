const db = require('../connection');

const getUserByOrg = () => {
  return db.query('SELECT * FROM users WHERE organization_id = $1;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { getUserByOrg };
