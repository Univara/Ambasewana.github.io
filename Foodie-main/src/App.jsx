import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Shop from './components/Shop';
import Pages from './Layout/Pages';
import { RecoilRoot } from 'recoil';

import { AuthProvider } from './config/Context';

import RouteTracker from './RouterTracker';

import FoodDisplay from './constants/foodDisplay.jsx';
import Cart from './components/Cart.jsx';
import OrderSummary from './components/OrderSummary.jsx';
import OrderDetails from './components/OrderSummary.jsx';

function App() {
  return (
    <>
      <RecoilRoot>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Pages />
                  </Layout>
                }
              >
                <Route index element={<Pages />} />
                <Route path="shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order-details" element={<OrderDetails />} />

                <Route path="FoodDisplay" element={<FoodDisplay />} />
              </Route>
            </Routes>
            <RouteTracker />
          </BrowserRouter>
        </AuthProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
