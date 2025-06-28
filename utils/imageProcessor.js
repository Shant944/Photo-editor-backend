const sharp = require('sharp');
const path = require('path');

const dir = 'uploads';

const cropImage = async (filename, width, height) => {
  const input = path.join(dir, filename);
  const output = path.join(dir, 'cropped_' + filename);
  await sharp(input).extract({ width, height, left: 0, top: 0 }).toFile(output);
  return 'cropped_' + filename;
};

const bwImage = async (filename) => {
  const input = path.join(dir, filename);
  const output = path.join(dir, 'bw_' + filename);
  await sharp(input).greyscale().toFile(output);
  return 'bw_' + filename;
};

const resizeImage = async (filename, width, height) => {
  const input = path.join(dir, filename);
  const output = path.join(dir, 'resized_' + filename);
  await sharp(input).resize(width, height).toFile(output);
  return 'resized_' + filename;
};

const pixelateImage = async (filename) => {
  const input = path.join(dir, filename);
  const output = path.join(dir, 'pixelated_' + filename);
  const temp = path.join(dir, 'temp_' + filename);
  await sharp(input).resize(20, 20, { kernel: 'nearest' }).toFile(temp);
  await sharp(temp).resize(500, 500, { kernel: 'nearest' }).toFile(output);
  return 'pixelated_' + filename;
};

module.exports = { cropImage, bwImage, resizeImage, pixelateImage };