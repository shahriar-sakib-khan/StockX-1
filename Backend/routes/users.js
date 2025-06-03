import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    res.json({msg : "Get all the user data"})
})

router.get('/:id', (req, res) => {
    res.json({msg : "Get a single user data"})
})

router.post('/', (req, res) => {
    res.json({msg : 'Post a single user data'})
})

router.delete('/:id', (req, res) => {
    res.json({msg : 'Delete a single user data'})
})

router.patch('/:id', (req, res) => {
    res.json({msg : 'Update a single user data'})
})

export default router;
