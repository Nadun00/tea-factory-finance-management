import React, { useState } from 'react';
import axios from 'axios';
import './TransactionForm.css'; // Import the CSS file



const TransactionForm = ({ fetchTransactions }) => {
  const [formData, setFormData] = useState({
    date: '',
    type: 'sale', // Default type is 'sale'
    amount: '',
    description: '',
    category: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      // Make a POST request to backend to add transaction
      await axios.post('http://localhost:5001/api/transactions/add', formData);
      fetchTransactions(); // Refresh the transaction list
      // Reset form after submission
      setFormData({
        date: '',
        type: 'sale',
        amount: '',
        description: '',
        category: '',
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
     <h2>Add New Transaction</h2>
     <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-group">
        <label>Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="sale">Sale</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="form-group">
        <label>Amount</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      </div>
      <div className="form-group">
        <label>Category</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      </div>
      <button type="submit">Add Transaction</button>
    </form>

    </div>
  );
};

export default TransactionForm;
