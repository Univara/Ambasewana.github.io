const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const serviceAccount = require('./key.json');
const WebSocket = require('ws');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://ambasewana-a6fa5-default-rtdb.asia-southeast1.firebasedatabase.app',
  storageBucket: 'ambasewana-37141.appspot.com',
});

const db = admin.firestore();
const storage = admin.storage();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

// WebSocket server setup
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Express server setup
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Upgrade HTTP server to handle WebSocket connections
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// API endpoints

// Endpoint to add Indian products
app.post('/api/products/indian', async (req, res) => {
  try {
    const { name, description, ground_price, upper_price, category } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageFile = req.files.image;
    const storageRef = storage.bucket().file(`images/${Date.now()}_${name}`);
    const fileBuffer = imageFile.data;

    await storageRef.save(fileBuffer, {
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
      storage.bucket().name
    }/o/${encodeURIComponent(storageRef.name)}?alt=media`;

    const docRef = await db.collection('indian_products').add({
      name,
      description,
      ground_price,
      upper_price,
      category,
      image: imageUrl,
    });

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error('Error adding product: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to add Chinese products
app.post('/api/products/chinese', async (req, res) => {
  try {
    const { name, description, ground_price, upper_price, category } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageFile = req.files.image;
    const storageRef = storage.bucket().file(`images/${Date.now()}_${name}`);
    const fileBuffer = imageFile.data;

    await storageRef.save(fileBuffer, {
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
      storage.bucket().name
    }/o/${encodeURIComponent(storageRef.name)}?alt=media`;

    const docRef = await db.collection('chinese_products').add({
      name,
      description,
      ground_price,
      upper_price,
      category,
      image: imageUrl,
    });

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error('Error adding product: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch all Indian products
app.get('/api/products/indian', async (req, res) => {
  try {
    const snapshot = await db.collection('indian_products').get();
    const products = [];

    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(products);
  } catch (error) {
    console.error('Error getting products: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch all Chinese products
app.get('/api/products/chinese', async (req, res) => {
  try {
    const snapshot = await db.collection('chinese_products').get();
    const products = [];

    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(products);
  } catch (error) {
    console.error('Error getting products: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/products/indian/:productId
app.delete('/api/products/indian/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    // Retrieve the product data before deleting
    const productDoc = await db
      .collection('indian_products')
      .doc(productId)
      .get();
    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product from the collection
    await db.collection('indian_products').doc(productId).delete();

    res.status(200).json({
      message: 'Indian product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting Indian product: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/products/chinese/:productId
app.delete('/api/products/chinese/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    // Retrieve the product data before deleting
    const productDoc = await db
      .collection('chinese_products')
      .doc(productId)
      .get();
    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product from the collection
    await db.collection('chinese_products').doc(productId).delete();

    res.status(200).json({
      message: 'Chinese product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting Chinese product: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch main products (example: limiting to 2 for demonstration)
app.get('/api/products/main', async (req, res) => {
  try {
    const snapshot = await db.collection('products').limit(2).get();
    const products = [];

    snapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(products);
  } catch (error) {
    console.error('Error getting products: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to fetch a product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const docRef = await db.collection('products').doc(productId).get();

    if (!docRef.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const productData = docRef.data();

    res.json({
      id: docRef.id,
      ...productData,
    });
  } catch (error) {
    console.error('Error getting product by ID: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to add an order
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, table, items, orderNumber, orderStatus } = req.body;

    if (!customerName || !orderNumber || !orderStatus) {
      return res.status(400).json({
        error:
          'Please provide all required fields: customerName, table, orderNumber, orderStatus, and valid items array with itemName, image, price, and quantity',
      });
    }

    const orderData = {
      customerName,
      table,
      orderNumber,
      orderStatus,
      items: items.map((item) => ({
        itemName: item.itemName,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      dateTime: new Date().toISOString(),
    };

    const orderRef = await db.collection('orders').add(orderData);

    // Broadcast the new order to all connected clients
    broadcast(orderData);

    res.status(201).json({ orderId: orderRef.id });
  } catch (error) {
    console.error('Error adding order: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getOrders', async (req, res) => {
  try {
    const ordersSnapshot = await db.collection('orders').get();
    const orders = [];

    ordersSnapshot.forEach((doc) => {
      orders.push({
        orderId: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE /api/deleteOrder/:orderId - Delete order by orderId and move to history
app.delete('/api/deleteOrder/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    // Retrieve the order data before deleting
    const orderDoc = await db.collection('orders').doc(orderId).get();
    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderData = orderDoc.data();

    // Delete the order from the current orders collection
    await db.collection('orders').doc(orderId).delete();

    // Add the order to the order history collection
    const historyRef = await db.collection('orderHistory').add(orderData);

    res.status(200).json({
      message: 'Order deleted and moved to history successfully',
      historyId: historyRef.id,
    });
  } catch (error) {
    console.error('Error deleting order and moving to history: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/updateOrderStatus/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  try {
    if (!orderStatus) {
      return res.status(400).json({ error: 'Order status is required.' });
    }

    const orderRef = db.collection('orders').doc(orderId);
    const orderDoc = await orderRef.get();

    if (!orderDoc.exists) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    await orderRef.update({ orderStatus: orderStatus });

    res.json({ message: 'Order status updated successfully.' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/getOrderHistory', async (req, res) => {
  try {
    const orderHistorySnapshot = await db.collection('orderHistory').get();
    const orderHistory = orderHistorySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(orderHistory);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// getuserOrderStatus
app.get('/api/OrdersStatus', async (req, res) => {
  const { customerName, table } = req.query;

  try {
    let ordersQuery = db.collection('orders');

    if (customerName) {
      ordersQuery = ordersQuery.where('customerName', '==', customerName);
    }

    if (table) {
      ordersQuery = ordersQuery.where('table', '==', table);
    }

    const ordersSnapshot = await ordersQuery.get();
    const orders = [];

    ordersSnapshot.forEach((doc) => {
      orders.push({
        orderId: doc.id,
        ...doc.data(),
      });
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
