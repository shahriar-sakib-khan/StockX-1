import { Router } from 'express';
import Transaction from '../models/Transaction.js';

const router = Router();

// Create
router.post('/', async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update
router.put('/:id', async (req, res) => {
    try {
        const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete
router.delete('/:id', async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
