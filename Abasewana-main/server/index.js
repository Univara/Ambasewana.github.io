const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const fileUpload = require('express-fileupload'); // Import express-fileupload middleware
const serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://ambasewana-a6fa5-default-rtdb.asia-southeast1.firebasedatabase.app',
  storageBucket: 'gs://ambasewana-a6fa5.appspot.com',
});

const db = admin.firestore();
const storage = admin.storage();
const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload()); // Use express-fileupload middleware

// Endpoint to add a inidan product to the database
app.post('/api/products/indian', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Check if image file is provided
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageFile = req.files.image;

    // Upload image to Firebase Storage
    const storageRef = storage.bucket().file(`images/${Date.now()}_${name}`);
    const fileBuffer = imageFile.data; // Access image data from req.files

    await storageRef.save(fileBuffer, {
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    // Get the download URL
    const imageUrl = await storageRef.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    // Add product details to Firestore with the image URL
    const docRef = await db.collection('indian_products').add({
      name,
      description,
      price,
      category,
      image: imageUrl[0],
    });

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error('Error adding product: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to add a inidan product to the database
app.post('/api/products/chinese', async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Check if image file is provided
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageFile = req.files.image;

    // Upload image to Firebase Storage
    const storageRef = storage.bucket().file(`images/${Date.now()}_${name}`);
    const fileBuffer = imageFile.data; // Access image data from req.files

    await storageRef.save(fileBuffer, {
      metadata: {
        contentType: imageFile.mimetype,
      },
    });

    // Get the download URL
    const imageUrl = await storageRef.getSignedUrl({
      action: 'read',
      expires: '03-01-2500',
    });

    // Add product details to Firestore with the image URL
    const docRef = await db.collection('chinese_products').add({
      name,
      description,
      price,
      category,
      image: imageUrl[0],
    });

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error('Error adding product: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get all indian products from the database
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

// Endpoint to get all indian products from the database
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

//endpoint to get first 4 products from the database
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

// Endpoint to get a product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the product ID is provided
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Retrieve the product from Firestore
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

// app.get('/api/hello', async (req, res) => {
//   try {
//     return 'hello';
//   } catch (error) {
//     console.error('error');
//   }
// });

//end point to set orders
// app.post('/api/orders', async (req, res) => {
//   try {
//     const { items, tableID, dateTime } = req.body;

//     // Validate the order data (add more validation as needed)

//     // Save the order to the database (you need to implement this part)
//     // For example, you might use Firestore to store orders
//     const orderRef = await db.collection('orders').add({
//       items,
//       tableID,
//       dateTime,
//     });

//     res.status(201).json({ orderId: orderRef.id });
//   } catch (error) {
//     console.error('Error adding order: ', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// // Endpoint to place an order
// Endpoint to place an order
app.post('/api/orders', async (req, res) => {
  try {
    const {
      customerName,
      table,
      items, // Assuming items is an array of objects containing itemName, image, price, and quantity
      orderNumber,
      orderStatus,
    } = req.body;

    // Validate the order data (add more validation as needed)
    if (!customerName || !orderNumber || !orderStatus) {
      return res.status(400).json({
        error:
          'Please provide all required fields: userName, tableNumber, orderNumber, orderStatus, and valid items array with itemName, image, price, and quantity',
      });
    }

    // Save the order to the database (Firestore or MongoDB example)
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
      dateTime: new Date().toISOString(), // Adding current date/time as ISO string
    };

    // Example: Saving to Firestore
    const orderRef = await db.collection('orders').add(orderData);

    res.status(201).json({ orderId: orderRef.id });
  } catch (error) {
    console.error('Error adding order: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
