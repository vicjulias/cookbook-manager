// 1. Core Imports
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const path = require('path');

// 2. Load environment variables
require('dotenv').config();

// 3. App Configuration
const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/cookbookApp';

// 4. Connect to MongoDB
mongoose.connect(DB_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// 5. Middleware Setup (Order is crucial!)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: DB_URI,
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

// 6. Import and connect the routes
const authRouter = require('./routes/auth');
const recipesRouter = require('./routes/recipes');
app.use('/api/auth', authRouter);
app.use('/api/recipes', recipesRouter);

// 7. Serve static files - look for html, css, java and images in this file. This should be the LAST app.use()
app.use(express.static(path.join(__dirname, 'public')));

// 8. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});