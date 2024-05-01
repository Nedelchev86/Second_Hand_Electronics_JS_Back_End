const express = require("express");
const app = express();
const router = require("./routes");
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");

// const dotenv = require("dotenv");
// const userRoute = require("./routes/user");
// const authRoute = require("./routes/auth");
// const productRoute = require("./routes/product");
// const cartRoute = require("./routes/cart");
// const orderRoute = require("./routes/order");
// const stripeRoute = require("./routes/stripe");
// const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.engine("hbs", handlebars.engine({extname: ".hbs"}));
app.set("view engine", "hbs");
app.set("views", "./views");


app.use(express.static("public"));


app.listen(5000, () => {
    console.log("backend server is running on http://127.0.0.1:5000");
});

app.use(router);

mongoose.connect("mongodb://127.0.0.1:27017/secondHandElectronics").then(() => console.log("DB Connection Successfull"));
