import { useRecoilState } from 'recoil';
import { dec, del, emptycart, inc, burger1 } from '../assets';
import { CartState } from './Shop'; // Import Recoil atom for cart state

function Cart() {
  const [cart, setCart] = useRecoilState(CartState);

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

  if (Object.keys(cart).length === 0) {
    return (
      <div className="empty-cart">
        <h1>Oops! Your Cart is Empty</h1>
        <div className="empty-cart-gif">
          <img src={emptycart} width="200px" />
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
                  <img src={del} className="sign" width="15px" />
                  <div className="text">Remove</div>
                </button>
              </div>
            </div>
            <div className="quantity-controls">
              <button
                className="qty-button"
                onClick={() => decrementQuantity(item.id)}
              >
                <img src={dec} width="20px" />
              </button>
              <p>{item.quantity || 1}</p>
              <button
                className="qty-button"
                onClick={() => incrementQuantity(item.id)}
              >
                <img src={inc} width="20px" />
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
        <button className="cart-button">Check Out</button>
      </div>
    </div>
  );
}

export default Cart;
