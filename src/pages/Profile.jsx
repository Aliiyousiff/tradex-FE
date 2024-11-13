import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState({ stocks: [], cryptos: [] });
  const [wallet, setWallet] = useState([]);
  const [balance, setBalance] = useState(0);

  // Fetch user profile data
  useEffect(() => {
    axios.get('/api/user')
      .then(response => {
        setUser(response.data);
        setBalance(response.data.balance);
        setFavorites({
          stocks: response.data.favorites.stocks || [],
          cryptos: response.data.favorites.cryptos || [],
        });
        setWallet(response.data.wallet || []);
      })
      .catch(error => console.error("Error fetching user profile:", error));
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Balance: ${balance.toFixed(2)}</p>

      {/* Display Wallet Information */}
      <div className="wallet-section">
        <h3>Wallet</h3>
        <ul>
          {wallet.length === 0 ? (
            <li>No items in wallet.</li>
          ) : (
            wallet.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong>: ${item.amount.toFixed(2)}
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Display Favorites (Stocks) */}
      <div className="favorites-section">
        <h3>Favorites - Stocks</h3>
        {favorites.stocks.length === 0 ? (
          <p>No favorite stocks.</p>
        ) : (
          <ul>
            {favorites.stocks.map((stock, index) => (
              <li key={index}>
                <strong>{stock.name}</strong> ({stock.symbol}) - ${stock.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display Favorites (Cryptos) */}
      <div className="favorites-section">
        <h3>Favorites - Cryptocurrencies</h3>
        {favorites.cryptos.length === 0 ? (
          <p>No favorite cryptocurrencies.</p>
        ) : (
          <ul>
            {favorites.cryptos.map((crypto, index) => (
              <li key={index}>
                <strong>{crypto.name}</strong> ({crypto.symbol}) - ${crypto.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
