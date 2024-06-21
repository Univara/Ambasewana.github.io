import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./Styles/OrderDisplay.css"; // Import CSS file for styling

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
      toast.success(message);

      // Optionally, you can fetch updated orders after successful deletion
      fetchOrders(); // Assuming fetchOrders updates the orders state
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order. Please try again.");
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/updateOrderStatus/${orderId}`,
        { orderStatus: newStatus }
      );
      const { message } = response.data;

      // Notify user about successful status update
      toast.success(message);

      // Fetch updated orders after successful status update
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error.response?.data || error.message);
      toast.error(`Error updating order status: ${error.response?.data?.message || error.message}. Please try again.`);
    }
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="orders-container error-message">{error}</div>;
  }

  return (
    <div className="orders-container">
      <ToastContainer /> {/* ToastContainer for displaying notifications */}
      <Link to="/order-history">
        <button className="order-history-button">Go to Order History</button>
      </Link>
      <h1 className="orders-heading">Orders</h1>
      <ul className="orders-list">
        {orders.map((order) => (
          <li key={order.orderId} className="order-item">
            <div className="order-summary">
              <div className="order-info-group">
                <p className="order-info"><strong>Order ID:</strong> {order.orderId}</p>
                <p className="order-info"><strong>Date Time:</strong> {new Date(order.dateTime).toLocaleString()}</p>
                <p className="order-info"><strong>Order Number:</strong> {order.orderNumber}</p>
              </div>
              <div className="order-actions">
                <button className="action-button" onClick={() => handleDeleteOrder(order.orderId)}>Done</button>
                <select
                  className="status-select"
                  value={order.orderStatus}
                  onChange={(e) => handleUpdateOrderStatus(order.orderId, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <ul className="items-list">
              {order.items && order.items.map((item, index) => (
                <li key={index} className="item">
                  {item.image && (
                    <img src={item.image} alt={item.itemName || item.name} className="item-image" />
                  )}
                  <div className="item-details">
                    <p className="item-info"><strong>Item Name:</strong> {item.itemName || item.name}</p>
                    <p className="item-info"><strong>Quantity:</strong> {item.quantity}</p>
                    <p className="item-info"><strong>Price:</strong> Rs.{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="customer-details">
              <p className="customer-info"><strong>Customer Name:</strong> {order.customerName}</p>
              <p className="customer-info"><strong>Table:</strong> {order.table}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDisplay;
