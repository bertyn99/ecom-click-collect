const express = require('express')
const app = express();
const cors = require('cors')
const compression = require('compression')
const config = require('./config');
const apiStaff = require("./routes/staff").router;
const apiUser = require("./routes/user").router;
const apiIngredient = require("./routes/ingredient").router;
const apiProduct = require("./routes/product");
const database = require("./db/connexion");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
/* app.use(cors()) */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/admin", apiStaff);
app.use("/api/ingredients", apiIngredient);
app.use("/api/product", apiProduct);
app.use("/api", apiUser);


app.listen(config.PORT, () => {
    console.log(`Application listening on port ${config.PORT}!`);
});
