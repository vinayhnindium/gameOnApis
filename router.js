/* eslint-disable import/extensions */
import express from 'express';
import signup from './controller/signUp.js';
import signin from './controller/signIn.js';
import signout from './controller/signOut.js';
import device from './controller/addDevice.js';
import addMatrix from './controller/metrixInfo.js';
import { getDevices, getDevice } from './controller/getDeviceReport.js';

const router = express.Router();

// signup user
router.post('/signup', signup);

// sigin User
router.post('/signin', signin);

// sigout User
router.post('/signout', signout);

// new device
router.post('/device', device);

// new matrix
router.post('/matrixinfo', addMatrix);

// get devices
router.get('/getdevices', getDevices);

// get a particular devices
router.get('/getdevice', getDevice);

export default router;
