const express = require('express');
const multer = require('multer');
const path = require('path');
const { cropImage, bwImage, resizeImage, pixelateImage } = require('../utils/imageProcessor');
const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Upload image
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ filename: req.file.filename });
});

// Crop image
router.post('/crop', async (req, res) => {
  try {
    const { filename, width, height } = req.body;
    if (!filename || !width || !height) {
      return res.status(400).json({ error: 'Missing filename, width or height' });
    }
    const out = await cropImage(filename, parseInt(width), parseInt(height));
    res.json({ filename: out });
  } catch (err) {
    console.error('Error in /crop:', err);
    res.status(500).json({ error: 'Failed to crop image' });
  }
});

// Black & White
router.post('/bw', async (req, res) => {
  try {
    const { filename } = req.body;
    if (!filename) return res.status(400).json({ error: 'Missing filename' });

    const out = await bwImage(filename);
    res.json({ filename: out });
  } catch (err) {
    console.error('Error in /bw:', err);
    res.status(500).json({ error: 'Failed to convert image to black & white' });
  }
});

// Resize image
router.post('/resize', async (req, res) => {
  try {
    const { filename, width, height } = req.body;
    if (!filename || !width || !height) {
      return res.status(400).json({ error: 'Missing filename, width or height' });
    }
    const out = await resizeImage(filename, parseInt(width), parseInt(height));
    res.json({ filename: out });
  } catch (err) {
    console.error('Error in /resize:', err);
    res.status(500).json({ error: 'Failed to resize image' });
  }
});

// Pixelate image
router.post('/pixelate', async (req, res) => {
  try {
    const { filename } = req.body;
    if (!filename) return res.status(400).json({ error: 'Missing filename' });

    const out = await pixelateImage(filename);
    res.json({ filename: out });
  } catch (err) {
    console.error('Error in /pixelate:', err);
    res.status(500).json({ error: 'Failed to pixelate image' });
  }
});

module.exports = router;
