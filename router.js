/* eslint-disable import/extensions */
import express from 'express';
import signup from './controller/signUp.js';
import signin from './controller/signIn.js';
import signout from './controller/signOut.js';

const router = express.Router();

// signup user
router.post('/signup', signup);

// sigin User
router.post('/signin', signin);

// sigout User
router.post('/signout', signout);

export default router;
