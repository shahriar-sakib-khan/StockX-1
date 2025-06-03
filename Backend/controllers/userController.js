import { Router } from 'express';
import User from '../models/User.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

// Get current user
router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user by ID
router.get('/find/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ error: 'No such user' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user
router.put('/:id', verifyToken, async (req, res) => {
    if (req.params.id !== req.user.id) {
        return res.status(403).json({ error: 'You can update only your profile' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        ).select('-password');
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete user
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'No such user' });

        if (req.user.id !== user._id.toString()) {
            return res.status(403).json({ error: 'You can delete only your profile' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
