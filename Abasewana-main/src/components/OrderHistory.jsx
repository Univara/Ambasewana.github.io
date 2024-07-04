import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoadingRing from './LoadingRing';
import Navbar from './Navbar'; // Import the Navbar component
import 'react-toastify/dist/ReactToastify.css';
import './Styles/OrderHistory.css';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // Default filter is "all"

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orderHistory, filter]);

  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://1b3a4432-5929-44d9-8dc8-996bffbfcf48-00-3up1na66l4ofb.picard.replit.dev:3000/api/getOrderHistory'
      );

      // Sort orders by dateTime in descending order (latest first)
      const sortedOrders = response.data.sort((a, b) => {
        return new Date(b.dateTime) - new Date(a.dateTime);
      });

      setOrderHistory(sortedOrders);
      setLoading(false);
    } catch (error) {
      setError('Error fetching order history. Please try again later.');
      setLoading(false);
      console.error('Error fetching order history:', error);
    }
  };

  const filterOrders = () => {
    switch (filter) {
      case 'today':
        filterToday();
        break;
      case 'yesterday':
        filterYesterday();
        break;
      case 'lastWeek':
        filterLastWeek();
        break;
      case 'lastMonth':
        filterLastMonth();
        break;
      default:
        setFilteredOrders(orderHistory);
    }
  };

  const filterToday = () => {
    const today = new Date().toLocaleDateString();
    const filtered = orderHistory.filter((order) => {
      const orderDate = new Date(order.dateTime).toLocaleDateString();
      return orderDate === today;
    });
    setFilteredOrders(filtered);
  };

  const filterYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString();
    const filtered = orderHistory.filter((order) => {
      const orderDate = new Date(order.dateTime).toLocaleDateString();
      return orderDate === yesterdayStr;
    });
    setFilteredOrders(filtered);
  };

  const filterLastWeek = () => {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    const filtered = orderHistory.filter((order) => {
      const orderDate = new Date(order.dateTime);
      return orderDate >= lastWeek && orderDate <= today;
    });
    setFilteredOrders(filtered);
  };

  const filterLastMonth = () => {
    const today = new Date();
    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    const filtered = orderHistory.filter((order) => {
      const orderDate = new Date(order.dateTime);
      return orderDate >= lastMonth && orderDate <= today;
    });
    setFilteredOrders(filtered);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Navbar /> {/* Navbar is always displayed */}
      <div className="order-history-container">
        <Link to="/order-display">
          <button className="order-history-button">Go to Orders</button>
        </Link>
        <h1 className="headorder">Order History</h1>

        {/* Filter dropdown */}
        <div className="filter-dropdown">
          <label htmlFor="filter">Sort By:</label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="all">All Orders</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="lastWeek">Last 7 Days</option>
            <option value="lastMonth">Last 30 Days</option>
          </select>
        </div>

        {loading ? (
          <LoadingRing /> // Show loading spinner while fetching data
        ) : error ? (
          <div className="order-history-container">{error}</div>
        ) : (
          <ul>
            <div className="ordersnew-container">
              {filteredOrders.map((order) => (
                <li key={order.id} className="order-item">
                  <i className="fas fa-clock green-clock"></i>
                  <div>
                    <p className="order-info">
                      <strong>Order Name:</strong> {order.orderNumber}
                    </p>
                    <p className="order-info">
                      <strong>Date Time:</strong>{' '}
                      {new Date(order.dateTime).toLocaleString()}
                    </p>
                    <p className="order-info">
                      <strong>Order Status:</strong> {order.orderStatus}
                    </p>
                    <p className="order-info">
                      <strong>Customer Name:</strong> {order.customerName}
                    </p>
                    <p className="order-info">
                      <strong>Table No:</strong> {order.table}
                    </p>
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
                </li>
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
