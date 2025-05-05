// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';  // Import the TransactionForm component
import TransactionList from './components/TransactionList';  // Import the TransactionList component
import Header from './components/Header';  // Import the Header component
import './App.css';  // Import the updated CSS

function App() {
  const [transactions, setTransactions] = useState([]);

  // Function to fetch transactions from the backend
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/transactions');
      setTransactions(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();  // Fetch transactions when the app loads
  }, []);

  return (
    <div className="App">
     <Header />  {/* Header component at the top */}

      <h1>Tea Factory Financial System</h1>
      
      {/* TransactionForm to add new transactions */}
      <TransactionForm fetchTransactions={fetchTransactions} />

      {/* TransactionList to display the existing transactions */}
      <TransactionList transactions={transactions} fetchTransactions={fetchTransactions} />
    </div>
  );
}

export default App;
