/* eslint-disable import/extensions */
/* eslint-disable max-len */
import pool from '../dbConfig.js';

// get devices
const getDevices = async (req, res) => {
  const {
    userId,
  } = req.query;
  const sql = 'SELECT UD.device_id,device_name,app_name,CU.cpu_app_usage,GU.avg_gpu_usage,MU.avg_memory_usage,PU.avg_power_usage FROM users.device UD FULL JOIN users.cpu_usage CU ON  UD.device_id = CU.device_id FULL JOIN users.gpu_usage GU ON  CU.device_id = GU.device_id FULL JOIN users.memory_usage MU ON  GU.device_id = MU.device_id FULL JOIN users.power_usage PU ON  MU.device_id = PU.device_id WHERE UD.user_id = $1';
  pool.query(sql, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
// get a particular device
const getDevice = async (req, res) => {
  const {
    userId, deviceId,
  } = req.query;
  const sql = 'SELECT UD.device_id,device_name,app_name,CU.cpu_app_usage,GU.avg_gpu_usage,MU.avg_memory_usage,PU.avg_power_usage FROM users.device UD FULL JOIN users.cpu_usage CU ON  UD.device_id = CU.device_id FULL JOIN users.gpu_usage GU ON  CU.device_id = GU.device_id FULL JOIN users.memory_usage MU ON  GU.device_id = MU.device_id FULL JOIN users.power_usage PU ON  MU.device_id = PU.device_id WHERE UD.user_id = $1  AND UD.device_id = $2;';
  pool.query(sql, [userId, deviceId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
export { getDevices, getDevice };
