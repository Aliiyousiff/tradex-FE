import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const StockChart = ({ stockSymbol }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch stock data for the chart
    axios.get(`/api/stocks/${stockSymbol}/chart`)
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching stock data", error));
  }, [stockSymbol]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
