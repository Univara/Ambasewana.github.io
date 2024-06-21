import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Shop from './components/Shop';
import Pages from './Layout/Pages';
import { RecoilRoot } from 'recoil';

import { AuthProvider } from './config/Context';

import RouteTracker from './RouterTracker';
import OrderHistory from './components/OrderHistory.jsx';
import OrderDisplay from './components/OrderDisplay.jsx';
import Cart from './components/Cart.jsx';

import OrderDetails from './components/OrderSummary.jsx';
import PlacedOrders from './components/PlacedOrders.jsx';
import QRCodeGenerator from './components/QRCodeGenerator.jsx';
import Products from './components/IndianProducts.jsx';

function App() {
  return (
    <>
      <RecoilRoot>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/qrgenerator" element={<QRCodeGenerator />} />
              <Route path="/products" element={<Products />} />
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
                <Route path="/placed-orders" element={<PlacedOrders />} />
                <Route path="OrderDisplay" element={<OrderDisplay />} />
                <Route path="OrderHistory" element={<OrderHistory />} />
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
