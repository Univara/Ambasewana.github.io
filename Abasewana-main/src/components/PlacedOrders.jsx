import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import './Styles/PlacedOrders.css';

function PlacedOrders() {
  const location = useLocation();
  const { orderData } = location.state || {};
  const [currentOrderData, setCurrentOrderData] = useState(orderData);

  const { lastMessage } = useWebSocket('ws://localhost:3000', {
    onOpen: () => console.log('Connected to WebSocket'),
    onClose: () => console.log('Disconnected from WebSocket'),
  });

  useEffect(() => {
    if (lastMessage !== null) {
      const updatedOrder = JSON.parse(lastMessage.data);
      if (
        currentOrderData &&
        currentOrderData.orderNumber === updatedOrder.orderNumber
      ) {
        setCurrentOrderData((prevData) => ({
          ...prevData,
          orderStatus: updatedOrder.orderStatus,
        }));
      }
    }
  }, [lastMessage, currentOrderData]);

  if (!currentOrderData) {
    return <p>No order data available.</p>;
  }

  return (
    <div className="placed-orders">
      <h2>Order Confirmation</h2>
      <p>Customer Name: {currentOrderData.customerName}</p>
      <p>Table Number: {currentOrderData.table}</p>
      <p>Order Number: {currentOrderData.orderNumber}</p>
      <p>Order Status: {currentOrderData.orderStatus}</p>
      <div className="order-items">
        {currentOrderData.items.map((item, index) => (
          <div key={index} className="order-item">
            <img src={item.image} alt={item.itemName} />
            <p>{item.itemName}</p>
            <p>Price: Rs.{item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacedOrders;
