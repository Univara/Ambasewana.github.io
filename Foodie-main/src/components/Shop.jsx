import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { atom, useRecoilState, selector } from 'recoil';
import { BsFillCartPlusFill, BsCartCheckFill } from 'react-icons/bs';
import Transition from '../components/Transition';
import Notification from '../components/notification';
import './Styles/shop.css';

// Define Recoil state atoms and selectors
export const CartState = atom({
  key: 'CartState',
  default: {},
});

export const cartStateWithRemove = selector({
  key: 'cartStateWithRemove',
  get: ({ get }) => get(CartState),
  set: ({ set }, updatedCart) => {
    set(CartState, updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
  },
});

// Function to handle adding items to cart
export function addToCart(item, cart, setCart) {
  const updatedCart = { ...cart };

  if (updatedCart[item.id]) {
    updatedCart[item.id].quantity += 1; // Increment the quantity
  } else {
    updatedCart[item.id] = { ...item, quantity: 1 }; // Add new item with quantity 1
  }

  setCart(updatedCart);
}

function Shop() {
  const [cart, setCart] = useRecoilState(CartState);
  const [visible, setVisible] = useState(10); // Controls the number of visible items
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]); // State for the items
  const [searchQuery, setSearchQuery] = useState('');
  const [showTransition, setShowTransition] = useState(true);
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
  });
  const [foodCategory, setFoodCategory] = useState('chinese'); // Default category is Chinese

  useEffect(() => {
    // Fetch data based on foodCategory
    const fetchFoodData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${foodCategory}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data); // Set the items state with the fetched data
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchFoodData();
    window.scrollTo(0, 0);
  }, [foodCategory]);

  useEffect(() => {
    // Disable transition after 3 seconds
    const timeout = setTimeout(() => {
      setShowTransition(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  // Filter and search logic
  const typeFilter = searchParams.get('category');
  const displayedItems = items.filter((item) => {
    const matchesType = typeFilter ? item.category === typeFilter : true;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  // Show more items handler
  const showMoreItems = () => {
    setVisible((prevVisible) => prevVisible + 4);
  };

  // Toggle item clicked state
  const toggleClicked = (item) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, clicked: !prevItem.clicked }
          : prevItem
      )
    );
  };

  const remainingItems = displayedItems.length - visible;

  const ItemsElements = displayedItems.slice(0, visible).map((item) => (
    <div className="item-card" key={item.id}>
      <div className="item-discount angle">-{item.discount}%</div>
      <div className="item-pic">
        <img className="item-pic" src={item.image} alt={item.name} />
      </div>
      <div className="item-info">
        <h2 className="name">{item.name}</h2>
        <p className="price">
          Rs.{item.price}{' '}
          <span className="original-price">{item.originalPrice}</span>
        </p>
        <button
          className="cart-button"
          onClick={() => {
            addToCart(item, cart, setCart);
            toggleClicked(item);
            setNotification({
              message: `${item.name} has been added to your cart!`,
              visible: true,
            });
            setTimeout(() => {
              setNotification({ ...notification, visible: false });
            }, 1000);
          }}
        >
          {item.clicked ? (
            <>
              Added to Cart <BsCartCheckFill />
            </>
          ) : (
            <>
              Add to Cart <BsFillCartPlusFill />
            </>
          )}
        </button>
      </div>
    </div>
  ));

  // Map food categories to their respective filter options
  const filterOptions = {
    chinese: ['Soup', 'Quick Dishes', 'Rice', 'Noodles', 'Pasta', 'Chopsuey(Rice)', 'Chopsuey(No Rice)', 'Devilled', 'Curry', 'Prawns', 'Fish', 'Chicken', 'Cuttle Fish'],
    indian: ['Salad', 'Vegetable', ' Non Vegetable', 'Vegetable Pulow', 'Chicken Kebab', 'Vegetable Kebab', 'Roti Naan', 'Set Menu', 'Kottu Naan'],
  };

  return (
    <div className="shop-container">
      {showTransition && <Transition />}
      <Notification
        message={notification.message}
        visible={notification.visible}
      />
      <h1>Explore Our Items</h1>

      {/* Food category switch */}
      <div className="food-category-switch switch-container">
        <div className="switch">
          <input
            type="radio"
            id="chinese"
            value="chinese"
            checked={foodCategory === 'chinese'}
            onChange={() => setFoodCategory('chinese')}
          />
          <label htmlFor="chinese" className="switch-label">Chinese</label>
        </div>
        <div className="switch">
          <input
            type="radio"
            id="indian"
            value="indian"
            checked={foodCategory === 'indian'}
            onChange={() => setFoodCategory('indian')}
          />
          <label htmlFor="indian" className="switch-label">Indian</label>
        </div>
      </div>

      <div className="search-container">
        <div className="input-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>
      </div>

      <nav className="filter-nav">
        <Link className={`item-type ${!typeFilter ? 'selected' : ''}`} to=".">
          All
        </Link>
        {filterOptions[foodCategory].map((category) => (
          <Link
            key={category}
            className={`item-type ${typeFilter === category ? 'selected' : ''}`}
            to={`?category=${category}`}
          >
            {category}
          </Link>
        ))}
      </nav>

      <div className="item-container">{ItemsElements}</div>
      {remainingItems > 0 && (
        <div className="shop-button">
          <button className="button" onClick={showMoreItems}>
            Explore More
          </button>
        </div>
      )}
    </div>
  );
}

export default Shop;
