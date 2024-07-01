import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout.jsx';
import Shop from './components/Shop.jsx';
import Pages from './Layout/Pages.jsx';
import { RecoilRoot } from 'recoil';
import { AuthProvider } from './config/Context.jsx';
import RouteTracker from './RouterTracker.jsx';
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
import Status from './components/OrderStatus.jsx';
import AddProductForm from './components/AddProductForm.jsx';

function App() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/qrgenerator" element={<QRCodeGenerator />} />
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
              <Route path="products" element={<Products />} />
              <Route path="order-details" element={<OrderDetails />} />
              <Route path="placed-orders" element={<PlacedOrders />} />
              <Route path="order-display" element={<OrderDisplay />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="ordered" element={<OrderList />} />
              <Route path="order-filter" element={<OrderFilterForm />} />
              <Route path="staff" element={<Staff />} />
              <Route path="status" element={<Status />} />
              <Route path="add_product" element={<AddProductForm />} />
            </Route>
          </Routes>
          <RouteTracker />
        </BrowserRouter>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
