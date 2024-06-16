import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { dec, del, emptycart, inc, burger1 } from '../assets';
import { CartState } from './Shop'; // Import Recoil atom for cart state
import { useNavigate } from 'react-router-dom'; // Updated import for useNavigate

function Cart() {
  const [cart, setCart] = useRecoilState(CartState);
  const [userName, setUserName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userName') {
      setUserName(value);
    } else if (name === 'tableNumber') {
      setTableNumber(value);
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedCart = { ...cart };
    delete updatedCart[itemId];
    setCart(updatedCart);
  };

  const incrementQuantity = (itemId) => {
    const updatedCart = {
      ...cart,
      [itemId]: {
        ...cart[itemId],
        quantity: cart[itemId].quantity + 1,
      },
    };
    setCart(updatedCart);
  };

  const decrementQuantity = (itemId) => {
    const updatedCart = {
      ...cart,
      [itemId]: {
        ...cart[itemId],
        quantity: cart[itemId].quantity - 1,
      },
    };
    if (updatedCart[itemId].quantity > 0) {
      setCart(updatedCart);
    }
  };

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotalPrice = () => {
    return Object.values(cart).reduce(
      (total, item) => total + calculateSubtotal(item),
      0
    );
  };

  const total = calculateTotalPrice();

  const handleCheckout = () => {
    // Navigate to order details page
    navigate('/order-details', {
      state: {
        userName,
        tableNumber,
        cart,
      },
    });
  };

  if (Object.keys(cart).length === 0) {
    return (
      <div className="empty-cart">
        <h1>Oops! Your Cart is Empty</h1>
        <div className="empty-cart-gif">
          <img src={emptycart} width="200px" alt="Empty Cart" />
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-list-container">
        {Object.values(cart).map((item) => (
          <div key={item.id} className="cart-list">
            <div className="cart-item-details">
              <img src={burger1} width="120px" alt={item.name} />
              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                <p>Price: Rs.{item.price}</p>
                <button
                  className="Btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <img src={del} className="sign" width="15px" alt="Delete" />
                  <div className="text">Remove</div>
                </button>
              </div>
            </div>
            <div className="quantity-controls">
              <button
                className="qty-button"
                onClick={() => decrementQuantity(item.id)}
              >
                <img src={dec} width="20px" alt="Decrement" />
              </button>
              <p>{item.quantity || 1}</p>
              <button
                className="qty-button"
                onClick={() => incrementQuantity(item.id)}
              >
                <img src={inc} width="20px" alt="Increment" />
              </button>
            </div>
            <p className="cart-item-price">
              SubTotal: Rs.{calculateSubtotal(item)}
            </p>
          </div>
        ))}
      </div>
      <div className="divider"></div>
      <div className="total-price">
        <h2>Total Price: Rs.{total}</h2>
      </div>
      <div className="checkout-btn">
        <button className="cart-button" onClick={handleCheckout}>
          Check Out
        </button>
      </div>
    </div>
  );
}

export default Cart;
