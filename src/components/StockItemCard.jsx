import React from 'react'
import StockItem from './StockItem'

const StockItemCard = ({ stock, onBuy, onSell, onFavorite }) => {
  return (
    <div className="stock-card">
      <StockItem
        stock={stock}
        onBuy={onBuy}
        onSell={onSell}
        onFavorite={onFavorite}
      />
    </div>
  )
}

export default StockItemCard
