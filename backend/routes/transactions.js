// routes/transactions.js

const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');  // Import the Transaction model

// Create a new transaction
router.post('/add', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);  // Create a new transaction from request body
    await transaction.save();  // Save the transaction to the database
    res.status(201).json(transaction);  // Send a success response
  } catch (err) {
    res.status(400).json({ message: err.message });  // Send error response if something goes wrong
  }
});

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();  // Get all transactions from the database
    res.json(transactions);  // Send transactions as a response
  } catch (err) {
    res.status(500).json({ message: err.message });  // Send error response if something goes wrong
  }
});

// Update a transaction
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });  // Update the transaction by ID
    res.json(transaction);  // Send the updated transaction as a response
  } catch (err) {
    res.status(400).json({ message: err.message });  // Send error response if something goes wrong
  }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);  // Delete the transaction by ID
    res.json({ message: 'Transaction deleted' });  // Send success message
  } catch (err) {
    res.status(500).json({ message: err.message });  // Send error response if something goes wrong
  }
});

module.exports = router;  // Export the router to be used in server.js
