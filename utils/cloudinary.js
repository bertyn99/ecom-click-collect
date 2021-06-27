const config = require('../config');
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.API_KEY,
    api_secret: config.API_SECRET_KEY
});

module.exports = cloudinary;