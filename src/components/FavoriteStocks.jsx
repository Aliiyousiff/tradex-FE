import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FavoriteStocks = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('/api/user/favorites')
      .then(response => setFavorites(response.data))
      .catch(error => console.error("Error fetching favorite stocks", error));
  }, []);

  return (
    <div>
      <h2>Your Favorite Stocks</h2>
      <ul>
        {favorites.map((stock, index) => (
          <li key={index}>{stock.name} ({stock.symbol})</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteStocks;
