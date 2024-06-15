
import { useRecoilState } from 'recoil';
import { CartState } from './Shop'; // Import Recoil atom for cart state

function Cart() {
  const [cart, setCart] = useRecoilState(CartState);

  const handleRemoveItem = (itemId) => {
    const updatedCart = { ...cart };
    delete updatedCart[itemId];
    setCart(updatedCart);
  };

  const incrementQuantity = (itemId) => {
    const updatedCart = { ...cart };
    updatedCart[itemId].quantity += 1;
    setCart(updatedCart);
  };

  const decrementQuantity = (itemId) => {
    const updatedCart = { ...cart };
    if (updatedCart[itemId].quantity > 1) {
      updatedCart[itemId].quantity -= 1;
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
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-list-container">
        {Object.values(cart).map((item) => (
          <div key={item.id} className="cart-list">
            <div className="cart-item-details">
              <img src={item.image} width="120px" alt={item.name} />
              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                <p>Price: Rs.{item.price}</p>
                <button
                  className="Btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="quantity-controls">
              <button
                className="qty-button"
                onClick={() => decrementQuantity(item.id)}
              >
                -
              </button>
              <p>{item.quantity}</p>
              <button
                className="qty-button"
                onClick={() => incrementQuantity(item.id)}
              >
                +
              </button>
            </div>
            <p className="cart-item-price">
              SubTotal: Rs.{calculateSubtotal(item)}
            </p>
          </div>
        ))}
      </div>
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
