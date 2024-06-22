import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/OrderStatus.css"; // Import CSS file for styling
import Loading from "./Loading"; // Import the Loading component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faClock, faCheck } from "@fortawesome/free-solid-svg-icons"; // Import clock and check icons

const OrderDisplay = () => {
  const [orderStatus, setOrderStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableNo, setTableNo] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(true); // State to control automatic refresh

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const timestamp = new Date().getTime();
      const response = await axios.get(
        `http://localhost:3000/api/getOrders?tableNo=${tableNo}&timestamp=${timestamp}`
      );
      const filteredOrders = response.data.filter(
        (order) => order.table === tableNo
      );
      setOrderStatus(filteredOrders);
      setLoading(false);
      setError(
        filteredOrders.length === 0 && tableNo.trim() !== ""
          ? `No orders found for table number ${tableNo}`
          : null
      );
    } catch (error) {
      setError("Error fetching orders. Please try again later.");
      setLoading(false);
      console.error("Error fetching orders:", error);
      setOrderStatus([]);
    }
  };

  useEffect(() => {
    if (autoRefresh) {
      // Only fetch orders automatically if autoRefresh is true
      const interval = setInterval(() => {
        fetchOrders();
      }, 30000); // 30 seconds

      return () => {
        clearInterval(interval); // Cleanup interval on component unmount or autoRefresh change
      };
    }
  }, [autoRefresh]); // Dependency array includes autoRefresh

  const handleSearchChange = (e) => {
    setTableNo(e.target.value);
  };

  const handleSearchClick = () => {
    if (tableNo) {
      setAutoRefresh(false); // Disable auto refresh when searching manually
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
    setAutoRefresh(true); // Re-enable auto refresh
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
            <button onClick={handleCancelClick} className="clear-button">
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
        ) : orderStatus.length > 0 && (
          orderStatus.map((order) => (
            <div key={order.id} className="status-item">
              <p>Table No: {order.table}</p>
              <p>Status: {order.orderStatus}</p>
              {order.orderStatus === "Pending" && (
                <FontAwesomeIcon icon={faClock} className="clock-icon" />
              )}
              {order.orderStatus === "Completed" && (
                <FontAwesomeIcon icon={faCheck} className="check-icon" />
              )}
              {order.orderStatus === "Preparing" && (
                <FontAwesomeIcon
                  icon={faUtensils}
                  className="utensils-icon"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderDisplay;
