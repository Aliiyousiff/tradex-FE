import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('/api/user/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error("Error fetching transactions", error));
  }, []);

  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.type} {transaction.stock.symbol} - {transaction.quantity} shares
            at ${transaction.price} each
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
