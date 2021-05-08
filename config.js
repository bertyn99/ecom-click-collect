const dotenv = require('dotenv');

dotenv.config();
const config = {
    PORT: process.env.PORT || 3000,
    DBURL: process.env.DBURL,
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
};
module.exports = config