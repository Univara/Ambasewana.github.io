import React, { useState } from 'react';
import OrderFilterForm from './OrderFilterForm';


const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async (customerName, table) => {
    try {
      let query = '';
      if (customerName) {
        query += `customerName=${customerName}`;
      }
      if (table) {
        if (query) query += '&';
        query += `table=${table}`;
      }

      const response = await fetch(
        `http://localhost:3000/api/getOrders?${query}`
      );
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <OrderFilterForm onFilter={fetchOrders} />
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.orderId}>
              <p>Customer: {order.customerName}</p>
              <p>Table: {order.table}</p>
              <p>Order Number: {order.orderNumber}</p>
              <p>Order Status: {order.orderStatus}</p>
              <p>Date/Time: {order.dateTime}</p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    <p>Item: {item.itemName}</p>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
