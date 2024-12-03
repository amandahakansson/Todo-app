const mongoose = require('mongoose');

// Definiera ToDo-schema
const ToDoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Skapa modellen
const ToDo = mongoose.model('ToDo', ToDoSchema);

module.exports = ToDo;
