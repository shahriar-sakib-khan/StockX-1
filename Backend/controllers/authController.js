import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

const authRouter = Router();

// Register
authRouter.post('/register', [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const isExisting = await User.findOne({ email: req.body.email });
        if (isExisting) return res.status(400).json({ error: 'Email already in use' });

        const newUser = new User(req.body);
        await newUser.save();

        const { password, ...others } = newUser._doc;
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '8d' });

        res.status(201).json({ user: others, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
authRouter.post('/login', [
    body('email').isEmail(),
    body('password').notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ error: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

        const { password, ...others } = user._doc;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8d' });

        res.status(200).json({ user: others, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default authRouter;
