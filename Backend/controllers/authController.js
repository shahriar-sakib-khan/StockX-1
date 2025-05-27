import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';  // assuming User is an ES module export

export const register = async (req, res) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) {
      return res.status(400).json({ error: "Email is already taken by another user" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({ ...req.body, password: hashedPassword });

    const { password, ...others } = newUser._doc;
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '8d' });

    return res.status(201).json({ user: others, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: 'Wrong credentials. Try again!' });
    }

    const comparePass = await bcrypt.compare(req.body.password, user.password);
    if (!comparePass) {
      return res.status(400).json({ error: 'Wrong credentials. Try again!' });
    }

    const { password, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8d' });

    return res.status(200).json({ user: others, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Optional: if you want to create a Router with these handlers
export const authRouter = Router();
authRouter.post('/register', register);
authRouter.post('/login', login);
