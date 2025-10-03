require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const User = require('./models/User'); 

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/test';

mongoose.connect(mongoUri)
  .then(async () => {
    console.log(`Connected to MongoDB at ${mongoUri}`);

    try {
     
      await User.collection.dropIndex('email_1');
      console.log('Dropped old email_1 index');
    } catch (err) {
      if (err.codeName !== 'IndexNotFound') {
        console.error('Index drop error:', err);
      }
    }

   
    await User.collection.createIndex({ email: 1 }, { unique: true, sparse: true });
    console.log('Created new sparse unique index on email');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    console.error('Stack:', err.stack);
    process.exit(1);
  });


app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);


app.listen(5000, () => console.log('Server running on port 5000'));
