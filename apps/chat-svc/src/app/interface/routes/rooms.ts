import express from 'express';
import verifyToken from '@infrastructure/middleware/auth';
import { createRoom, exitRoom, getRooms, joinRoom } from '@controllers/rooms';

const router = express.Router();

router.get('/', getRooms);
router.post('/create', createRoom);
router.post('/join', joinRoom);
router.post('/exit', verifyToken, exitRoom);

export default router;
