import React from 'react';
import TransactionHistory from '../components/TransactionHistory';
import FavoriteStocks from '../components/FavoriteStocks';
import StockChart from '../components/StockChart';

const Dashboard = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <StockChart stockSymbol="AAPL" />
      <TransactionHistory />
      <FavoriteStocks />
    </div>
  );
};

export default Dashboard;
