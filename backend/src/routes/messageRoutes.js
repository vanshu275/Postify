import {sendMessage , getMessages} from '../controllers/messageConroller.js';
import { protect } from '../middleware/authMiddleware.js';
import express from 'express';

const router = express.Router();

router.get('/:receiverId', protect, getMessages);
router.post('/send', protect, sendMessage);

export default router;