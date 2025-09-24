require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const User = require('./models/User'); // import your User model

const app = express();
app.use(cors());
app.use(express.json());

// === Connect to MongoDB (Atlas or local) ===
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/test';

mongoose.connect(mongoUri)
  .then(async () => {
    console.log(`Connected to MongoDB at ${mongoUri}`);

    // 🔹 one-time index fix logic:
    try {
      // drop old non-sparse index on email if it exists
      await User.collection.dropIndex('email_1');
      console.log('Dropped old email_1 index');
    } catch (err) {
      if (err.codeName !== 'IndexNotFound') {
        console.error('Index drop error:', err);
      }
    }

    // recreate sparse+unique index
    await User.collection.createIndex({ email: 1 }, { unique: true, sparse: true });
    console.log('Created new sparse unique index on email');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.error('Stack:', err.stack);
    process.exit(1);
  });

// === Routes ===
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// === Start server ===
app.listen(5000, () => console.log('Server running on port 5000'));
