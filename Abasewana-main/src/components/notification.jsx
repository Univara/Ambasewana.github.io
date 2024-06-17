// components/Notification.js

import './Styles/Notification.css';

function Notification({ message, visible }) {
  return (
    <div className={`notification ${visible ? 'show' : ''}`}>{message}</div>
  );
}

export default Notification;
