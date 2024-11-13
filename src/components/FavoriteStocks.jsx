import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FavoriteStocks = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    // Fetch the list of favorite stocks
    axios.get('/api/user/favorites')
      .then(response => {
        setFavorites(response.data); // Set favorites
        setLoading(false);            // Set loading to false when data is fetched
      })
      .catch(error => {
        setError('Failed to load favorite stocks.'); // Set error message
        setLoading(false);            // Set loading to false if error occurs
        console.error("Error fetching favorite stocks", error);
      });
  }, []);

  // Render loading state, error state, or favorite stocks
  if (loading) {
    return <div>Loading your favorite stocks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Your Favorite Stocks</h2>
      {favorites.length === 0 ? (
        <p>You don't have any favorite stocks yet.</p>
      ) : (
        <ul>
          {favorites.map((stock, index) => (
            <li key={index}>
              {stock.name} ({stock.symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteStocks;
