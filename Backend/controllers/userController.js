import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import verifyToken from '../middlewares/verifyToken.js';

// Get user by ID (excluding password)
export const getUserById = async (req, res) => {
    try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) throw new Error('No such user');
    return res.status(200).json(user);
    } catch (error) {
    return res.status(500).json({ error: error.message });
    }
};

// Update user by ID
export const updateUser = async (req, res) => {
    if (req.params.id === req.user.id.toString()) {
    try {
        if (req.body.password) {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = newPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
        );
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
    } else {
    return res.status(403).json({ msg: 'You can update only your profile' });
    }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
    try {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ msg: 'No such user' });
    }

    if (req.user.id.toString() === user._id.toString()) {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({ msg: 'Successfully deleted' });
    } else {
        return res.status(403).json({ msg: 'You can delete only your profile' });
    }
    } catch (error) {
    return res.status(500).json({ error: error.message });
    }
};

// Optional: create the router
export const userRouter = Router();

userRouter.get('/find/:id', getUserById);
userRouter.put('/:id', verifyToken, updateUser);
userRouter.delete('/:id', verifyToken, deleteUser);
