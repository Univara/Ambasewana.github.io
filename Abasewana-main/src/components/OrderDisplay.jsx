import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/OrderDisplay.css"; // Assuming you have a CSS file for styling

const OrderDisplay = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getOrders");
      console.log("Response data:", response.data); // Log the response data
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching orders");
      setLoading(false);
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log("Orders state:", orders); // Log the orders state

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="orders-container">
      <h1>Orders</h1>

      <ul>
        {orders.map((order) => (
          <li key={order.orderId} className="order-item">
            <div>
              <p>Order ID: {order.orderId}</p>
              <p>Date Time: {new Date(order.dateTime).toLocaleString()}</p>
              <p>Order Number: {order.orderNumber}</p>
              <p>Order Status: {order.orderStatus}</p>
            </div>
            {/* <ul className="items-list">
              {order.items.map((item, index) => (
                <li key={index} className="item">
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="item-image"
                  />
                  <div>
                    <p>Item Name: {item.itemName}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                </li>
              ))}
            </ul> */}
            <p>Customer Name: {order.customerName}</p>
            <p>Table: {order.table}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDisplay;
