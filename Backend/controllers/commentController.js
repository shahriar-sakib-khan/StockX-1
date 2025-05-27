import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.js';  // assuming verifyToken is exported as default
import Comment from '../models/Comment.js';

// Get all comments for a listing
export const getComments = async (req, res) => {
    try {
    const comments = await Comment
        .find({ listing: req.params.listingId })
        .populate('author', '-password');

    return res.status(200).json(comments);
    } catch (error) {
    return res.status(500).json({ error: error.message });
    }
};

// Create a comment
export const createComment = async (req, res) => {
    try {
    const createdComment = await (await Comment.create({ ...req.body, author: req.user.id }))
        .populate('author', '-password');

    return res.status(201).json(createdComment);
    } catch (error) {
    return res.status(500).json({ error: error.message });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
    const comment = await Comment.findById(req.params.commentId);

    if (comment.author.toString() === req.user.id) {
        await Comment.findByIdAndDelete(req.params.commentId);
        return res.status(200).json({ msg: "Comment has been successfully deleted" });
    } else {
        return res.status(403).json({ msg: "You can delete only your own comments" });
    }
    } catch (error) {
    return res.status(500).json({ error: error.message });
    }
};

// Optional: create the router
export const commentRouter = Router();

commentRouter.get('/:listingId', getComments);
commentRouter.post('/', verifyToken, createComment);
commentRouter.delete('/:commentId', verifyToken, deleteComment);
