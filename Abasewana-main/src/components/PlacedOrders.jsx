import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useWebSocket from 'react-use-websocket';
import './Styles/PlacedOrders.css';

function PlacedOrders() {
  const location = useLocation();
  const { orderData } = location.state || {};
  const [currentOrderData, setCurrentOrderData] = useState(orderData);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator

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
        setIsLoading(false); // Turn off loading indicator
        setCurrentOrderData((prevData) => ({
          ...prevData,
          orderStatus: updatedOrder.orderStatus,
        }));
      }
    }
  }, [lastMessage, currentOrderData]);

  useEffect(() => {
    if (currentOrderData && currentOrderData.orderStatus === 'Pending') {
      setIsLoading(true); // Turn on loading indicator if order status is pending
    }
  }, [currentOrderData]);

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

      {currentOrderData.orderStatus === 'Pending' && isLoading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <div class="hourglassBackground">
            <div class="hourglassContainer">
              <div class="hourglassCurves"></div>
              <div class="hourglassCapTop"></div>
              <div class="hourglassGlassTop"></div>
              <div class="hourglassSand"></div>
              <div class="hourglassSandStream"></div>
              <div class="hourglassCapBottom"></div>
              <div class="hourglassGlass"></div>
            </div>
          </div>
        </div>
      )}
      <Link to="/status">
        <button className={`search-button`}>See Your Order Status</button>
      </Link>
    </div>
  );
}

export default PlacedOrders;
