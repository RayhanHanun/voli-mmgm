const sharp = require('sharp');
sharp('public/logo.png')
  .resize(140)
  .webp({ quality: 80 })
  .toFile('public/logo.webp')
  .then(() => console.log('Optimized!'))
  .catch(console.error);
