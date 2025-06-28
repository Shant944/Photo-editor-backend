const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  prompt: 'select_account'
}));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: process.env.FRONTEND_URL
  })
);

router.get('/me', (req, res) => {
  console.log(req.user);
  
  res.send(req.user || null);
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL);
  });
});

module.exports = router;
