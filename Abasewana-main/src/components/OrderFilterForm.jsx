import React, { useState } from 'react';

const OrderFilterForm = ({ onFilter }) => {
  const [customerName, setCustomerName] = useState('');
  const [table, setTable] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(customerName, table);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div>
        <label>Table Number:</label>
        <input
          type="text"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        />
      </div>
      <button type="submit">Filter Orders</button>
    </form>
  );
};

export default OrderFilterForm;
