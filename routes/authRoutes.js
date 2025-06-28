const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google login — always show account chooser
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account' // ✅ կարևոր
}));

// Google callback
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: process.env.FRONTEND_URL
  })
);

// Get current user
router.get('/me', (req, res) => {
  res.send(req.user || null);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL);
  });
});

module.exports = router;
