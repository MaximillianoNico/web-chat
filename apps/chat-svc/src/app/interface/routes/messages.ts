import express from 'express';
import { getMessageByID, sendMessage } from '@controllers/messages';

const router = express.Router();

router.get('/', getMessageByID);
router.post('/send', sendMessage);

export default router;
