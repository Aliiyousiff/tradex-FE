import React from 'react'

const StockItemCard = ({ stock, onBuy, onSell, onFavorite }) => {
  if (!stock) return null // Guard clause if stock is not provided

  return (
    <div className="stock-item-card">
      <h3>{stock.name}</h3>
      <p>{stock.symbol}</p>
      <p>Price: ${stock.price}</p>
      <button onClick={() => onBuy(stock)}>Buy</button>
      <button onClick={() => onSell(stock)}>Sell</button>
      <button onClick={() => onFavorite(stock)}>Favorite</button>
    </div>
  )
}

export default StockItemCard
