require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');

require('./config/passport');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    sameSite: 'none',
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/auth', authRoutes);
app.use('/images', imageRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
