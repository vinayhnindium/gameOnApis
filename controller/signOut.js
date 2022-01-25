/* eslint-disable import/extensions */
/* eslint-disable no-console */
import * as dbConfigJs from '../dbConfig.js';

// signout
const signout = async (req, res) => {
  console.log(req.headers.authtoken);
  const sql = `UPDATE users.users SET token = $1 WHERE token = '${String(req.headers.authtoken)}';`;
  dbConfigJs.pool.query(sql, [null], (sqlErorr) => {
    if (sqlErorr) throw sqlErorr;
    return res.status(200).json({
      message: ' logged out ',
    });
  });
};
export default signout;
