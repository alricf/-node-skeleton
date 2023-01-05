const db = require('../connection');

const getPasswordsByOrg = () => {
  return db.query('SELECT * FROM passwords WHERE organization_id = $1;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((error => {
      console.log(error);
    }));
};

module.exports = { getPasswordsByOrg };
