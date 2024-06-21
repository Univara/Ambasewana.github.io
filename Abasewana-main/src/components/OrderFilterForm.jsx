import React, { useState } from 'react';

const OrderFilterForm = (props) => {
  const [customerName, setCustomerName] = useState('');
  const [table, setTable] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (typeof props.onFilter === 'function') {
      props.onFilter(customerName, table);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Customer Name"
      />
      <input
        type="text"
        value={table}
        onChange={(e) => setTable(e.target.value)}
        placeholder="Table"
      />
      <button type="submit">Filter Orders</button>
    </form>
  );
};

export default OrderFilterForm;
