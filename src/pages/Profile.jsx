import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState({ stocks: [], cryptos: [] });
  const [wallet, setWallet] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }

    axios
      .get("/api/profile/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userData = response.data;
        setUser(userData);
        setBalance(userData.balance || 0);
        setFavorites({
          stocks: userData.favorites?.stocks || [],
          cryptos: userData.favorites?.cryptos || [],
        });
        setWallet(userData.wallet || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data available.</div>;

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
