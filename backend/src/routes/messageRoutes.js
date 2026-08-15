import { getMessages, getConversationUsers} from '../controllers/messageConroller.js';
import { protect } from '../middleware/authMiddleware.js';
import express from 'express';

const router = express.Router();

router.get('/conversations' , protect , getConversationUsers)
router.get('/:receiverId', protect, getMessages);


export default router;