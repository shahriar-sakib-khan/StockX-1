import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    res.json({msg : "Get all the cylinder data"})
})

router.get('/:id', (req, res) => {
    res.json({msg : "Get a single cylinder data"})
})

router.post('/', (req, res) => {
    res.json({msg : 'Post a single cylinder data'})
})

router.delete('/:id', (req, res) => {
    res.json({msg : 'Delete a single cylinder data'})
})

router.patch('/:id', (req, res) => {
    res.json({msg : 'Update a single cylinder data'})
})

export default router;
