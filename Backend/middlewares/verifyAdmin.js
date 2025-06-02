import User from "../models/User.js";

const verifyAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access only' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default verifyAdmin;
