/* eslint-disable import/extensions */
/* eslint-disable max-len */
import pool from '../dbConfig.js';

// create device
const device = async (req, res) => {
  const createdAt = new Date();
  const updatedAt = new Date();
  const {
    deviceId, deviceName, androdiVersion, startTime, endTime, versionName, appName, recordDuration,
  } = req.body;
  const sql = 'INSERT INTO users.device( device_id,device_name,androdi_version,start_time,end_time,version_name,app_name,record_duration,user_id,created_at,updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)';
  pool.query(sql, [deviceId, deviceName, androdiVersion, startTime, endTime, versionName, appName, recordDuration, req.session.userId, createdAt, updatedAt]);
  req.session.deviceId = req.body.deviceId;
  req.session.sessionID = Math.random() * 10;
  return res.status(200).json({
    message: 'new device added',
  });
};
export default device;
