const dotenv = require('dotenv');

dotenv.config();
const config = {
    PORT: process.env.PORT || 3200,
    DBURL: process.env.DBURL,
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET_KEY: process.env.API_SECRET,
    MAILPASS: process.env.MAILPASS
};

module.exports = config

