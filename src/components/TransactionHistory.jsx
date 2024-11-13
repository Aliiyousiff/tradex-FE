import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching
  const [error, setError] = useState(null); // Error state for handling fetch errors

  useEffect(() => {
    // Fetch the transactions when the component mounts
    axios.get('/api/user/transactions')
      .then(response => {
        setTransactions(response.data);
        setLoading(false); // Set loading to false after successful fetch
      })
      .catch(error => {
        setError('Failed to load transaction history.');
        setLoading(false); // Set loading to false on error
        console.error("Error fetching transactions", error);
      });
  }, []);

  // Render a loading message, error message, or the transaction list
  if (loading) {
    return <div>Loading transactions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>
              {transaction.type} {transaction.stock.symbol} - {transaction.quantity} shares
              at ${transaction.price.toFixed(2)} each
              {transaction.date && <span> on {new Date(transaction.date).toLocaleDateString()}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;
