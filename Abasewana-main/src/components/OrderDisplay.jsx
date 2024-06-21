import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/OrderDisplay.css";
import { Link } from "react-router-dom";

const OrderDisplay = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();

    // Set up event listener for visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchOrders();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/getOrders");
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching orders. Please try again later.");
      setLoading(false);
      console.error("Error fetching orders:", error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/deleteOrder/${orderId}`
      );
      const { message } = response.data;

      // Notify user about successful deletion
      console.log("Success message:", message); // Debugging line
      toast.success(message);

      // Optionally, you can fetch updated orders after successful deletion
      fetchOrders(); // Assuming fetchOrders updates the orders state
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order. Please try again.");
    }
  };

  if (loading) {
    return <div className="orders-container">Loading...</div>;
  }

  if (error) {
    return <div className="orders-container">{error}</div>;
  }

  return (
    <div className="orders-container">
      {/* ToastContainer is necessary for displaying toast notifications */}
      <ToastContainer />
      <Link to="/OrderHistory">
        <button>Go to Order History</button>
      </Link>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId} className="order-item">
            <div>
              <p>Order ID: {order.orderId}</p>
              <p>Date Time: {new Date(order.dateTime).toLocaleString()}</p>
              <p>Order Number: {order.orderNumber}</p>
              <p>Order Status: {order.orderStatus}</p>
              <button onClick={() => handleDeleteOrder(order.orderId)}>
                Delete
              </button>
            </div>
            <ul className="items-list">
              {order.items &&
                order.items.map((item, index) => (
                  <li key={index} className="item">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.itemName || item.name}
                        className="item-image"
                      />
                    )}
                    <div>
                      <p>Item Name: {item.itemName || item.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: Rs.{item.price}</p>
                    </div>
                  </li>
                ))}
            </ul>
            <p>Customer Name: {order.customerName}</p>
            <p>Table: {order.table}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDisplay;
