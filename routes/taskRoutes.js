const express = require('express');
const router = express.Router();
const ToDo = require('../models/todoModel');


router.post('/', async (req, res) => {
    const { title, description, createdBy } = req.body;
    try {
        const newToDo = new ToDo({ title, description, createdBy });
        const todo = await newToDo.save();
        res.status(200).json({ message: 'ToDo created', todo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const todos = await ToDo.find({});
        res.status(200).json({ message: 'All ToDos', todos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:todo_id', async (req, res) => {
    const { todo_id } = req.params;
    try {
        const todo = await ToDo.findById(todo_id);
        if (!todo) {
            return res.status(404).json({ message: 'ToDo not found' });
        }
        res.status(200).json({ message: 'ToDo found', todo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.patch('/:todo_id', async (req, res) => {
    const { todo_id } = req.params;
    const { title, description, createdBy } = req.body;
    try {
        const todo = await ToDo.findByIdAndUpdate(todo_id, { title, description, createdBy }, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'ToDo not found' });
        }
        res.status(200).json({ message: 'ToDo updated', todo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:todo_id', async (req, res) => {
    const { todo_id } = req.params;
    try {
        const todo = await ToDo.findByIdAndDelete(todo_id);
        if (!todo) {
            return res.status(404).json({ message: 'ToDo not found' });
        }
        res.status(200).json({ message: 'ToDo deleted', todo });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/', async (req, res) => {
    try {
        await ToDo.deleteMany({});
        res.status(200).json({ message: 'All ToDos deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
