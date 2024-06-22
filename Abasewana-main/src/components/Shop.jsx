import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { atom, useRecoilState, selector } from 'recoil';
import { BsFillCartPlusFill, BsCartCheckFill } from 'react-icons/bs';
import Transition from './Transition';
import Notification from './notification';
import './Styles/shop.css';
import { burger1 } from '../assets';
import Avatar from 'react-avatar';
import { banner3 } from '../assets';

import soupImage from '../assets/pizza1.png';
import dishes from '../assets/promo-3.png';

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
    // Item is already in cart, increment quantity
    updatedCart[item.id].quantity += 1;
  } else {
    // Item is not in cart, add it with quantity 1
    updatedCart[item.id] = { ...item, quantity: 1 };
  }

  setCart(updatedCart); // Update cart state
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
  const [tableNumber, setTableNumber] = useState(null); // State to hold table number

  // Fetch table number from URL and store in localStorage
  useEffect(() => {
    const tableFromURL = searchParams.get('table');
    if (tableFromURL) {
      localStorage.setItem('tableNumber', tableFromURL);
      setTableNumber(tableFromURL);
    } else {
      localStorage.removeItem('tableNumber');
      setTableNumber(null);
    }
  }, [searchParams]);

  // Retrieve table number from localStorage on component mount
  useEffect(() => {
    const storedTableNumber = localStorage.getItem('tableNumber');
    if (storedTableNumber) {
      setTableNumber(storedTableNumber);
    }
  }, []);

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${foodCategory}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchFoodData();
    window.scrollTo(0, 0);
  }, [foodCategory]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowTransition(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const typeFilter = searchParams.get('category');
  const displayedItems = items.filter((item) => {
    const matchesType = typeFilter ? item.category === typeFilter : true;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const showMoreItems = () => {
    setVisible((prevVisible) => prevVisible + 4);
  };

  const toggleClicked = (item) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, clicked: !prevItem.clicked }
          : prevItem
      )
    );
  };
  const getPriceDisplay = (item) => {
    const table = parseInt(tableNumber);
    const price =
      table >= 1 && table <= 30 ? item.ground_price : item.upper_price;
    return `Rs.${price}`;
  };
  const remainingItems = displayedItems.length - visible;

  const ItemsElements = displayedItems.slice(0, visible).map((item) => (
    <div className="item-card" key={item.id}>
      <div className="item-discount angle">-{item.discount}%</div>
      <div className="item-pic">
        <img className="item-pic" src={burger1} alt={item.name} />
      </div>
      <div className="item-info">
        <p className="item-name ">{item.name}</p>
        <p className="price">
          {getPriceDisplay(item)}{' '}
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

  const filterOptions = {
    chinese: [
      'Soup',
      'Quick Dishes',
      'Rice',
      'Noodles',
      'Pasta',
      'Chopsuey',

      'Devilled',
      'Curry',
      'Prawns',
      'Fish',
      'Chicken',
    ],
    indian: [
      'Salad',
      'Vegetable',
      'Non Vegetable',
      'Vegetable Pulow',
      'Chicken Kebab',
      'Vegetable Kebab',
      'Roti Naan',
      'Set Menu',
      'Kottu Naan',
    ],
  };

  const categoryImages = {
    //chinese
    Soup: soupImage,
    'Quick Dishes': soupImage,
    Rice: soupImage,
    Noodles: soupImage,
    Pasta: soupImage,
    Chopsuey: soupImage,

    Devilled: soupImage,
    Curry: soupImage,
    Prawns: soupImage,
    Fish: soupImage,
    Chicken: soupImage,

    //indian
    Salad: dishes,
    Vegetable: dishes,
    'Non Vegetable': dishes,
    'Vegetable Pulow': dishes,
    'Chicken Kebab': dishes,
    'Vegetable Kebab': dishes,
    'Roti Naan': dishes,
    'Set Menu': dishes,
    'Kottu Naan': dishes,
  };

  return (
    <div className="shop-container">
      {showTransition && <Transition />}
      <Notification
        message={notification.message}
        visible={notification.visible}
      />

      <div className="header-container">
        <h1>Explore Our Menu</h1>

        {/* Display table number */}
        <div className="food-category-switch switch-container">
          <div className="switch">
            <input
              type="radio"
              id="chinese"
              value="chinese"
              checked={foodCategory === 'chinese'}
              onChange={() => setFoodCategory('chinese')}
            />
            <label htmlFor="chinese" className="switch-label">
              Chinese
            </label>
          </div>
          <div className="switch">
            <input
              type="radio"
              id="indian"
              value="indian"
              checked={foodCategory === 'indian'}
              onChange={() => setFoodCategory('indian')}
            />
            <label htmlFor="indian" className="switch-label">
              Indian
            </label>
          </div>
        </div>
      </div>

      <li className="banner-item banner-sm">
        <div className="banner-card">
          <img
            src={banner3}
            width="550"
            height="465"
            loading="lazy"
            alt="American Burgers"
            className="deal-img"
          />

          <div className="banner-item-content">
            <h3 className="banner-title">American Burgers</h3>
            <p className="banner-text">50% off Now</p>
          </div>
        </div>
      </li>

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
      {/* New horizontal scrollable section */}
      <div className="category-scroll">
        <Link
          className={`item-type ${!typeFilter ? 'selected' : ''}`}
          to={`?table=${tableNumber}`}
        >
          All
        </Link>

        {filterOptions[foodCategory].map((category) => (
          <Link
            key={category}
            className={`item-type ${typeFilter === category ? 'selected' : ''}`}
            to={`?category=${category}&table=${tableNumber}`} // Preserve table number in the URL
          >
            <div className="category-link">
              <Avatar
                className="category-avatar"
                src={categoryImages[category]} // Set the image source for the avatar
                size="50"
                round
              />
              <span className="category-name">{category}</span>
            </div>
          </Link>
        ))}
      </div>

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
