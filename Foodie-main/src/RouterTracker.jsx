import { useLocation, matchRoutes } from 'react-router-dom';
import Shop from './components/Shop';
import Test from './components/test';
import Login from './components/Login';

const RouteTracker = () => {
  const currentLocation = useLocation();
  const someRoutes = [
    { path: '/shop', component: Shop },
    { path: '/signup', component: Test },
    { path: '/login', component: Login },
  ];
  const matches = matchRoutes(someRoutes, currentLocation);

  // Perform tracking actions based on matched routes
  console.log('Matched routes:', matches);
  console.log('Matched routes:', matches);

  // You can perform other tracking-related actions here

  return null;
};

export default RouteTracker;
