import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/OrderStatus.css"; // Import CSS file for styling
import Loading from "./Loading"; // Import the Loading component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const OrderDisplay = () => {
  const [orderStatus, setOrderStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableNo, setTableNo] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Append timestamp to URL to prevent caching
      const timestamp = new Date().getTime();
      const response = await axios.get(`http://localhost:3000/api/getOrders?tableNo=${tableNo}&timestamp=${timestamp}`);
      setOrderStatus(response.data.filter(order => order.table === tableNo)); // Filter orders by tableNo
      setLoading(false);
    } catch (error) {
      setError("Error fetching orders. Please try again later.");
      setLoading(false);
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    // Fetch orders initially when component mounts
    fetchOrders();

    // Setup event listener for window focus
    const handleWindowFocus = () => {
      fetchOrders(); // Fetch orders again when window gains focus
    };

    window.addEventListener('focus', handleWindowFocus);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []); // Empty dependency array ensures effect runs only once on mount

  const handleSearchChange = (e) => {
    setTableNo(e.target.value);
  };

  const handleSearchClick = () => {
    if (tableNo) {
      fetchOrders();
    } else {
      setOrderStatus([]);
      setError(null);
    }
  };

  const handleCancelClick = () => {
    setTableNo(""); // Clear search input
    setOrderStatus([]); // Clear searched results
    setError(null); // Clear error message
  };

  return (
    <div className="orders-container">
      <ToastContainer />
      <h1 className="orders-heading">Order Status</h1>
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            value={tableNo}
            onChange={handleSearchChange}
            placeholder="Search by Table No"
            className="search-input"
          />
          {tableNo && (
            <button
              onClick={handleCancelClick}
              className="clear-button"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
        <button
          onClick={handleSearchClick}
          className={`search-button ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="orders-list">
        {loading ? (
          <Loading />
        ) : orderStatus.length > 0 ? (
          orderStatus.map((order) => (
            <div key={order.id} className="order-item">
              <p>Table No: {order.table}</p>
              <p>Status: {order.orderStatus}</p>
            </div>
          ))
        ) : (
          tableNo && <div className="no-orders-message">No orders found for table number {tableNo}</div>
        )}
      </div>
    </div>
  );
};

export default OrderDisplay;
