//import React from 'react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './TransactionList.css'; // Import the CSS file



const TransactionList = ({ transactions, fetchTransactions }) => {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Handle delete action
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5001/api/transactions/${id}`);
        fetchTransactions(); // Refresh the transaction list
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Handle edit action
  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowPopup(true); // Show the popup to edit the transaction
  };

  // Handle update action
  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:5001/api/transactions/${id}`, updatedData);
      fetchTransactions(); // Refresh the transaction list
      setShowPopup(false); // Close the popup
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="table-container">
      <h2>Transaction List</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.description}</td>
              <td>{transaction.category}</td>
              <td>
              <div className="button-container">
                <button className="edit" onClick={() => handleEdit(transaction)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(transaction._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Transaction Popup */}
      {showPopup && editingTransaction && (
        <div className="popup">
          <h2>Edit Transaction</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editingTransaction._id, editingTransaction);
            }}
          >
            <input
              type="date"
              name="date"
              value={editingTransaction.date}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  date: e.target.value,
                })
              }
            />
            <input
              type="number"
              name="amount"
              value={editingTransaction.amount}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  amount: e.target.value,
                })
              }
            />
            <input
              type="text"
              name="description"
              value={editingTransaction.description}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  description: e.target.value,
                })
              }
            />
            <input
              type="text"
              name="category"
              value={editingTransaction.category}
              onChange={(e) =>
                setEditingTransaction({
                  ...editingTransaction,
                  category: e.target.value,
                })
              }
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
