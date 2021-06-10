const express = require('express')
const app = express();
const compression = require('compression')
const config = require('./config');
const apiStaff = require("./routes/staff").router;
const apiUser = require("./routes/user").router;
const apiIngredient = require("./routes/ingredient").router;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api/admin", apiStaff);
app.use("/api/admin/ingredients", apiIngredient);
app.use("/api", apiUser);

app.listen(config.PORT, () => {
    console.log(`Application listening on port ${config.PORT}!`);
});
