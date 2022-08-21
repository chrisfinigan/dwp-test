import express from 'express';
import TicketsController from '../controllers/ticketsController.js';

const router = express.Router();

router.post('/purchase', TicketsController.purchase);

export default router;
