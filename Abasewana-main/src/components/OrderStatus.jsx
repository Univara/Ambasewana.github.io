import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Styles/OrderStatus.css'; // Import CSS file for styling
import Loading from './Loading'; // Import the Loading component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faClock,
  faCheck,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons'; // Import clock and check icons

const OrderStatus = () => {
  const [orderStatus, setOrderStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableNo, setTableNo] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true); // State to control automatic refresh

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const timestamp = new Date().getTime();
      const response = await axios.get(
        `https://1b3a4432-5929-44d9-8dc8-996bffbfcf48-00-3up1na66l4ofb.picard.replit.dev:3000/api/getOrders?tableNo=${tableNo}&timestamp=${timestamp}`
      );
      const filteredOrders = response.data.filter(
        (order) => order.table === tableNo
      );
      setOrderStatus(filteredOrders);
      setLoading(false);
      setError(
        filteredOrders.length === 0 && tableNo.trim() !== ''
          ? `No orders found for table number ${tableNo}`
          : null
      );
    } catch (error) {
      setError('Error fetching orders. Please try again later.');
      setLoading(false);
      console.error('Error fetching orders:', error);
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
    setTableNo(''); // Clear search input
    setOrderStatus([]); // Clear searched results
    setError(null); // Clear error message
    setAutoRefresh(true); // Re-enable auto refresh
  };

  return (
    <div className="orders-container">
      <ToastContainer />
      <h1 className="orders-heading">Order Status</h1>
      <div className="searchStatus-container">
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
          className={`search-button ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="orders-list">
        {loading ? (
          <Loading />
        ) : (
          orderStatus.length > 0 &&
          orderStatus.map((order) => (
            <div key={order.id} className="status-item">
              <div>
                <p className="table_title">Table No: {order.table}</p>
              </div>
              <p>Your Order is {order.orderStatus}</p>
              <div className="order-status-container">
                {order.orderStatus === 'Pending' && (
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
                {order.orderStatus === 'Completed' && (
                  <div class="success-animation">
                    <svg
                      class="checkmark"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 52 52"
                    >
                      <circle
                        class="checkmark__circle"
                        cx="26"
                        cy="26"
                        r="25"
                        fill="none"
                      />
                      <path
                        class="checkmark__check"
                        fill="none"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                      />
                    </svg>
                    <br />
                    <p>Waiter Will Come to you!!</p>
                  </div>
                )}
                {order.orderStatus === 'Preparing' && (
                  <>
                    <div id="cooking">
                      <div class="bubble"></div>
                      <div class="bubble"></div>
                      <div class="bubble"></div>
                      <div class="bubble"></div>
                      <div class="bubble"></div>
                      <div id="area">
                        <div id="sides">
                          <div id="pan"></div>
                          <div id="handle"></div>
                        </div>
                        <div id="pancake">
                          <div id="pastry"></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
