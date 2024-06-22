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
import Products from './components/Products.jsx';
import OrderList from './components/OrderList.jsx';
import OrderFilterForm from './components/OrderFilterForm.jsx';
import Staff from './components/Staff.jsx';

function App() {
  return (
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
              <Route path="cart" element={<Cart />} />
              <Route path="order-details" element={<OrderDetails />} />
              <Route path="placed-orders" element={<PlacedOrders />} />
              <Route path="order-display" element={<OrderDisplay />} />{' '}
              {/* Corrected path */}
              <Route path="order-history" element={<OrderHistory />} />{' '}
              {/* Corrected path */}
              <Route path="ordered" element={<OrderList />} />{' '}
              {/* Corrected path */}
              <Route path="order-filter" element={<OrderFilterForm />} />{' '}
              <Route path="staff" element={<Staff />} />{' '}
            </Route>
          </Routes>
          <RouteTracker />
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
