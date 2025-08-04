import express from 'express';

const router = express.Router();

const healthCheck = (_, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date()
  };

  res.status(200).send(data);
}

router.get('/health-check', healthCheck);

export default router;
