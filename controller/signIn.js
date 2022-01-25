/* eslint-disable import/extensions */
/* eslint-disable no-console */
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import pool from '../dbConfig.js';
import isEmailValid from '../validate.js';

// login
const signin = async (req, res) => {
  if (!isEmailValid(req.body.email)) {
    return res.status(400).json({ message: ' invalid email ' });
  }
  const sql = `SELECT * FROM users.users WHERE email LIKE  '${String(req.body.email)}' ;`;
  pool.query(sql, (err, result) => {
    if (err) throw err;
    if (result.rows === '') {
      return res.status(404).json({
        message: 'user not found',
        data: result.rows,
      });
    }
    const dbEmail = result.rows[0].email;
    const dbPassword = result.rows[0].password;
    const dbToken = result.rows[0].token;
    if (dbEmail === req.body.email && dbToken == null) {
      bcrypt.compare(req.body.password, dbPassword, (_err, _result) => {
        if (_err) throw _err;
        if (_result === false) {
          return res.status(401).json({
            message: 'password incorrect ',
          });
        }
        jwt.sign({ user: req.body }, 'secretkey', (jwtToken, token) => {
          const tokenSQL = `UPDATE users.users SET token = $1 WHERE email LIKE '${String(req.body.email)}' ;`;
          if (jwtToken) throw jwtToken;
          pool.query(tokenSQL, [token], (sqlError) => {
            if (err) throw sqlError;
            // setting header
            res.setHeader('authtoken', token);
          });
        });
        return res.status(200).json({
          message: 'logged in ',
        });
      });
    } else if (dbToken != null) {
      res.status(200).json({
        message: 'already logged in ',
      });
    } return true;
  });

  console.log(res);
  console.log(req.headers);
  return res;
};

export default signin;
