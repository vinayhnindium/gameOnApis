/* eslint-disable import/extensions */
/* eslint-disable max-len */
// add device matrixinfo
import pool from '../dbConfig.js';

const addMatrix = async (req, res) => {
  const createdAt = new Date();
  const {
    cpuAppUsage, avgMemoryUsage, avgPowerUsage, avgGpuUsage,
  } = req.body;
  const cpuSql = 'INSERT INTO users."cpu_usage"(session_id, cpu_app_usage, device_id,created_at,user_id) VALUES ($1,$2,$3,$4,$5)';
  const memoryUsageSql = 'INSERT INTO users."memory_usage"(session_id,avg_memory_usage,device_id,created_at,user_id) VALUES ($1,$2,$3,$4,$5)';
  const powerUsageSql = 'INSERT INTO users."power_usage"(session_id,avg_power_usage,device_id,created_at,user_id) VALUES ($1,$2,$3,$4,$5)';
  const gpuUsageSql = 'INSERT INTO users."gpu_usage"(session_id,avg_gpu_usage,device_id,created_at,user_id) VALUES ($1,$2,$3,$4,$5)';
  pool.query(cpuSql, [req.session.sessionID, cpuAppUsage, req.session.deviceId, createdAt, req.session.userId]);
  pool.query(memoryUsageSql, [req.session.sessionID, avgMemoryUsage, req.session.deviceId, createdAt, req.session.userID]);
  pool.query(powerUsageSql, [req.session.sessionID, avgPowerUsage, req.session.deviceId, createdAt, req.session.userID]);
  pool.query(gpuUsageSql, [req.session.sessionID, avgGpuUsage, req.session.deviceId, createdAt, req.session.userId]);
  return res.status(200).json({
    message: 'new device info added',
  });
};
export default addMatrix;
