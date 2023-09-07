const cloudinary = require('cloudinary');
const router = require('express').Router();
const ImageController = require('../controllers/Image')
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

router.delete('/:public_id', ImageController.delete)


module.exports = router;