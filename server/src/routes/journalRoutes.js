import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { listEntries, createEntry, updateEntry, deleteEntry } from '../controllers/journalController.js';

const router = Router();
router.use(authMiddleware);

router.get('/', listEntries);
router.post('/', createEntry);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);

export default router;
