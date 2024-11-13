import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoItemCard from "./CryptoItemCard"; // Assuming this is your Crypto item card component
import StockItemCard from "./StockItemCard"; // Assuming this is your Stock item card component

const UserWallet = () => {
  // Initial user balance
  const [balance, setBalance] = useState(10000);
  const [favorites, setFavorites] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [cryptos, setCryptos] = useState([]); // Assuming a list of crypto data
  const [stocks, setStocks] = useState([]);   // Assuming a list of stock data

  useEffect(() => {
    // Fetch the list of cryptos and stocks when the component mounts
    axios.get("/api/cryptos") // Mocked API endpoint
      .then((response) => setCryptos(response.data))
      .catch((error) => console.error("Error fetching cryptos", error));

    axios.get("/api/stocks")  // Mocked API endpoint
      .then((response) => setStocks(response.data))
      .catch((error) => console.error("Error fetching stocks", error));
  }, []);

  // Handle Buy functionality
  const handleBuy = (item) => {
    if (balance >= item.price) {
      setBalance(balance - item.price);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { type: "Buy", ...item, price: item.price },
      ]);
      alert(`You bought ${item.name}`);
    } else {
      alert("Insufficient balance to buy this item.");
    }
  };

  // Handle Sell functionality
  const handleSell = (item) => {
    setBalance(balance + item.price);
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { type: "Sell", ...item, price: item.price },
    ]);
    alert(`You sold ${item.name}`);
  };

  // Add/Remove from Favorites
  const handleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.id === item.id)) {
        // Remove from favorites
        return prevFavorites.filter((fav) => fav.id !== item.id);
      } else {
        // Add to favorites
        return [...prevFavorites, item];
      }
    });
  };

  return (
    <div>
      <h2>Your Wallet</h2>
      <p>Balance: ${balance.toFixed(2)}</p>

      <h3>Cryptos</h3>
      <div className="crypto-list">
        {cryptos.map((crypto) => (
          <CryptoItemCard
            key={crypto.id}
            crypto={crypto}
            onBuy={handleBuy}
            onSell={handleSell}
            onFavorite={handleFavorite}
          />
        ))}
      </div>

      <h3>Stocks</h3>
      <div className="stock-list">
        {stocks.map((stock) => (
          <StockItemCard
            key={stock.id}
            stock={stock}
            onBuy={handleBuy}
            onSell={handleSell}
            onFavorite={handleFavorite}
          />
        ))}
      </div>

      <h3>Your Favorite List</h3>
      <ul>
        {favorites.map((item) => (
          <li key={item.id}>
            {item.name} ({item.symbol}){" "}
            <button onClick={() => handleFavorite(item)}>Remove from favorites</button>
          </li>
        ))}
      </ul>

      <h3>Transaction History</h3>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.type} {transaction.name} ({transaction.symbol}) - ${transaction.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserWallet;
