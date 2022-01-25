/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { hash as _hash } from 'bcrypt';
import pool from '../dbConfig.js';
import isEmailValid from '../validate.js';

const saltRounds = 10;

// create user
const signup = async (req, res) => {
  if (!isEmailValid(req.body.email)) {
    return res.status(400).json({ message: ' invalid email ' });
  }

  const { name, email, password } = req.body;
  const sql = 'INSERT INTO users.users( name,email,password) VALUES ($1,$2,$3)';
  _hash(password, saltRounds, (_err, hash) => {
    pool.query(sql, [name, email, hash], (err) => {
      if (err) {
        if (err.code === '23505') { return res.json({ message: `new user '${req.body.name}' already regestered with this '${req.body.email}' email, please login` }); }
        return res.send(err);
      }
      return res.status(200).json({
        message: `new user '${req.body.name}' is added to db`,
      });
    });
  });

  return 0;
};
// // get all users
// app.get('/users', (_req, res) => {
//   const sql = 'SELECT * FROM users.users;';
//   pool.query(sql, (err, result) => {
//     if (err) throw err;
//     return res.status(200).json({
//       message: 'list users are fetched..!',
//       Brand: result.rows,
//     });
//   });
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => { console.log(`server is listening to port ${port} `); });

//

//

export default signup;
